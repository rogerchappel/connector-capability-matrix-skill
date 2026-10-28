import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import packageJson from '../package.json' with { type: 'json' };

test('downstream consumers can import the action-plan JSON Schema package subpath', async () => {
  const schemaModule = await import('connector-capability-matrix-skill/schemas/action-plan.schema.json', { with: { type: 'json' } });
  assert.equal(schemaModule.default.$schema, 'https://json-schema.org/draft/2020-12/schema');
});

test('package exports the action-plan JSON Schema and it describes representative inputs', async () => {
  const exportPath = packageJson.exports['./schemas/action-plan.schema.json'];
  assert.equal(exportPath, './schemas/action-plan.schema.json');
  const schema = JSON.parse(await readFile(new URL(exportPath, pathToFileURL(resolve('package.json'))), 'utf8'));
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.deepEqual(schema.required, ['actions']);
  assert.deepEqual(schema.properties.actions.items.required, ['connector', 'operation']);
  assert.equal(schema.properties.capabilities.additionalProperties.properties.operations.additionalProperties.properties.write.type, 'boolean');
});


test('package exports the capability-manifest JSON Schema', async () => {
  const exportPath = packageJson.exports['./schemas/capability-manifest.schema.json'];
  assert.equal(exportPath, './schemas/capability-manifest.schema.json');
  const schema = JSON.parse(await readFile(new URL(exportPath, pathToFileURL(resolve('package.json'))), 'utf8'));
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.deepEqual(schema.required, ['capabilities']);
  assert.equal(schema.properties.capabilities.additionalProperties.properties.grantedScopes.items.type, 'string');
  assert.equal(schema.properties.capabilities.additionalProperties.properties.operations.additionalProperties.properties.approval.enum[0], 'required');
});
