# Cautious Palm Tree 

[![Required Node.js >= 20.19.0 || >= 22.12.0](https://img.shields.io/static/v1?label=node&message=%3E=20.19.0%20||%20%3E=22.12.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

## Quick Start

```sh
# clone the project
git clone git@github.com:squishedfox/cautious-palm-tree.git 

# enter the project directory
cd cautious-palm-tree

# install dependencies
pnpm install

# start development
pnpm dev
```

## Available Scripts

- `pnpm dev`: start the Vite dev server.
- `pnpm build`: build the renderer and package the app with electron-builder.
- `pnpm preview`: preview the production web build locally.
- `pnpm test`: run Vitest unit tests.
- `pnpm test:e2e`: build the test mode bundle and run Playwright tests.
- `pnpm typecheck`: run the TypeScript type checker.

## Project Structure

```tree
├── build/            Packaging assets
├── dist-electron/    Compiled Electron output
├── electron/         Main-process and preload source
│   ├── main/
│   └── preload/
├── public/           Static assets
├── src/              Renderer source code
│   ├── components/
│   │   └── update/
│   ├── demos/
│   └── type/
└── test/             Unit and end-to-end tests
    └── e2e/
```

Files under `electron/` are compiled into `dist-electron/`.

## Security Note

The `renderer: {}` preset in `vite.config.ts` is only a Vite adapter that polyfills Electron, Node.js APIs and native modules for the renderer process. It is not the same as enabling Node integration. If you want direct Node.js access in the renderer, enable `nodeIntegration` in the `BrowserWindow` webPreferences in the main process and review the security impact carefully.

## Features

1. Electron auto update with docs in [src/components/update/README.md](src/components/update/README.md).
2. Vitest unit tests and Playwright end-to-end tests.
3. TailwindCSS v4.

## Resources

- Auto-update docs: [English](src/components/update/README.md) | [简体中文](src/components/update/README.zh-CN.md)
- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
