# A note for Akmam

## Run locally

Open a terminal in this folder. In Windows PowerShell, install the dependencies and start the Vite server with:

```sh
npm.cmd install
npm.cmd start
```

The start command opens the app in your default browser at the local Vite URL. If Chrome is not your default browser, copy the URL printed in the terminal into Chrome. Keep the terminal running while you use the app.

Do not open `index.html` directly from File Explorer. This is a React app, so it needs to be served over HTTP for its JavaScript modules to load.

## Build for hosting

```sh
npm run build
```

The production files are written to `dist/`.
