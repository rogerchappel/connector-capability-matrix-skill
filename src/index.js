export function evaluateCapabilityMatrix(input) {
  const capabilities = input.capabilities ?? {};
  const actions = Array.isArray(input.actions) ? input.actions : [];
  const results = actions.map((action) => evaluateAction(action, capabilities[action.connector]));
  return { allowed: results.filter((r) => r.status === 'allowed'), denied: results.filter((r) => r.status === 'denied'), approvals: results.filter((r) => r.approvalRequired), results };
}
function evaluateAction(action, connector) {
  if (!connector) return result(action, 'denied', ['unknown connector'], false);
  const operation = connector.operations?.[action.operation];
  if (!operation) return result(action, 'denied', ['unsupported operation'], false);
  const missingScopes = (operation.scopes ?? []).filter((scope) => !(connector.grantedScopes ?? []).includes(scope));
  const reasons = missingScopes.map((scope) => `missing scope: ${scope}`);
  const approvalRequired = Boolean(operation.write || action.write || operation.approval === 'required');
  const status = reasons.length ? 'denied' : 'allowed';
  return result(action, status, reasons, approvalRequired);
}
function result(action, status, reasons, approvalRequired) { return { connector: action.connector, operation: action.operation, status, reasons, approvalRequired }; }
export function formatMatrixReport(matrix) {
  const lines = ['# Connector Capability Matrix', `Allowed: ${matrix.allowed.length}`, `Denied: ${matrix.denied.length}`, `Approvals: ${matrix.approvals.length}`, 'Results:'];
  for (const item of matrix.results) lines.push(`- ${item.connector}.${item.operation}: ${item.status}${item.approvalRequired ? ' (approval required)' : ''}${item.reasons.length ? ' - ' + item.reasons.join('; ') : ''}`);
  return lines.join('\n');
}
