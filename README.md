# React + TypeScript + Vite

** logic **

- Split the layout from the provider so we can consume game state (hits) in
- the visual tree without breaking the Rules of Hooks.

  ** Responsiveness layout for Battleship Game.**

* Breakpoints
* - Mobile (<768px): stacked (board, info boxes, ships)
* - Tablet (≥768px & <1024px): board on top, two‑column row beneath (info | ships)
* - Desktop (≥1024px): two‑column layout (info/ships | board)
