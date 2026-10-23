# Bundled contribution renderer

Source: user-provided pacman-contribution-graph-main.zip, package version 5.3.2.
Upstream author: abozanona. Repository: https://github.com/abozanona/pacman-contribution-graph
Archive commit: 7332e1de7903ab780c3692a4127a59cc13872daa.

`arcade-renderer.mjs` is the original prebuilt ES module (renamed from `dist/pacman-contribution-graph.min.js`). It includes the Bomberman engine, embedded sprites, SVG animation renderer, and shared contribution providers. `src/` retains the supplied TypeScript sources for reference; no build or dependency installation is required to run the bundle. The profile script uses only BombermanRenderer. Other upstream game names remain in this shared source bundle.
