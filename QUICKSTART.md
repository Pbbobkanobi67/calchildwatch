# CalChildWatch - Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   unzip calchildwatch-full.zip
   cd calchildwatch
   git init
   git add .
   git commit -m "Initial commit: CalChildWatch v0.1"
   gh repo create calchildwatch --public --push
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"
   - Done! Your site is live.

3. **Set up GitHub Secrets** (for automated updates)
   - In GitHub repo → Settings → Secrets → Actions
   - Add:
     - `VERCEL_TOKEN` (from Vercel dashboard)
     - `VERCEL_ORG_ID` (from .vercel/project.json after first deploy)
     - `VERCEL_PROJECT_ID` (from .vercel/project.json)

### Option 2: Manual Deploy

```bash
npm install
npm run build
# Upload /build folder to any static host
```

---

## 📊 Run the Scraper

```bash
cd scripts
pip install -r requirements.txt

# Scrape San Diego County
python scrape_ccld.py --county "San Diego" --output ../data

# Scrape all counties (takes a while)
python scrape_ccld.py --all-counties --output ../data
```

---

## 📝 File CPRA Requests

1. Open `CPRA_TEMPLATES.md`
2. Copy the template for your target agency
3. Fill in your info
4. Send via email or agency portal
5. Track in GitHub Issues using the CPRA template

---

## 🐦 Post to X

1. Open `X_THREAD.md`
2. Replace `[YOUR_VERCEL_URL]` with your live URL
3. Replace `[YOUR_USERNAME]` with your GitHub username
4. Post the thread (space tweets 5-10 min apart)

---

## 📁 Project Structure

```
calchildwatch/
├── src/App.js           # Main React app
├── src/App.css          # Styles
├── src/utils/           # Data loading utilities
├── scripts/             # Python scraper
├── data/                # Scraped JSON data
├── .github/workflows/   # Auto-update pipelines
├── CPRA_TEMPLATES.md    # Records request templates
├── X_THREAD.md          # Twitter thread content
└── CONTRIBUTING.md      # How to help
```

---

## ✅ Next Steps

1. [ ] Deploy to Vercel
2. [ ] Update X post with live URL
3. [ ] Run scraper for San Diego County
4. [ ] File first CPRA request
5. [ ] Create GitHub Issues for tracking
6. [ ] Recruit contributors

---

## 🆘 Need Help?

- React issues → Check console for errors
- Scraper issues → Run with `--delay-min 3 --delay-max 5`
- Vercel issues → Check build logs
- CPRA questions → See First Amendment Coalition resources

Good luck! Let's bring transparency to California childcare. 🌟
