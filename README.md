# Podcastr - AI-Powered Podcast Creation Platform

## Technologies Used

### Core Technologies
- **Next.js 14** - React framework for production
- **TypeScript** - Static typing for JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Convex** - Backend database and real-time sync

### AI & Authentication
- **Ollama** - Local LLM for content generation
- **gTTS** - Google Text-to-Speech API for voice generation
- **Clerk** - User authentication and management

### Development Tools
- **ShadCN UI** - UI component library
- **Flask** - Python web framework for TTS server
- **Node.js** - JavaScript runtime

## Prerequisites

Before running the project, make sure you have the following installed:
- Node.js (v18 or higher)
- Python 3.9 or higher
- Ollama (for local AI)
- Git

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [your-repository-url]
   cd jsm_podcastr
   ```

2. **Install Dependencies**
   ```bash
   # Install Node.js dependencies
   npm install

   # Create Python virtual environment and install dependencies
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Environment Setup**
   Create a .env file in the root directory:
   ```env
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_public_convex_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
   NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
   ```

## Running the Project

1. **Start the Development Servers**

   Option 1 - Using the automated script:
   ```bash
   # Make the script executable
   chmod +x run-project.sh
   
   # Run all services
   ./run-project.sh
   ```

   Option 2 - Manual startup:
   ```bash
   # Terminal 1: Start the Python TTS server
   source .venv/bin/activate
   python tts_server.py

   # Terminal 2: Start the Convex development server
   npx convex dev

   # Terminal 3: Start the Next.js development server
   npm run dev
   ```

2. **Access the Application**
   - Web App: http://localhost:3000
   - TTS Server: http://localhost:5001
   - Convex Dashboard: https://dashboard.convex.dev

## Common Issues & Solutions

1. **TTS Server Issues**
   ```bash
   # If TTS server fails to start, ensure Python environment is active
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Ollama Setup**
   ```bash
   # Install Ollama and pull the Mistral model
   brew install ollama
   ollama pull mistral
   ```

3. **Port Conflicts**
   - TTS Server uses port 5001
   - Next.js uses port 3000
   - If these ports are in use, they need to be freed or configured to use different ports

## Features

- 🎙️ **AI-Powered Content**: Generate podcast content using local Ollama LLM
- 🗣️ **Text-to-Speech**: Convert text to natural-sounding audio using gTTS
- 🖼️ **Thumbnail Generation**: Create attractive podcast thumbnails
- 👤 **User Authentication**: Secure user management with Clerk
- 🎵 **Advanced Audio Player**: Full-featured playback controls
- 🔍 **Search & Discovery**: Find and explore podcasts easily
- 📱 **Responsive Design**: Works on all devices
- 💾 **Real-time Database**: Powered by Convex
- 🎨 **Modern UI**: Built with Tailwind CSS and ShadCN
- 🔄 **State Management**: Real-time updates and synchronization

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
# openai api keys
OPENAI_API_KEY=

# Convex api keys
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk api keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
```

Replace the placeholder values with your actual Convex & Clerk credentials. You can obtain these credentials by signing up on the [Convex](https://www.convex.dev/) and [Clerk](https://clerk.com/) websites.