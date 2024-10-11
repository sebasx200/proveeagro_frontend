# ProveeAgro Front End Setup Guide

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed. You can download it from the [official Node.js website](https://nodejs.org/).

## Steps to Setup

1. **Clone the repository** and navigate to the project directory.

2. **Install the required dependencies**:

   ```sh
   npm install
   ```

3. **Clone the `.env.template` file** and rename it to `.env`. Fill in the necessary environment variables. Specifically, you need to set the `VITE_API_URL` variable to the base URL of your Django backend

4. **Start the development server**:

   ```sh
   npm run dev
   ```

5. **Build the production-ready code** (if necessary):
   ```sh
   npm run build
   ```

## Note

Make sure the environment variables in the `.env` file are correctly set up according to your project’s requirements.
