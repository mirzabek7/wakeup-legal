# Ryzup — legal pages

Privacy Policy and Terms of Use for the Ryzup iOS app, published as a static site through
GitHub Pages. Kept in its own repository because GitHub Pages needs a **public** repo on the free
plan, while the app's source stays private.

## Filled in

Publisher is **Mirzabek Sadullaev**, contact **mirzabeksmrm77@gmail.com**. Nothing is left
blank — the pages can go up as they are.

Note that the contact address is public on these pages, which is normal for an app's support
address but worth knowing.

### No governing-law clause

The terms deliberately do not name a country whose law applies. Leaving it out is a valid
choice: for consumer contracts a court usually applies the buyer's own national law regardless
of what the terms say, so the clause rarely changes the outcome for a small app. It can be added
later if a lawyer advises it.

## Languages

Each page carries all seven translations in one file: English, Russian, Spanish, German, French,
Portuguese and Japanese. `assets/i18n.js` shows exactly one of them and hides the rest.

Which one a visitor sees, in order of preference:

1. `?lang=xx` in the URL — `privacy.html?lang=de`
2. `#xx` in the URL
3. the language they last picked from the switcher (kept in `localStorage`)
4. their browser's language list (`pt-BR` resolves to `pt`, and so on)
5. English

The switcher at the top right of every page changes the language, rewrites the URL to `?lang=xx`,
and carries the choice across the links between the three pages.

There is one URL per document, not one per language, so the links in the app and in App Store
Connect stay as they are and adapt to each reader. If you prefer to point a specific App Store
Connect localisation at a specific language, add `?lang=xx` to that URL.

Without JavaScript all seven versions render stacked, English first — the pages stay readable and
Apple's checks still pass.

### Editing the text

Every language block is a `<section class="i18n" lang="xx" data-title="…">` with the same
structure: the same number of headings, list items and links in every language. If you change a
clause, change it in all seven, and update the date in each block's `<p class="date">`. This check
compares the structure of the blocks and catches a section that was missed:

```bash
python3 - <<'EOF'
import re
for f in ['privacy.html', 'terms.html']:
    src = open(f, encoding='utf-8').read()
    parts = re.split(r'<section class="i18n" lang="(\w+)"', src)
    print(f)
    for i in range(1, len(parts), 2):
        body = parts[i + 1].split('</section>')[0]
        counts = {k: len(re.findall(p, body)) for k, p in
                  [('h2', r'<h2[ >]'), ('h3', r'<h3[ >]'), ('li', r'<li>'), ('p', r'<p[ >]')]}
        print(' ', parts[i], counts)
EOF
```

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
