# Team Directory - Frontend Assessment

This is a [Next.js](https://nextjs.org/) project implementing a Team Directory feature as part of a frontend developer technical assessment.

## Features Implemented

1. **Page & Routing**
   - Created a new route at `/team-directory`
   - Implemented responsive layout (mobile-first)
   - Added dynamic SEO metadata using `next-intl`

2. **Data Layer**
   - Defined GraphQL query: `GET_TEAM_MEMBERS` with support for pagination, filtering, and sorting
   - Used Apollo Client with TypeScript types
   - Implemented mock data with realistic network delay for demonstration

3. **State Management**
   - Created a Zustand store managing:
     - Team members list
     - Active filters (role, searchTerm)
     - Pagination state (currentPage, totalPages)
     - Sort state (sortField, sortOrder)
     - View mode (table/grid) with localStorage persistence
   - Included actions for updating filters, pagination, sorting, and clearing filters

4. **UI Components**
   - **TeamMemberCard**: Shows avatar, name, role, email with hover state and smooth transitions
   - **TeamFilters**: Search input (debounced 300ms), role dropdown, "Clear filters" button, and view toggle
   - **TeamTable**: Data table using TanStack Table v8 with sorting, pagination, and filtering
   - **TeamGrid**: Responsive grid layout showing team members as cards

5. **Internationalization**
   - Added translations to `en.json` and `ar.json`
   - Implemented i18n support for all components with RTL layout support
   - Dynamic metadata based on selected locale

6. **Additional Features**
   - Debounced search (300ms delay) for performance optimization
   - Filter by role (Admin, Agent, Creator)
   - Multiple pagination options (Previous/Next buttons, Load more)
   - Sorting by Name or Role
   - Loading states with skeleton components
   - Empty state display
   - Responsive design (mobile & desktop)
   - View mode persistence in localStorage
   - Strict TypeScript typing throughout
   - Error handling with user-friendly messages

## Technical Implementation

- **Framework**: Next.js 16 with App Router
- **Component Library**: Radix UI primitives and custom styling
- **Styling**: Tailwind CSS with RTL support
- **Table Library**: TanStack Table v8 for advanced tabular data display
- **State Management**: Zustand for efficient global state management
- **Internationalization**: next-intl for i18n support with EN/AR locales
- **Data Fetching**: Apollo Client for GraphQL with mock API implementation
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Performance**: Debounced search, optimized re-renders, loading skeletons
- **Accessibility**: Proper ARIA attributes, semantic HTML, keyboard navigation ready

## Architecture Overview

The application follows a feature-based architecture with the following structure:

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # Internationalized routes
│   │   └── team-directory/ # Team directory page
├── features/               # Feature modules
│   └── team/               # Team directory feature
│       ├── components/     # React components
│       ├── hooks/          # Custom React hooks
│       ├── stores/         # Zustand stores
│       ├── types/          # TypeScript type definitions
│       ├── queries/        # GraphQL queries
│       └── lib/            # Utility functions and mock API
├── lib/                    # Shared utilities (Apollo client)
├── messages/               # Internationalization files (en.json, ar.json)
```

## Approach & Design Decisions

1. **State Management**: Chose Zustand over Context API for its simplicity and performance with global state
2. **UI Components**: Used Radix UI primitives for accessible base components with custom Tailwind styling
3. **Table Implementation**: Implemented TanStack Table v8 for advanced features like sorting and virtualization
4. **Internationalization**: Used next-intl for robust locale handling and SEO benefits
5. **Performance**: Implemented debounced search to reduce API calls and improve responsiveness
6. **User Experience**: Added loading skeletons, view mode persistence, and smooth transitions
7. **Code Organization**: Structured as feature-based modules for better maintainability

## Bonus Features Implemented

- **View Toggle**: Seamless switching between table and grid views with localStorage persistence
- **Advanced Sorting**: Client-side sorting by name or role with visual indicators
- **Enhanced UI/UX**: Hover effects, smooth transitions, and responsive design
- **Robust Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility Features**: Semantic HTML, proper ARIA attributes, and keyboard navigation readiness

## Known Limitations & Tradeoffs

- The mock API simulates network delays but doesn't represent a real backend implementation
- Client-side sorting is applied after data fetch for demonstration purposes
- Pagination is implemented in the mock API but could be enhanced with more sophisticated logic
- RTL support is implemented but could benefit from more thorough testing

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

The project is organized with the following key files and directories:

- `/src/features/team/components/` - All UI components for the team directory
- `/src/features/team/stores/` - Zustand store implementation
- `/src/features/team/hooks/` - Custom React hooks
- `/src/features/team/queries/` - GraphQL queries
- `/src/features/team/types/` - TypeScript type definitions
- `/src/features/team/data/` - Mock data
- `/src/features/team/lib/` - Helper functions
- `/messages/` - Internationalization files
- `/src/app/[locale]/team-directory/` - Internationalized Team Directory page
- `/src/lib/apollo-client.ts` - Apollo Client configuration

## Tech Stack

- **Frontend Framework**: Next.js 16
- **UI Library**: Radix UI & Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: Apollo Client + GraphQL
- **Table Component**: TanStack Table v8
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Build Tool**: Next.js Compiler