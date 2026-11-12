# Yuvraj Ruparel | Portfolio

Personal portfolio website of Yuvraj Ruparel, a Mechanical Engineering undergraduate at Duke University interested in robotics, mechatronics and hardware.

Live site: https://yuvrajruparel.github.io

## What is on the site

- About, contact links and a fixed sidebar that follows the page as you scroll
- Technical projects (current and upcoming), each with dates, photos and links
- Professional experience, awards and skills
- An in-site viewer for reports, posters and PDFs, so documents open on the site instead of on GitHub

## Tech stack

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite and Tailwind CSS
- Built as a static single-page app and hosted on GitHub Pages

## Project structure

```
src/                 Pages, components and styles
public/docs/         PDFs and posters shown in the document viewer
public/photos/       Project and award photos
public/logos/        Organization logos
public/favicon.jpg   Site icon
.github/workflows/   GitHub Pages deploy workflow
```

## Run locally

You need Node.js 20 or newer and npm.

```sh
git clone https://github.com/yuvrajruparel/yuvrajruparel.github.io.git
cd yuvrajruparel.github.io
npm install
npm run dev
```

## Build

```sh
npm run build
```

The static site is written to `.output/public`.

## Deployment

Every push to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`. It installs dependencies, builds the site, and publishes `.output/public` to GitHub Pages.