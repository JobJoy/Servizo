# Servizo - Local Services Marketplace

Servizo is a marketplace platform for local services and job requests, connecting service providers with clients in the Philippines. Users can search for services, post their own service offerings or job needs, and manage their profiles.

This project is built with React, TypeScript, Vite, and Supabase.

## Features

- User authentication and profile management
- Create, edit, and delete service/job listings
- Search for services and providers
- Send and manage inquiries between users
- Real-time notifications for inquiries and reviews
- PWA support for app installation
- AI-powered content generation for service listings

---

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A [Supabase](https://supabase.com/) project
- A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/servizo-app.git
    cd servizo-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    This project requires a Supabase backend and a Google Gemini API key. The Supabase client is already configured in `src/lib/supabaseClient.ts`, but you should ensure your Supabase project's database schema matches the types in `src/types.ts`.

    For the AI features, you need to provide a Gemini API key. The application expects this key to be available as `process.env.API_KEY`. For local development with Vite, you must create a `.env.local` file in the project root and add your key:

    ```
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
    
    Then, to make it available as `process.env.API_KEY`, update your `vite.config.ts` file:
    
    ```ts
    import { defineConfig, loadEnv } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), '');
      return {
        base: '/servizo-app/',
        plugins: [react()],
        define: {
          'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
        }
      }
    })
    ```

---

## Development

To run the application locally with hot-reloading:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

---

## Building and Deployment

### Build for Production

To create a production-ready build of the application:

```bash
npm run build
```

This command will generate a `dist` folder in the project root with optimized static assets.

### Deploying to GitHub Pages

This project is pre-configured for deployment to GitHub Pages.

1.  **Update Configuration:**
    -   In `package.json`, change the `"homepage"` URL to match your GitHub repository.
    -   In `vite.config.ts`, change the `base` property to match your repository name (e.g., `'/your-repo-name/'`).

2.  **Deploy:**
    Run the deploy script:
    ```bash
    npm run deploy
    ```
    This will build the project and push the contents of the `dist` directory to the `gh-pages` branch of your repository.
