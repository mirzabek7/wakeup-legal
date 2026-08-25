# WakeUp — legal pages

Privacy Policy and Terms of Use for the WakeUp iOS app, published as a static site through
GitHub Pages. Kept in its own repository because GitHub Pages needs a **public** repo on the free
plan, while the app's source stays private.

## Before publishing — fill in the placeholders

Three things are marked in pink in the pages and must be replaced. Search all three files for
the square brackets:

| Placeholder | What to put there |
|---|---|
| `[DEVELOPER LEGAL NAME]` | The name that appears as the seller on the App Store — a person or a company |
| `[SUPPORT EMAIL]` | An address you will actually read. Do not use a personal address you would rather keep private; the pages are public |
| `[COUNTRY / JURISDICTION]` | The country whose law governs the terms — normally where you or the company are based |

They appear in `index.html`, `privacy.html` and `terms.html`.

## Publishing on GitHub Pages

1. Create a new **public** repository, for example `wakeup-legal`.
2. Push these files to it:

```bash
cd "wakeup-legal"
git init
git add .
git commit -m "Add privacy policy and terms of use"
git branch -M main
git remote add origin https://github.com/<your-username>/wakeup-legal.git
git push -u origin main
```

3. In the repository: **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to *Deploy from a branch*, **Branch** to `main`
   and folder to `/ (root)`. Save.
5. Wait a minute or two. The site appears at:

```
https://<your-username>.github.io/wakeup-legal/
https://<your-username>.github.io/wakeup-legal/privacy.html
https://<your-username>.github.io/wakeup-legal/terms.html
```

Open all three in a browser before using them anywhere. A link that 404s is worse than no link.

## Where the links go

**In the app.** `Sources/Features/Paywall/PaywallView.swift` currently points at
`team13.example.com`, which does not exist. Both URLs need replacing with the real ones.

**In App Store Connect.** Under the app's information:

- *Privacy Policy URL* — the `privacy.html` link. Required for every app.
- *License Agreement* — the `terms.html` link. Required for auto-renewable subscriptions.

Apple checks that these load. A placeholder or a dead link is a straightforward rejection.

## Keeping them honest

These pages describe what the app actually does today: no account, on-device pose detection,
Firebase analytics, RevenueCat for purchase state. If any of that changes — a login is added,
data starts leaving the device, a new SDK arrives — the pages have to change with it, and the
date at the top of each one updated.

## A word of caution

These are drafts written to match the app's real behaviour, not legal advice. If the app takes
money in a market with strict consumer rules, have a lawyer read them before launch.
