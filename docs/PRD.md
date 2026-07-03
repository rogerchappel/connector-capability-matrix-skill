# PRD

## Problem

Capability matrix checks help agents prove which connector operations are available, scoped, and approval-gated before any external write happens.

## Users

Agent builders, OSS maintainers, and operators who need local evidence before a run proceeds.

## MVP Scope

- Local-first CLI
- Library API
- Fixture-backed tests
- Smoke command
- Skill instructions

## Non-Goals

- Live connector writes
- Hosted service
- Package publishing
- Automatic approvals
