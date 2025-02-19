# Lego Ranking Frontend

Frontend application for viewing and ranking LEGO sets built with Next.js. This application provides an interactive interface for browsing, filtering, and analyzing LEGO sets based on various criteria including price per element ratio.

## Tech Stack

- Next.js 15.1
- React 19.0
- TypeScript 5.7
- Tailwind CSS 3.4
- React Icons 5.4

## Features

- Responsive design optimized for all device sizes
- Real-time filtering and sorting of LEGO sets
- Advanced search functionality
- Detailed LEGO set information display
- Dynamic pagination
- Price per element ratio analysis
- Theme and age category filtering
- Availability status indicators
- Mobile-friendly sidebar filters

## Prerequisites

- Node.js 22.12 or higher
- npm or yarn package manager
- Docker and Docker Compose (if running with containers)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following content or set environment variables directly:

```env
NODE_ENV=development
API_URL="http://localhost:8000/api"
```

or

```bash
export NODE_ENV=development
export API_URL="http://localhost:8000/api"
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Main page component
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── filters.tsx   # Filtering components
│   │   ├── inputs.tsx    # Form input components
│   │   ├── lego-set.tsx  # LEGO set display component
│   │   └── ...          # Other components
│   └── lib/             # Utilities and types
│       ├── actions.ts    # API actions
│       ├── types.ts      # TypeScript types
│       └── utils.ts      # Utility functions
├── public/              # Static assets
├── next.config.ts       # Next.js configuration
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Docker Support

The frontend can be run as part of the complete application using Docker Compose:

```bash
docker compose up frontend
```

Or build the frontend container separately:

```bash
docker build -t lego-ranking-frontend .
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Component Features

### Filtering

- Price range filtering
- Element count filtering
- Theme filtering
- Age category filtering
- Availability status filtering
- Minifigure count filtering

### Sorting

- Price (ascending/descending)
- Elements count (ascending/descending)
- Price per element (ascending/descending)
- Minifigures count (ascending/descending)

### Layout

- Responsive grid layout
- Mobile-friendly navigation
- Collapsible sidebar on mobile
- Loading states and animations
- Pagination controls

## Related Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
