#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { evaluateCapabilityMatrix, formatMatrixReport } from '../src/index.js';
import pkg from '../package.json' with { type: 'json' };
const usage = 'Usage: connector-capability-matrix-skill --fixture <file>';
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`${usage}\n\nOptions:\n  --fixture <file>  Evaluate a connector action-plan fixture\n  --help            Show this help text\n  --version         Show the package version`);
  process.exit(0);
}
if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(pkg.version);
  process.exit(0);
}
const idx = process.argv.indexOf('--fixture');
if (idx === -1 || !process.argv[idx + 1]) {
  console.error(usage);
  process.exit(2);
}
try {
  const input = JSON.parse(readFileSync(process.argv[idx + 1], 'utf8'));
  console.log(formatMatrixReport(evaluateCapabilityMatrix(input)));
} catch (error) {
  console.error(`connector-capability-matrix-skill: ${error.message}`);
  process.exit(1);
}
