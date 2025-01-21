# Cypress UI automation Boiler Plate

### Install necessary packages

```
npm i
```

### Run tests in GUI mode

```
npx cypress open

# Connect to different environments (local,dev)

# Linux
APPENV=preprod npx cypress open

# Windows (command prompt)
set APPENV=preprod && npx cypress open

# Windows (powershell)
$env:APPENV="preprod"; npx cypress open

# Mac
export APPENV="preprod" && npx cypress open

If you don't specify environment, default APP environment will be used (specified in APPENV.json).

## Environment Setup

1. Copy `appenv.template.json` to `appenv.json`:
   ```bash
   cp appenv.template.json appenv.json
   ```

2. Update the `appenv.json` with your environment-specific values

3. Run the tests using:
   ```bash
   export APPENV="preprod" && npx cypress open
   ```

### Run tests in CLI mode

```
npx cypress run