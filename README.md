# connector-capability-matrix-skill

Dry-run connector action plans against declared capabilities and approvals.

## Quickstart

```sh
npm test
npm run check
npm run smoke
```

## CLI

```sh
node bin/connector-capability-matrix-skill.js --fixture fixtures/action-plan.json
```

## Library

Import from `src/index.js` or package exports once installed. The API is local-first and deterministic for fixture-driven review.

## Limitations

This project is a release-candidate MVP. It expects JSON input and does not call external services.

## Safety Notes

The tool is read-only. Treat any external write, publish, approval, install, or connector execution as outside this package and subject to explicit user approval.

## Release Candidate

See `docs/RELEASE_CANDIDATE.md` and `docs/RELEASE_CHECKLIST.md` for the current readiness notes.
