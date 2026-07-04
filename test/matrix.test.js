import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCapabilityMatrix } from '../src/index.js';
const capabilities = { crm: { grantedScopes: ['read','write'], operations: { read: { scopes: ['read'] }, note: { scopes: ['write'], write: true, approval: 'required' } } } };
test('allows scoped read actions', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities, actions: [{ connector: 'crm', operation: 'read' }] });
  assert.equal(matrix.allowed.length, 1);
  assert.equal(matrix.denied.length, 0);
});
test('marks write actions for approval', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities, actions: [{ connector: 'crm', operation: 'note', write: true }] });
  assert.equal(matrix.approvals.length, 1);
});
test('denies missing scopes', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities: { crm: { grantedScopes: [], operations: { read: { scopes: ['read'] } } } }, actions: [{ connector: 'crm', operation: 'read' }] });
  assert.equal(matrix.denied[0].reasons[0], 'missing scope: read');
});
test('denies unknown connectors', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities, actions: [{ connector: 'drive', operation: 'upload' }] });
  assert.equal(matrix.denied[0].reasons[0], 'unknown connector');
});
test('denies unsupported operations', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities, actions: [{ connector: 'crm', operation: 'delete' }] });
  assert.equal(matrix.denied.length, 1);
  assert.equal(matrix.denied[0].reasons[0], 'unsupported operation');
});
test('treats omitted actions as an empty review', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities });
  assert.deepEqual(matrix, { allowed: [], denied: [], approvals: [], results: [] });
});
test('marks operation-level writes for approval even when action omits write', () => {
  const matrix = evaluateCapabilityMatrix({ capabilities, actions: [{ connector: 'crm', operation: 'note' }] });
  assert.equal(matrix.allowed.length, 1);
  assert.equal(matrix.approvals.length, 1);
  assert.equal(matrix.results[0].approvalRequired, true);
});
