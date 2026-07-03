# connector-capability-matrix-skill

Use this skill when an agent has a proposed connector action plan and needs to compare it with declared connector capabilities. Inputs are local JSON manifests and action plans. The skill never calls live connectors or mutates accounts. Any row marked approval required must receive explicit user approval before the separate executor runs. Validate with npm test, npm run check, and npm run smoke.

## Examples

```sh
npm run smoke
```

## Verification

Run `npm test`, `npm run check`, `npm run build`, and `npm run smoke` before trusting the package in another workflow.
