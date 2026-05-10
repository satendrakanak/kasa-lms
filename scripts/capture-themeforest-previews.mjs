import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = process.env.PREVIEW_BASE_URL || "http://localhost:3001";
const outDir = new URL("../themeforest-preview/screenshots/", import.meta.url);
const userDataDir = `/private/tmp/kasa-lms-preview-chrome-${Date.now()}`;
const port = 9227;

const screens = [
  { slug: "home", path: "/", title: "Default Home" },
  { slug: "home-classic", path: "/home-2", title: "Classic Academy Home" },
  { slug: "home-live", path: "/home-3", title: "Live Cohort Home" },
  { slug: "home-marketplace", path: "/home-4", title: "Course Marketplace Home" },
  { slug: "home-platform", path: "/home-5", title: "LMS Platform Home" },
  { slug: "courses-grid", path: "/courses", title: "Courses Grid" },
  { slug: "course-detail", path: "/course/full-stack-nextjs-mastery", title: "Course Detail" },
  { slug: "articles", path: "/articles", title: "Articles" },
  { slug: "faculty", path: "/our-faculty", title: "Faculty Directory" },
  { slug: "components", path: "/components", title: "Components Hub" },
  { slug: "dashboard", path: "/dashboard", title: "Learner Dashboard" },
  { slug: "admin", path: "/admin/dashboard", title: "Admin Dashboard" },
  { slug: "checkout", path: "/checkout", title: "Checkout" },
  { slug: "about", path: "/about", title: "About" },
];

const viewports = [
  { slug: "desktop", width: 1440, height: 1200, scale: 1, mobile: false },
  { slug: "mobile", width: 390, height: 1200, scale: 2, mobile: true },
];

const themes = ["light", "dark"];

function send(ws, id, method, params = {}) {
  ws.send(JSON.stringify({ id, method, params }));
}

function parseWsMessage(raw) {
  const payload = raw?.data ?? raw;
  return JSON.parse(
    typeof payload === "string" ? payload : Buffer.from(payload).toString(),
  );
}

async function call(ws, method, params = {}) {
  const id = ++call.nextId;
  send(ws, id, method, params);
  return new Promise((resolve, reject) => {
    const onMessage = (raw) => {
      const message = parseWsMessage(raw);
      if (message.id !== id) return;
      ws.removeEventListener("message", onMessage);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
    };
    ws.addEventListener("message", onMessage);
  });
}
call.nextId = 0;

async function waitForEvent(ws, method, timeout = 12000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      ws.removeEventListener("message", onMessage);
      reject(new Error(`Timed out waiting for ${method}`));
    }, timeout);

    const onMessage = (raw) => {
      const message = parseWsMessage(raw);
      if (message.method !== method) return;
      clearTimeout(timer);
      ws.removeEventListener("message", onMessage);
      resolve(message.params || {});
    };

    ws.addEventListener("message", onMessage);
  });
}

