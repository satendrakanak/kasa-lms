import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = process.env.PREVIEW_BASE_URL || "https://kasa-lms.vercel.app";
const outDir = new URL("../envato-package/preview-images/", import.meta.url);
const userDataDir = `/private/tmp/kasa-lms-envato-preview-${Date.now()}`;
const port = 9231;

const images = [
  { file: "01-cover.png", path: "/", width: 2340, height: 1560, theme: "light" },
  { file: "02-home-default.png", path: "/", width: 1170, height: 780, theme: "light" },
  { file: "03-home-classic.png", path: "/home-2", width: 1170, height: 780, theme: "light" },
  { file: "04-home-live-cohort.png", path: "/home-3", width: 1170, height: 780, theme: "dark" },
  { file: "05-home-marketplace.png", path: "/home-4", width: 1170, height: 780, theme: "light" },
  { file: "06-courses-grid.png", path: "/courses", width: 1170, height: 780, theme: "light" },
  { file: "07-course-detail.png", path: "/course/full-stack-nextjs-mastery", width: 1170, height: 780, theme: "dark" },
  { file: "08-learner-dashboard.png", path: "/dashboard", width: 1170, height: 780, theme: "light" },
  { file: "09-admin-dashboard.png", path: "/admin/dashboard", width: 1170, height: 780, theme: "dark" },
  { file: "10-faculty-dashboard.png", path: "/faculty/dashboard", width: 1170, height: 780, theme: "light" },
  { file: "11-components.png", path: "/components", width: 1170, height: 780, theme: "light" },
  { file: "12-articles.png", path: "/articles", width: 1170, height: 780, theme: "dark" },
  { file: "13-faculty.png", path: "/our-faculty", width: 1170, height: 780, theme: "light" },
  { file: "14-checkout.png", path: "/checkout", width: 1170, height: 780, theme: "light" },
  { file: "15-mobile-preview.png", path: "/", width: 1170, height: 780, theme: "light", mobile: true },
];

function parseWsMessage(raw) {
  const payload = raw?.data ?? raw;
  return JSON.parse(
    typeof payload === "string" ? payload : Buffer.from(payload).toString(),
  );
}

async function call(ws, method, params = {}) {
  const id = ++call.nextId;
  ws.send(JSON.stringify({ id, method, params }));
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

async function waitForEvent(ws, method, timeout = 20000) {
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
  for (let attempt = 0; attempt < 80; attempt += 1) {
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

async function capture(ws, image) {
  const metrics = image.mobile
    ? {
        width: 390,
        height: 260,
        deviceScaleFactor: 3,
        mobile: true,
        screenWidth: 390,
        screenHeight: 260,
      }
    : {
        width: image.width,
        height: image.height,
        deviceScaleFactor: 1,
        mobile: false,
        screenWidth: image.width,
        screenHeight: image.height,
      };

  await call(ws, "Emulation.setDeviceMetricsOverride", metrics);
  await call(ws, "Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: image.theme }],
  });
  await call(ws, "Page.addScriptToEvaluateOnNewDocument", {
    source: `
      localStorage.setItem("theme", "${image.theme}");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("${image.theme}");
      document.documentElement.style.colorScheme = "${image.theme}";
    `,
  });

  const loaded = waitForEvent(ws, "Page.loadEventFired");
  await call(ws, "Page.navigate", { url: `${baseUrl}${image.path}` });
  await loaded;
  await wait(900);
  await call(ws, "Runtime.evaluate", {
    expression: `
      localStorage.setItem("theme", "${image.theme}");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("${image.theme}");
      document.documentElement.style.colorScheme = "${image.theme}";
      window.scrollTo(0, 0);
    `,
  });
  await wait(300);

  const { data } = await call(ws, "Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });

  await writeFile(new URL(image.file, outDir), Buffer.from(data, "base64"));
  console.log(`created ${image.file}`);
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

chrome.stderr.on("data", () => {});

try {
  const debuggerUrl = await getDebuggerUrl();
  const ws = new WebSocket(debuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  await call(ws, "Page.enable");
  await call(ws, "Runtime.enable");

  for (const image of images) {
    await capture(ws, image);
  }

  ws.close();
} finally {
  chrome.kill("SIGTERM");
}
