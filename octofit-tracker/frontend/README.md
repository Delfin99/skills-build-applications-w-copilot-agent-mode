# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Environment Configuration

The presentation tier uses Vite environment variables from `import.meta.env`.

Define `VITE_CODESPACE_NAME` (for example in `.env.local`) so the frontend can call the Codespaces API URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds endpoint URLs like:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/<component>/
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to:

```text
http://localhost:8000/api/<component>/
```

This avoids invalid `https://undefined-8000...` requests during local development.
