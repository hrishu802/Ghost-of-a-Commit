# 👻 Ghost of a Commit

> **A spooky AI-powered web application that transforms ordinary Git commit messages into humorous, mysterious, Halloween-themed messages from a ghost.**

Built for the **DEV Hacktoberfest 2026 Week 4 Challenge: Ghost in the Machine**.

---

## 🎃 Overview

Every codebase has a history. Some codebases are haunted.

**Ghost of a Commit** brings your git log back from the grave. When you feed it an everyday commit message, it channels **NVIDIA Nemotron 3.5 Lightning** via the **OpenRouter API** to summon a witty, spectral alter-ego of your commit—preserving the real technical intent while speaking in the cryptic, theatrical voice of an ancient phantom.

### Example Transmutation

- **Mortal Input:** `Fixed authentication bug`
- **Ghostly Output:** `"The gates were broken. The spirits could enter without permission. I have sealed them... for now."`

---

## ⚡ Key Features

- 🕯️ **Authentic AI Transmutation**: Powered by NVIDIA's open-weight `nvidia/nemotron-3.5-lightning:free` model via OpenRouter's OpenAI-compatible API.
- 🛡️ **Zero Credential Exposure**: Your `OPENROUTER_API_KEY` stays strictly server-side inside a secure Vercel serverless function (`/api/ghost`).
- 🖥️ **Terminal-Inspired UI**: Styled with charcoal & deep purple aesthetics, eerie emerald glowing runes, and keyboard shortcuts (`⌘/Ctrl + Enter`).
- 👻 **Animated Mascot**: Reactive SVG ghost that reflects the spirit's internal state (slumbering, chanting, triumphant, or spooked).
- 📋 **One-Click Git Commands**: Copy the raw ghost message or copy as `git commit -m "..."` ready for your terminal.
- 🔊 **Spectral Chime**: Web Audio API synthesized whisper chime without heavy external audio files.
- ⚠️ **Honest Error Handling**: Transparently surfaces API status, key configuration, rate limits, and model availability without ever faking mock AI responses.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React, Framer Motion
- **AI Model**: NVIDIA Nemotron 3.5 Lightning (`nvidia/nemotron-3.5-lightning:free`)
- **Inference Provider**: OpenRouter Free Open-Weights API (`https://openrouter.ai/api/v1/chat/completions`)
- **Backend / Deployment**: Vercel Serverless Function (`api/ghost.ts`)

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js 18+ (tested on Node v25)
- An OpenRouter account and API Key ([Get a free key here](https://openrouter.ai/keys) with zero credit card required).

### 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd "Ghost of a Commit"

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and paste your OpenRouter API key:

```env
OPENROUTER_API_KEY=sk-or-v1-your_actual_key_here
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. The Vite dev server includes built-in `/api/ghost` middleware that proxies directly to OpenRouter using your local `.env`.

---

## ☁️ Deployment to Vercel

1. Push your code to GitHub or deploy via the Vercel CLI (`vercel`).
2. In your Vercel Project Settings, navigate to **Environment Variables**.
3. Add the key:
   - **Key:** `OPENROUTER_API_KEY`
   - **Value:** Your OpenRouter API Key (`sk-or-v1-...`)
4. Deploy! Vercel automatically deploys the frontend static assets and provisions the serverless function at `/api/ghost`.

---

## 📁 Project Structure

```
├── api/
│   └── ghost.ts            # Vercel Serverless Function (OpenRouter NVIDIA Nemotron proxy)
├── src/
│   ├── components/
│   │   ├── Footer.tsx      # Hacktoberfest badges & footer
│   │   ├── GhostVisual.tsx # Interactive SVG animated ghost
│   │   ├── GraveyardError.tsx # API failure / key guidance banner
│   │   ├── Header.tsx      # Spooky title & attribution banner
│   │   ├── SpookyOutput.tsx# Ghost response card & copy actions
│   │   └── TerminalInput.tsx# Terminal prompt input & presets
│   ├── App.tsx             # Main application orchestrator
│   ├── index.css           # Custom glow effects, animations, dark theme
│   └── main.tsx            # React DOM root
├── index.html              # HTML head with Google Fonts & favicon
├── tailwind.config.js      # Custom Halloween color tokens & keyframes
├── vite.config.ts          # Vite configuration with local dev API middleware
├── vercel.json             # Vercel routing configuration
├── .env.example            # Sample environment variables
└── README.md
```

---

## 📜 License

MIT License. Created with eerie delight for Hacktoberfest 2026.
