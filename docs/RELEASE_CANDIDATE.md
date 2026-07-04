# Release Candidate Notes

## Classification

incubate

## Verification

- `npm run release:check`: pass; runs static checks, 10 tests, fixture smoke, and asserted package smoke.
- `npm run build`: pass; copies the library entrypoint to `dist/index.js`.
- `npm run smoke`: pass; reports 2 allowed actions, 3 denied actions, and 3 approval-required actions.

## Known Gaps

- Needs more adopter fixtures.
- No package publication in this lane.
- Maintainer review is still required before tagging or publishing.
