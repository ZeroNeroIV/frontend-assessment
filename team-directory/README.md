# Team Directory - Frontend Assessment

This is a [Next.js](https://nextjs.org/) project implementing a Team Directory feature as part of a frontend developer technical assessment.

## Features Implemented

1. **Page & Routing**
   - Created a new route at `/team-directory`
   - Implemented responsive layout (mobile-first)
   - Added SEO metadata using `next-intl`

2. **Data Layer**
   - Defined GraphQL query: `GET_TEAM_MEMBERS` with support for pagination and filtering
   - Used Apollo Client with TypeScript types
   - Implemented mock data for demonstration

3. **State Management**
   - Created a Zustand store managing:
     - Team members list
     - Active filters (role, searchTerm)
     - Pagination state (currentPage, totalPages)
     - View mode (table/grid)
   - Included actions for updating filters, pagination, and clearing filters

4. **UI Components**
   - **TeamMemberCard**: Shows avatar, name, role, email with hover state
   - **TeamFilters**: Search input (debounced 300ms), role dropdown, "Clear filters" button, and view toggle
   - **TeamTable**: Data table using TanStack Table v8 with sorting, pagination, and filtering
   - **TeamGrid**: Responsive grid layout showing team members as cards

5. **Internationalization**
   - Added translations to `en.json` and `ar.json`
   - Implemented i18n support for all components

6. **Additional Features**
   - Debounced search (300ms delay)
   - Filter by role (Admin, Agent, Creator)
   - Pagination with "Previous"/"Next" buttons
   - Sorting by Name or Role
   - Loading states with skeleton components
   - Empty state display
   - Responsive design (mobile & desktop)
   - Strict TypeScript typing throughout
   - Error handling with user-friendly messages

## Technical Implementation

- **Component Library**: Used Radix UI primitives and custom styling
- **Styling**: Tailwind CSS with RTL support
- **Table Library**: TanStack Table v8 for tabular data display
- **State Management**: Zustand for global state
- **Internationalization**: next-intl for i18n support
- **Data Fetching**: Apollo Client for GraphQL with mock implementation
- **Responsive Design**: Mobile-first approach with grid/flex layouts

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!