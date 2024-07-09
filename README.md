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
```

### Run tests in CLI mode

```
npx cypress run
```