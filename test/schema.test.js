import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import packageJson from '../package.json' with { type: 'json' };

test('package exports the action-plan JSON Schema and it describes representative inputs', async () => {
  const exportPath = packageJson.exports['./schemas/action-plan.schema.json'];
  assert.equal(exportPath, './schemas/action-plan.schema.json');
  const schema = JSON.parse(await readFile(new URL(exportPath, pathToFileURL(resolve('package.json'))), 'utf8'));
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.deepEqual(schema.required, ['actions']);
  assert.deepEqual(schema.properties.actions.items.required, ['connector', 'operation']);
  assert.equal(schema.properties.capabilities.additionalProperties.properties.operations.additionalProperties.properties.write.type, 'boolean');
});
