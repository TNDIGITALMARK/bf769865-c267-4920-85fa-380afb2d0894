# Ronim - Social Media Platform

A Facebook-like social media platform built with Next.js, React, and Shadcn/UI.

## Features

- **Authentication System**: Login and registration forms
- **News Feed**: Create, like, comment, and share posts
- **User Profiles**: Personal profiles with bio, followers, and posts
- **Real-time Messaging**: Chat with friends and group conversations
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: System-aware theme switching

## Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **UI Library**: Shadcn/UI + Radix UI components
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **State Management**: React hooks (useState)
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- **`/`**: Landing page with authentication forms
- **`/feed`**: Main news feed with posts
- **`/profile`**: User profile page
- **`/messages`**: Messaging interface

## Components

- **Navigation**: Global navigation component
- **UI Components**: Reusable Shadcn/UI components
- **Theme Provider**: Dark/light mode support

## Development Notes

This project uses `export const dynamic = 'force-dynamic';` for client-side interactivity and browser API usage.

## Future Enhancements

- Real database integration
- User authentication with JWT
- Real-time messaging with WebSocket
- Media upload functionality
- Push notifications
- Mobile app version
