from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:3000"
OUTPUT_DIR = Path("artifacts/responsive-audit")
SCREENSHOT_DIR = OUTPUT_DIR / "screenshots"

VIEWPORTS = [
    ("desktop-wide", 1600, 1000),
    ("desktop", 1280, 900),
    ("tablet-landscape", 1024, 768),
    ("tablet-portrait", 820, 1180),
    ("mobile", 390, 844),
    ("mobile-narrow", 320, 568),
]

ROUTES = [
    "/",
    "/sobre-nos",
    "/atestado-tecnico",
    "/acesso-por-cordas",
    "/hidrojateamento",
    "/jateamento-abrasivo",
    "/pintura-industrial-anticorrosiva",
    "/piso-industrial-uretano",
    "/piso-industrial-mma",
    "/revestimento-de-borracha-liquida",
    "/isolamento-termico",
    "/montagem-andaime-tobo-roll",
    "/montagem-de-quick-deck",
    "/piso-industrial-epoxy",
]

LAYOUT_SELECTORS = [
    ".hero-split",
    ".hero-grid",
    ".about-wp-grid",
    ".service-layout",
    ".service-meta-grid",
    ".service-process-grid",
    ".service-narrative-grid",
    ".document-center-grid",
    ".service-gallery",
    ".site-footer-grid",
]


def slugify(route: str) -> str:
    if route == "/":
        return "home"
    return route.strip("/").replace("/", "__")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

    report: list[dict] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        )

        for route in ROUTES:
            route_slug = slugify(route)
            for viewport_name, width, height in VIEWPORTS:
                context = browser.new_context(
                    viewport={"width": width, "height": height},
                    device_scale_factor=1,
                )
                page = context.new_page()
                page.goto(f"{BASE_URL}{route}", wait_until="networkidle")

                metrics = page.evaluate(
                    """(selectors) => {
                        const toNodeLabel = (el) => {
                          const tag = el.tagName.toLowerCase();
                          const id = el.id ? `#${el.id}` : "";
                          const classes = [...el.classList].slice(0, 3).map((c) => `.${c}`).join("");
                          return `${tag}${id}${classes}`;
                        };

                        const overflowNodes = [...document.querySelectorAll("body *")]
                          .map((el) => {
                            const rect = el.getBoundingClientRect();
                            return { el, rect };
                          })
                          .filter(({ rect }) => rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1))
                          .slice(0, 12)
                          .map(({ el, rect }) => ({
                            label: toNodeLabel(el),
                            left: Math.round(rect.left),
                            right: Math.round(rect.right),
                            width: Math.round(rect.width),
                          }));

                        const layoutData = selectors
                          .map((selector) => {
                            const el = document.querySelector(selector);
                            if (!el) return null;
                            const style = window.getComputedStyle(el);
                            const rect = el.getBoundingClientRect();
                            return {
                              selector,
                              display: style.display,
                              gridTemplateColumns: style.gridTemplateColumns,
                              gap: style.gap,
                              width: Math.round(rect.width),
                              height: Math.round(rect.height),
                              childCount: el.children.length,
                            };
                          })
                          .filter(Boolean);

                        const firstImage = document.querySelector("main img, img");
                        const firstHeading = document.querySelector("h1");
                        const header = document.querySelector("header");

                        return {
                          title: document.title,
                          viewport: { width: window.innerWidth, height: window.innerHeight },
                          scrollWidth: document.documentElement.scrollWidth,
                          clientWidth: document.documentElement.clientWidth,
                          bodyScrollWidth: document.body.scrollWidth,
                          hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
                          overflowingNodes: overflowNodes,
                          layoutData,
                          firstImage: firstImage
                            ? (() => {
                                const rect = firstImage.getBoundingClientRect();
                                return {
                                  width: Math.round(rect.width),
                                  height: Math.round(rect.height),
                                  top: Math.round(rect.top),
                                };
                              })()
                            : null,
                          firstHeading: firstHeading
                            ? (() => {
                                const rect = firstHeading.getBoundingClientRect();
                                return {
                                  text: firstHeading.textContent?.trim() ?? "",
                                  width: Math.round(rect.width),
                                  top: Math.round(rect.top),
                                };
                              })()
                            : null,
                          headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
                        };
                    }""",
                    LAYOUT_SELECTORS,
                )

                screenshot_path = SCREENSHOT_DIR / f"{route_slug}__{viewport_name}.png"
                page.screenshot(path=str(screenshot_path), full_page=True)

                report.append(
                    {
                        "route": route,
                        "routeSlug": route_slug,
                        "viewportName": viewport_name,
                        "width": width,
                        "height": height,
                        "metrics": metrics,
                        "screenshot": str(screenshot_path),
                    }
                )

                context.close()

        browser.close()

    (OUTPUT_DIR / "report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    summary: dict[str, dict] = {}
    for item in report:
        route = item["route"]
        metrics = item["metrics"]
        if route not in summary:
            summary[route] = {
                "overflowViewports": [],
                "serviceLayoutModes": [],
            }
        if metrics["hasHorizontalOverflow"]:
            summary[route]["overflowViewports"].append(item["viewportName"])

        service_layout = next(
            (entry for entry in metrics["layoutData"] if entry["selector"] == ".service-layout"),
            None,
        )
        if service_layout:
            summary[route]["serviceLayoutModes"].append(
                {
                    "viewport": item["viewportName"],
                    "gridTemplateColumns": service_layout["gridTemplateColumns"],
                    "width": service_layout["width"],
                    "height": service_layout["height"],
                }
            )

    (OUTPUT_DIR / "summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
