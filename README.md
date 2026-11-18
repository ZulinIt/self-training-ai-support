# Fit Check Website

**HUNTER HUD // System Awakening Protocol** — a 5-step, mobile-first fitness onboarding experience. The user sets their body stats, goal, injuries/diet flags, "hunter class" and training days, then gets a generated Hunter Card, workout split and meal plan.

Plain HTML + CSS + JavaScript. **No build step, no install, no backend** — just static files.

## Folder structure

```
fit-check-website/
├── index.html                  # The page (all 5 steps + header/footer)
├── README.md
├── assets/
│   └── favicon.svg             # Browser tab icon
├── css/
│   └── style.css               # Custom styles (grid, glow, animations, scrollbar)
└── js/
    ├── tailwind-config.js      # Tailwind theme (colors, fonts) — loaded after the CDN script
    ├── core/
    │   ├── state.js            # AppState: every value the user picks
    │   ├── audio.js            # Beep sound effects + sound toggle
    │   ├── navigation.js       # Next/Back + step rendering + progress bar
    │   └── main.js             # Recalibrate, save button, startup
    ├── steps/
    │   ├── step1-vessel.js     # Gender + age
    │   ├── step2-metrics.js    # Height, weight, goal, calorie/macro calculation
    │   ├── step3-health.js     # Injury areas + dietary flags
    │   └── step4-archetype.js  # Hunter class, target muscles, training days
    └── results/
        ├── synthesis.js        # Loading sequence, result tabs, Hunter Card
        ├── workouts.js         # Workout plan generator
        └── rations.js          # Meal plan generator
```

The scripts are plain `<script>` files (not modules), loaded in order at the bottom of `index.html`, so they share one global scope and the `onclick="..."` buttons keep working.

## Run it locally

Double-click `index.html`, or from this folder run:

```
python3 -m http.server 8000
```
then open http://localhost:8000

## Host it (free options)

Upload the **whole folder** (keep `index.html` at the top level):

- **Netlify Drop** — go to app.netlify.com/drop and drag the folder in. Live in seconds.
- **Vercel** — import the folder or a GitHub repo; no settings needed (Framework: "Other").
- **GitHub Pages** — push to a repo → Settings → Pages → deploy from the `main` branch, root folder.
- **Cloudflare Pages** — create a project and upload the folder directly.

## Good to know

- Tailwind CSS and the Google Fonts / Material Icons load from CDNs, so visitors need an internet connection.
- The Tailwind CDN is fine for a simple site. If you later want it faster, compile Tailwind and replace the CDN script with a built CSS file.
- Nothing is stored or sent anywhere — everything lives in the browser while the page is open. The "Save" button is currently a visual effect only.
