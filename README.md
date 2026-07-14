# connector-capability-matrix-skill

Dry-run connector action plans against declared capabilities and approvals.

## Quickstart

```sh
npm install
npm test
npm run check
npm run smoke
```

For a published install, run the CLI with:

```sh
npx connector-capability-matrix-skill --help
```

## CLI

```sh
node bin/connector-capability-matrix-skill.js --fixture fixtures/action-plan.json
node bin/connector-capability-matrix-skill.js --help
node bin/connector-capability-matrix-skill.js --version
```

The fixture smoke should report 2 allowed actions, 3 denied actions, and 3 actions that require approval.

## Library

Import from `src/index.js` or package exports once installed. The API is local-first and deterministic for fixture-driven review.

## Limitations

This project is a release-candidate MVP. It expects JSON input and does not call external services.

## Safety Notes

The tool is read-only. Treat any external write, publish, approval, install, or connector execution as outside this package and subject to explicit user approval.

## Release Candidate

See `docs/RELEASE_CANDIDATE.md` and `docs/RELEASE_CHECKLIST.md` for the current readiness notes.

## Local Verification

```sh
npm run check
npm test
npm run smoke
npm run package:smoke
npm run release:check
```

`npm run release:check` runs syntax checks, tests, the fixture-backed CLI smoke,
and the package smoke script. The package allowlist includes the CLI, runtime
source, fixtures, examples, docs, skill instructions, changelog, security policy,
and license so the npm tarball stays runnable for local review. The package
smoke also imports the public API and verifies that the matrix evaluator and
report formatter remain available to downstream tools.
