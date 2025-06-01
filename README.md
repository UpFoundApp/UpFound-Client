# UpFound - Product Hunt Style App

A modern web application built with Nuxt to showcase and discover new products, similar to Product Hunt. This platform allows users to submit products, upvote them, view detailed product information, and interact with other makers.

## Features

- **Product Browsing**: Discover and browse through a wide range of products  
- **Product Details**: View comprehensive information about each product  
- **User Authentication**: Register, login, and maintain user profiles  
- **Product Submission**: Submit new products with details and media  
- **Interactive Features**: Upvote products and view user profiles  
- **Responsive Design**: Works seamlessly on desktop and mobile devices  

## Technology Stack

- **Framework**: Nuxt.js (Vue 3 based framework)  
- **Styling**: Tailwind CSS  
- **State Management**: Vue 3 Composition API  
- **Routing**: Nuxt default router  
- **API Integration**: Fetch API  

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)  
- npm, yarn, or pnpm  

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/UpFoundApp/UpFound-Client
cd UpFound-Client

# Install dependencies
npm install

# or using yarn
yarn install

# or using pnpm
pnpm install
```

## Environment Setup

Create a `.env` file in the root directory:

```bash
NUXT_API_URL=http://localhost:3001/api
```

Replace the URL with your backend API endpoint.

## Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production
```bash
# Generate static site
npm run generate

# or build for server-side rendering
npm run build
```

## Key Components

- **Product Submission Form**: A comprehensive form to submit new products with validation  
- **Product Cards**: Display product information in an attractive card format  
- **User Profile**: View user submissions and upvoted products  
- **Authentication**: Login and registration forms with validation