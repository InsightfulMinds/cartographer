#!/usr/bin/env node
// verify-map.mjs — mechanical harness for cartographer maps (CATALOG.md + cards/*.md)
// Exit: 0 clean, 2 findings, 1 usage error, 3 selftest failure.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const args = process.argv.slice(2);

function usage(msg) {
  if (msg) console.error(msg);
  console.error('usage: verify-map.mjs <map-dir> [--root <dir>] | --selftest');
  process.exit(1);
}

function verifyMap(mapDir, root) {
  const findings = [];
  const skipped = [];
  const F = (file, problem) => findings.push(`CARD ${file}: ${problem}`);

  // --- 1. CATALOG.md ---
  const catPath = path.join(mapDir, 'CATALOG.md');
  let catChecked = 0;
  if (!fs.existsSync(catPath)) {
    findings.push(`CARD CATALOG.md: missing`);
  } else {
    const lines = fs.readFileSync(catPath, 'utf8').split('\n');
    const nonEmpty = lines.filter(l => l.trim() !== '');
    if (nonEmpty.length > 40) findings.push(`CARD CATALOG.md: ${nonEmpty.length} non-empty lines (max 40)`);
    for (const line of nonEmpty) {
      const t = line.trim();
      if (t.startsWith('#') || t.startsWith('>')) continue; // header/quote lines
      catChecked++;
      if (/\(not carded[^)]*\)/i.test(t)) continue;
      // find a referenced .md card path in the line
      const m = t.match(/([A-Za-z0-9._/\-]+\.md)/g);
      const found = (m || []).some(p => fs.existsSync(path.join(mapDir, p)) || fs.existsSync(path.resolve(mapDir, p)));
      if (!found) findings.push(`CARD CATALOG.md: line has no existing card file and no "(not carded)" mark: "${t.slice(0, 80)}"`);
    }
    if (catChecked === 0) skipped.push('catalog-entries');
  }

  // --- 2/3/4/5. Cards ---
  const cardsDir = path.join(mapDir, 'cards');
  let cardFiles = [];
  if (fs.existsSync(cardsDir) && fs.statSync(cardsDir).isDirectory()) {
    cardFiles = fs.readdirSync(cardsDir).filter(f => f.endsWith('.md')).sort();
  }
  if (cardFiles.length === 0) {
    skipped.push('cards', 'ghost-cards', 'cite-check', 'photocopy-guard');
  } else {
    let ghosts = 0, cites = 0;
    for (const f of cardFiles) {
      const rel = `cards/${f}`;
      const text = fs.readFileSync(path.join(cardsDir, f), 'utf8');
      const lines = text.split('\n');
      // trim trailing empty lines for line count
      let n = lines.length;
      while (n > 0 && lines[n - 1].trim() === '') n--;
      if (n > 45) F(rel, `${n} lines (max 45)`);

      // status
      const statusM = text.match(/^status:\s*(\S+)/m);
      if (!statusM) F(rel, 'missing status: line');
      else if (!['live', 'leftover', 'ghost'].includes(statusM[1])) F(rel, `invalid status "${statusM[1]}" (must be live|leftover|ghost)`);

      // source
      const sourceLines = lines.filter(l => /^source:\s*\S/.test(l));
      if (sourceLines.length === 0) F(rel, 'missing source: line');

      // hits / does-not-hit non-empty
      for (const key of ['hits', 'does-not-hit']) {
        const re = new RegExp(`^${key}:\\s*(.*)$`, 'm');
        const mkv = text.match(re);
        if (!mkv) { F(rel, `missing ${key}: section`); continue; }
        let content = mkv[1].trim();
        if (!content) {
          // check following indented/bullet lines until next top-level key
          const idx = lines.findIndex(l => re.test(l));
          for (let i = idx + 1; i < lines.length; i++) {
            const l = lines[i];
            if (/^[a-z-]+:/.test(l) || /^#/.test(l)) break;
            if (l.trim()) { content = l.trim(); break; }
          }
        }
        if (!content) F(rel, `${key}: section is empty`);
      }

      // ghost => looked-for
      if (statusM && statusM[1] === 'ghost') {
        ghosts++;
        if (!/^looked-for:\s*\S/m.test(text)) F(rel, 'ghost card missing looked-for: line');
      }

      // cite-check
      for (const sl of sourceLines) {
        const val = sl.replace(/^source:\s*/, '').trim();
        // strip trailing :line number and any trailing commentary after whitespace
        const p0 = val.split(/\s+/)[0].replace(/:(\d+)$/, '');
        const isAbs = p0.startsWith('/') || p0.startsWith('~');
        const looksPath = isAbs || /[/]/.test(p0);
        if (!looksPath) continue;
        cites++;
        let resolved;
        if (p0.startsWith('~')) resolved = path.join(os.homedir(), p0.slice(1));
        else if (isAbs) resolved = p0;
        else if (root) resolved = path.join(root, p0);
        else { cites--; continue; } // repo-relative but no --root: nothing to check
        if (!fs.existsSync(resolved)) F(rel, `source path does not exist: ${p0}`);
      }

      // photocopy guard: fenced code block > 10 lines
      let inFence = false, fenceLen = 0, fenceStart = 0;
      lines.forEach((l, i) => {
        if (/^\s*```/.test(l)) {
          if (!inFence) { inFence = true; fenceLen = 0; fenceStart = i + 1; }
          else {
            inFence = false;
            if (fenceLen > 10) F(rel, `fenced code block of ${fenceLen} lines at line ${fenceStart} (max 10)`);
          }
        } else if (inFence) fenceLen++;
      });
    }
    if (ghosts === 0) skipped.push('ghost-cards');
    if (cites === 0) skipped.push('cite-check');
  }

  return { findings, skipped, cardCount: cardFiles.length };
}

function report({ findings, skipped, cardCount }) {
  for (const f of findings) console.log(f);
  for (const s of skipped) console.log(`SKIPPED ${s}: nothing to examine (skipped != passed)`);
  console.log(`SUMMARY: ${cardCount} cards examined, ${findings.length} findings, ${skipped.length} categories skipped`);
  return findings.length === 0 ? 0 : 2;
}

// --- selftest ---
if (args.includes('--selftest')) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-map-selftest-'));
  const cards = path.join(tmp, 'cards');
  fs.mkdirSync(cards);
  const src = path.join(tmp, 'real-source.txt');
  fs.writeFileSync(src, 'x');
  fs.writeFileSync(path.join(cards, 'clean.md'), [
    '# clean-noun',
    'status: live',
    `source: ${src}`,
    'what: a clean test card.',
    'hits: broken-noun card',
    'does-not-hit: nothing — test fixture',
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(cards, 'broken.md'), [
    '# broken-noun',
    'status: live',
    `source: ${src}`,
    'what: deliberately broken — no does-not-hit.',
    'hits: clean-noun card',
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(tmp, 'CATALOG.md'), [
    '# selftest catalog',
    'clean-noun — live — clean fixture — cards/clean.md',
    'broken-noun — live — broken fixture — cards/broken.md',
    '',
  ].join('\n'));

  const res = verifyMap(tmp, null);
  const brokenFindings = res.findings.filter(f => f.includes('cards/broken.md'));
  const cleanFindings = res.findings.filter(f => f.includes('cards/clean.md') || f.startsWith('CARD CATALOG'));
  console.log('--- selftest run output ---');
  report(res);
  console.log('--- selftest verdict ---');
  if (brokenFindings.length === 0) {
    console.log('SELFTEST FAIL: harness passed the deliberately broken card (vacuous harness)');
    process.exit(3);
  }
  if (cleanFindings.length > 0) {
    console.log('SELFTEST FAIL: harness flagged the clean card/catalog:');
    cleanFindings.forEach(f => console.log('  ' + f));
    process.exit(3);
  }
  const nonBroken = res.findings.filter(f => !f.includes('cards/broken.md'));
  if (nonBroken.length > 0) {
    console.log('SELFTEST FAIL: findings outside the broken card:');
    nonBroken.forEach(f => console.log('  ' + f));
    process.exit(3);
  }
  console.log('SELFTEST PASS: exactly the broken card reported, clean card clean');
  fs.rmSync(tmp, { recursive: true, force: true });
  process.exit(0);
}

// --- normal mode ---
const positional = [];
let root = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--root') { root = args[++i]; if (!root) usage('--root needs a value'); }
  else positional.push(args[i]);
}
if (positional.length !== 1) usage();
const mapDir = path.resolve(positional[0]);
if (!fs.existsSync(mapDir) || !fs.statSync(mapDir).isDirectory()) usage(`not a directory: ${mapDir}`);
if (root && !fs.existsSync(root)) usage(`--root does not exist: ${root}`);

process.exit(report(verifyMap(mapDir, root)));
