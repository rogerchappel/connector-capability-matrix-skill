# Example Report

Generate this with:

```sh
npm run smoke
```

Expected output for `fixtures/action-plan.json`:

```text
# Connector Capability Matrix
Allowed: 2
Denied: 3
Approvals: 3
Results:
- crm.readContact: allowed
- crm.addNote: allowed (approval required)
- crm.deleteContact: denied (approval required) - missing scope: contact:delete
- slack.postMessage: denied (approval required) - missing scope: chat:write
- drive.upload: denied - unknown connector
```
