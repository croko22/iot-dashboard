# IoT Dashboard

## Overview

This project is a real-time IoT Dashboard designed to monitor sensor data, manage thresholds, and display system status alerts. It integrates with a FastAPI backend to fetch data and provides a responsive user interface for monitoring environmental conditions.

## Features

-   **Real-time Monitoring**: Displays live data for temperature, humidity, gas levels, and fire detection status.
-   **Threshold Management**: Allows authorized users to configure safety thresholds for temperature and gas levels.
-   **Media Integration**: Visualizes the latest captured imagery and provides playback for recent audio recordings.
-   **System Status**: Prominent status indicators (Normal, Risk, Confirmed) based on real-time sensor analysis.
-   **Responsive Design**: Optimized for both desktop and mobile viewing experiences.

## Technical Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Styling**: Tailwind CSS 4
-   **HTTP Client**: Axios
-   **Icons**: Lucide React

## Setup and Installation

1.  **Prerequisites**: Ensure Node.js and a package manager (npm, yarn, or bun) are installed.
2.  **Installation**:
    ```bash
    npm install
    # or
    bun install
    ```
3.  **Configuration**:
    Copy the example environment file and configure the API URL:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` to set `VITE_API_BASE_URL` (defaults to `http://localhost:8000`).

4.  **Development Server**:
    Start the local development server:
    ```bash
    npm run dev
    # or
    bun dev
    ```

## Build

To create a production-ready build:

```bash
npm run build
# or
bun run build
```

The output will be generated in the `dist` directory.
