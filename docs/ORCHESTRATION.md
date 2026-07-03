# Orchestration

Run against local manifests before connector execution. Treat denied rows as blockers and approval rows as pending user confirmation.

## Suggested Flow

1. Collect local input fixtures.
2. Run `npm run smoke`.
3. Review the report before any separate side-effecting tool runs.
4. Record verification output in the release-candidate PR.
