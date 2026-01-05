# 🚀 AI Short Video Generator

A full-stack SaaS application that uses Artificial Intelligence to automatically generate YouTube Shorts, TikTok videos, and Instagram Reels. This application allows users to generate scripts, create voiceovers, generate visuals, and render complete videos with captions—all from a simple text prompt.

![Project Banner](public/logo.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Database & Authentication Setup](#-database--authentication-setup)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [Credits](#-credits)

---

## ✨ Features

- **🤖 AI Content Generation**: Generates engaging video scripts using **Gemini AI**.
- **🎨 AI Image Generation**: Creates unique, style-consistent images (Anime, 3D, Realistic, etc.) for each scene using Flux/SDXL models.
- **🗣️ AI Voiceover**: Converts script to natural-sounding speech with multiple voice accents.
- **📝 Automatic Captions**: Generates and overlays perfectly timed captions/subtitles on the video.
- **🎞️ Video Rendering**: Renders high-quality videos in the cloud using **Remotion**.
- **🔐 Authentication**: Secure Google Sign-In authentication using **Firebase**.
- **💳 Credits System**: Integrated credits system to manage usage (SaaS model) with **PayPal** integration.
- **⚡ Background Processing**: Uses **Inngest** for handling serverless background jobs (video generation queue).
- **💾 Database**: Real-time data storage using **Convex**.
- **📱 Responsive Dashboard**: Beautiful UI built with Tailwind CSS and Shadcn/UI (Dark Mode included).

---

## 🛠 Tech Stack

**Frontend:**
- **Next.js 15** (App Router)
- **React.js**
- **Tailwind CSS**
- **Shadcn/UI**
- **Lucide React**

**Backend & Services:**
- **Convex**: Backend-as-a-Service (Database & Real-time updates).
- **Firebase**: User Authentication (Google Auth) & Storage.
- **Inngest**: Event-driven queues for background video processing.
- **Remotion**: Programmatic video creation.

**AI APIs:**
- **Gemini API**: Script generation.
- **AI Guruji / Replicate**: Image & Audio generation.

---

## ⚙ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

You will need accounts for:
- [Convex.dev](https://www.convex.dev/)
- [Firebase Console](https://console.firebase.google.com/)
- [Inngest](https://www.inngest.com/)
- [Google Gemini API](https://ai.google.dev/)

---

## 📥 Installation

1. **Clone the Repository**
```bash
   git clone https://github.com/Awezsk/ai-short-video-genrator.git
   cd ai-short-video-genrator
```

2. **Install Dependencies**
```bash
   npm install
   # or
   yarn install
```

3. **Initialize Convex**
```bash
   npx convex dev
```
   Follow the prompts to log in and configure your Convex project.

4. **Initialize UI Components (Optional)**
   If Shadcn is missing styles:
```bash
   npx shadcn-ui@latest init
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and add the following keys:
```env
# Convex (Automatically added by npx convex dev)
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Gemini API (Script Generation)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Firebase Config (Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Image/Audio Generation (AI Guruji or Replicate)
NEXT_PUBLIC_AI_GURU_API_KEY=your_api_key

# PayPal (Payments)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 🗄 Database & Authentication Setup

### 1. Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/) -> Create Project.
2. Navigate to **Authentication** -> **Sign-in method**.
3. Enable **Google**.
4. Copy the credentials to your `.env.local`.

### 2. Convex Schema

Ensure your `convex/schema.ts` includes the Users and Videos tables:
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    credits: v.number(),
  }),
  videos: defineTable({
    videoScript: v.any(),
    audioUrl: v.string(),
    captions: v.any(),
    imageList: v.array(v.string()),
    createdBy: v.string(),
    status: v.string(), 
  }),
});
```

---

## 🚀 Usage

1. **Start the Development Server**
```bash
   npm run dev
```
   Visit http://localhost:3000.

2. **Run Inngest (Background Functions)**
   In a separate terminal, run:
```bash
   npx inngest-cli@latest dev
```
   This opens the Inngest local dashboard (usually at http://localhost:8288) to handle the video generation queue.

3. **Create a Video**
   - Log in using Google.
   - Go to Dashboard.
   - Click "Create New Video".
   - Select Topic, Style, and Duration.
   - Click Generate.

---

## 🚢 Deployment

### 1. Deploy to Vercel

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add all Environment Variables in Vercel settings.
4. Deploy.

### 2. Production Database

Run this command to push your Convex schema to production:
```bash
npx convex deploy
```

Update the `NEXT_PUBLIC_CONVEX_URL` in Vercel with your production Convex URL.

---

## 📄 License

This project is licensed under the MIT License.

---