async function getDebuggerUrl() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/new`, {
        method: "PUT",
      });
      const target = await response.json();
      if (target?.webSocketDebuggerUrl) {
        return target.webSocketDebuggerUrl;
      }
    } catch {
      await wait(250);
    }
  }

  throw new Error("Chrome remote debugging target was not ready.");
}

async function captureScreen(ws, screen, viewport, theme) {
  await call(ws, "Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });

  await call(ws, "Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: theme }],
  });

  await call(ws, "Page.addScriptToEvaluateOnNewDocument", {
    source: `
      localStorage.setItem("theme", "${theme}");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("${theme}");
      document.documentElement.style.colorScheme = "${theme}";
    `,
  });

  const loaded = waitForEvent(ws, "Page.loadEventFired");
  await call(ws, "Page.navigate", { url: `${baseUrl}${screen.path}` });
  await loaded;
  await wait(900);

  await call(ws, "Runtime.evaluate", {
    expression: `
      localStorage.setItem("theme", "${theme}");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("${theme}");
      document.documentElement.style.colorScheme = "${theme}";
      window.scrollTo(0, 0);
    `,
  });
  await wait(350);

  const { data } = await call(ws, "Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: !viewport.mobile,
  });

  const filename = `${screen.slug}-${theme}-${viewport.slug}.png`;
  await writeFile(new URL(filename, outDir), Buffer.from(data, "base64"));

  return {
    ...screen,
    theme,
    viewport: viewport.slug,
    width: viewport.width,
    height: viewport.height,
    file: `screenshots/${filename}`,
  };
}

function buildPreviewHtml(captures) {
  const desktopLight = captures.filter(
    (item) => item.theme === "light" && item.viewport === "desktop",
  );
  const desktopDark = captures.filter(
    (item) => item.theme === "dark" && item.viewport === "desktop",
  );
  const mobileLight = captures.filter(
    (item) => item.theme === "light" && item.viewport === "mobile",
  );

  const features = [
    "5 homepage demos with different hero systems",
    "Static JSON/API adapter, no backend required",
    "Course catalog with grid, list, masonry-style layouts",
    "Single course pages with cart, checkout, progress, lessons, exams, and certificates",
    "Learner dashboard with profile, orders, notifications, settings, classes, and certificates",
    "Admin dashboard screens for courses, articles, coupons, categories, users, orders, media, refunds, roles, and settings",
    "Faculty dashboard, faculty directory, and faculty profile pages",
    "Articles, testimonials, contact, about, and component demo pages",
    "Light and dark modes across public, learner, faculty, and admin areas",
    "Generated demo portraits and SVG course covers for safer marketplace packaging",
    "Responsive layouts for desktop, tablet, and mobile previews",
    "Theme-friendly UI components: buttons, inputs, forms, switches, tables, and charts",
  ];

  const card = (item) => `
    <article class="screen-card">
      <img src="${item.file}" alt="${item.title} ${item.theme} ${item.viewport} preview" />
      <div>
        <span>${item.theme} / ${item.viewport}</span>
        <h3>${item.title}</h3>
      </div>
    </article>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kasa LMS ThemeForest Preview</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #101828;
        background: #f5f7fb;
      }
      .hero {
        min-height: 760px;
        padding: 64px 56px 32px;
        color: #fff;
        background:
          radial-gradient(circle at 78% 22%, rgba(51, 102, 255, .52), transparent 34%),
          radial-gradient(circle at 22% 18%, rgba(255, 45, 85, .32), transparent 28%),
          linear-gradient(135deg, #08111f 0%, #10243d 48%, #08111f 100%);
        overflow: hidden;
      }
      .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(560px, 1.25fr);
        gap: 48px;
        align-items: center;
        max-width: 1440px;
        margin: 0 auto;
      }
      .eyebrow {
        display: inline-flex;
        gap: 10px;
        align-items: center;
        padding: 10px 14px;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 999px;
        background: rgba(255,255,255,.08);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      h1 {
        margin: 28px 0 18px;
        max-width: 760px;
        font-size: clamp(56px, 7vw, 112px);
        line-height: .92;
        letter-spacing: 0;
      }
      .hero p {
        max-width: 720px;
        color: rgba(255,255,255,.74);
        font-size: 22px;
        line-height: 1.55;
      }
      .actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 34px; }
      .pill {
        padding: 15px 20px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.18);
        background: rgba(255,255,255,.1);
        color: #fff;
        font-weight: 800;
      }
      .pill.primary { background: #fff; color: #0b1424; }
      .hero-stack {
        position: relative;
        min-height: 620px;
      }
      .hero-shot {
        position: absolute;
        width: 88%;
        border-radius: 28px;
        box-shadow: 0 34px 100px rgba(0,0,0,.42);
        border: 1px solid rgba(255,255,255,.14);
        overflow: hidden;
        background: #fff;
      }
      .hero-shot img { display: block; width: 100%; }
      .hero-shot.one { right: 0; top: 0; }
      .hero-shot.two { left: 0; top: 270px; width: 62%; }
      .metrics {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 16px;
        max-width: 1440px;
        margin: 40px auto 0;
      }
      .metric {
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 20px;
        background: rgba(255,255,255,.08);
        padding: 22px;
      }
      .metric strong { display: block; font-size: 32px; }
      .metric span { display: block; margin-top: 5px; color: rgba(255,255,255,.66); }
      section { max-width: 1440px; margin: 0 auto; padding: 72px 56px; }
      .section-head { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 28px; }
      h2 { margin: 0; font-size: 44px; line-height: 1.05; letter-spacing: 0; }
      .section-head p { margin: 0; max-width: 560px; color: #667085; font-size: 18px; line-height: 1.6; }
      .screen-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
      .screen-card {
        overflow: hidden;
        border-radius: 24px;
        background: #fff;
        border: 1px solid #e5e7ef;
        box-shadow: 0 18px 55px rgba(16,24,40,.08);
      }
      .screen-card img { display: block; width: 100%; height: 300px; object-fit: cover; object-position: top; background: #eef2f7; }
      .screen-card div { padding: 18px; }
      .screen-card span { color: #3157f6; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; }
      .screen-card h3 { margin: 8px 0 0; font-size: 20px; }
      .dark-band {
        max-width: none;
        background: #08111f;
        color: #fff;
      }
      .dark-band .inner { max-width: 1440px; margin: 0 auto; padding: 72px 56px; }
      .dark-band .section-head p { color: rgba(255,255,255,.68); }
      .dark-band .screen-card { background: #121d2d; border-color: rgba(255,255,255,.12); }
      .dark-band .screen-card h3 { color: #fff; }
      .features {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .feature {
        padding: 18px;
        border-radius: 18px;
        background: #fff;
        border: 1px solid #e5e7ef;
        font-weight: 750;
        line-height: 1.45;
      }
      .mobile-row {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 18px;
      }
      .mobile-row .screen-card img { height: 520px; }
      .footer {
        padding: 44px 56px 64px;
        text-align: center;
        color: #667085;
      }
      @media (max-width: 900px) {
        .hero { padding: 42px 18px; min-height: auto; }
        .hero-grid, .metrics, .screen-grid, .features, .mobile-row {
          grid-template-columns: 1fr;
        }
        .hero-stack { min-height: 420px; }
        .hero-shot { position: static; width: 100% !important; margin-top: 18px; }
        section, .dark-band .inner { padding: 48px 18px; }
        .section-head { display: block; }
        h1 { font-size: 54px; }
        h2 { font-size: 34px; }
      }
    </style>
  </head>
  <body>
    <main>
      <header class="hero">
        <div class="hero-grid">
          <div>
            <div class="eyebrow">Kasa LMS Theme</div>
            <h1>Complete static LMS template for Next.js</h1>
            <p>Course marketplace, learner dashboard, faculty workspace, admin screens, checkout, certificates, content pages, component demos, and polished light/dark mode previews.</p>
            <div class="actions">
              <span class="pill primary">Next.js Version</span>
              <span class="pill">HTML/CSS Ready Structure</span>
              <span class="pill">Static Data Included</span>
            </div>
          </div>
          <div class="hero-stack">
            <div class="hero-shot one"><img src="${desktopLight[0]?.file}" alt="Kasa LMS homepage preview" /></div>
            <div class="hero-shot two"><img src="${desktopDark.find((item) => item.slug === "admin")?.file || desktopDark[0]?.file}" alt="Kasa LMS admin dark preview" /></div>
          </div>
        </div>
        <div class="metrics">
          <div class="metric"><strong>5</strong><span>Homepage demos</span></div>
          <div class="metric"><strong>60+</strong><span>Polished pages</span></div>
          <div class="metric"><strong>2</strong><span>Light and dark modes</span></div>
          <div class="metric"><strong>0</strong><span>Backend setup required</span></div>
        </div>
      </header>
      <section>
        <div class="section-head">
          <h2>Desktop light previews</h2>
          <p>Public pages, commerce flow, dashboards, content screens, and component pages are ready for buyers to inspect.</p>
        </div>
        <div class="screen-grid">${desktopLight.slice(0, 12).map(card).join("")}</div>
      </section>
      <div class="dark-band">
        <div class="inner">
          <div class="section-head">
            <h2>Dark mode included</h2>
            <p>The theme supports dark mode across homepage demos, learner experiences, admin screens, and conversion pages.</p>
          </div>
          <div class="screen-grid">${desktopDark.slice(0, 9).map(card).join("")}</div>
        </div>
      </div>
      <section>
        <div class="section-head">
          <h2>Mobile previews</h2>
          <p>Responsive layouts are captured for the key buying journey, from homepage to course detail and dashboards.</p>
        </div>
        <div class="mobile-row">${mobileLight.slice(0, 8).map(card).join("")}</div>
      </section>
      <section>
        <div class="section-head">
          <h2>Feature highlights</h2>
          <p>Copy-ready feature list for marketplace documentation and item description.</p>
        </div>
        <div class="features">${features.map((feature) => `<div class="feature">${feature}</div>`).join("")}</div>
      </section>
      <div class="footer">Kasa LMS ThemeForest preview pack • Static demo content • Light/Dark screenshots • Desktop/Mobile presentation</div>
    </main>
  </body>
</html>`;
}

function buildReadme(captures) {
  const captureList = captures
    .map((item) => `- ${item.title} (${item.theme}, ${item.viewport}): \`${item.file}\``)
    .join("\n");

  return `# Kasa LMS ThemeForest Preview Pack

## Overview

Kasa LMS is a complete static LMS theme built for marketplace previews. It includes public marketing pages, course catalog pages, learner dashboard pages, faculty pages, admin dashboard pages, checkout/cart flow, article pages, testimonials, and component demos.

## Core Features

- Next.js static theme using local demo data instead of server APIs.
- Light and dark mode support.
- Five homepage variations: default, classic academy, live cohort, marketplace, and product-led LMS platform.
- Course catalog, single course pages, cart sheet, checkout, progress states, exams, certificates, and learner dashboard.
- Admin pages for courses, articles, coupons, categories, users, orders, media, refunds, roles, permissions, testimonials, and site settings.
- Faculty directory, faculty details, and faculty dashboard screens.
- UI component pages for buttons, inputs, tables, charts, and switches.
- Generated demo SVG course covers and faculty portraits for safer theme distribution.
- Responsive desktop and mobile layouts.
- No payment gateway, Docker, backend, or private API setup required for the preview theme.

## Screenshot Inventory

${captureList}

## Suggested ThemeForest Copy

Kasa LMS is a polished Next.js learning management system theme for academies, course marketplaces, cohort programs, and education startups. It ships with static data, rich public pages, learner dashboards, faculty screens, admin panels, checkout flow, certificates, exams, articles, testimonials, UI components, and five homepage demos. Buyers can run the theme quickly without backend setup and customize the included JSON/static adapter for their own product.
`;
}

await mkdir(outDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-sandbox",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-dev-shm-usage",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  "about:blank",
]);

chrome.stderr.on("data", (chunk) => {
  const message = chunk.toString();
  if (message.includes("DevTools listening")) return;
  if (message.includes("Created TensorFlow Lite")) return;
  process.stderr.write(message);
});

try {
  const debuggerUrl = await getDebuggerUrl();
  const ws = new WebSocket(debuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  await call(ws, "Page.enable");
  await call(ws, "Runtime.enable");
  await call(ws, "Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 255, g: 255, b: 255, a: 1 },
  });

  const captures = [];

  for (const theme of themes) {
    for (const viewport of viewports) {
      for (const screen of screens) {
        const result = await captureScreen(ws, screen, viewport, theme);
        captures.push(result);
        console.log(`captured ${result.file}`);
      }
    }
  }

  await writeFile(
    new URL("../index.html", outDir),
    buildPreviewHtml(captures),
    "utf8",
  );
  await writeFile(new URL("../README.md", outDir), buildReadme(captures), "utf8");

  const previewScreens = [
    { slug: "main-preview-desktop", path: "/themeforest-preview/index.html", title: "Main Preview" },
  ];

  for (const viewport of viewports) {
    await call(ws, "Emulation.setDeviceMetricsOverride", {
      width: viewport.slug === "desktop" ? 1440 : 390,
      height: viewport.slug === "desktop" ? 1800 : 1400,
      deviceScaleFactor: viewport.scale,
      mobile: viewport.mobile,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    });
    const loaded = waitForEvent(ws, "Page.loadEventFired");
    await call(ws, "Page.navigate", {
      url: new URL("../index.html", outDir).href,
    });
    await loaded;
    await wait(600);
    const { data } = await call(ws, "Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: viewport.slug === "desktop",
    });
    const filename = `main-preview-${viewport.slug}.png`;
    await writeFile(new URL(filename, outDir), Buffer.from(data, "base64"));
    console.log(`captured screenshots/${filename}`);
  }

  ws.close();
} finally {
  chrome.kill("SIGTERM");
}
