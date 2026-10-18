import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const cli = ['bin/connector-capability-matrix-skill.js'];

test('prints CLI help', () => {
  const result = spawnSync(process.execPath, [...cli, '--help'], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /--fixture <file>/);
});

test('prints package version', () => {
  const result = spawnSync(process.execPath, [...cli, '--version'], { encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.match(result.stdout.trim(), /^\d+\.\d+\.\d+$/);
});

test('fails clearly when fixture JSON cannot be parsed', () => {
  const result = spawnSync(process.execPath, [...cli, '--fixture', 'README.md'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /connector-capability-matrix-skill:/);
});
