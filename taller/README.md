# Payment Transaction Dashboard

A modern React + TypeScript dashboard for viewing, filtering, and summarizing payment transactions. Built with [Material UI (MUI)](https://mui.com/) for a responsive and clean user experience.

## Features

- **Transaction List:** View a paginated list of transactions.
- **Date Range Filter:** Filter transactions by start and end date.
- **Description Filter:** Search transactions by description.
- **Sort:** Sort transactions by amount (ascending/descending).
- **Summary:** See total number of transactions and total amount (in USD) for the current filter.
- **Responsive Design:** Looks great on desktop and mobile.
- **Error Handling:** Graceful error messages for data loading issues.
- **Modern UI:** Built with MUI components for a consistent look and feel.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm start
   # or
   yarn start
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
  components/
    Dashboard.tsx         # Main dashboard UI and filters
    TransactionList.tsx   # List, summary, and pagination
    TransactionItem.tsx   # Individual transaction card
    Dashboard.css         # Custom styles
  data/
    transactions.ts       # Mock transaction data
  types/
    transaction.ts        # TypeScript types
  index.tsx               # App entry point
  index.css               # Global styles
```

## Customization

- **Transaction Data:** Edit `src/data/transactions.ts` to change or expand the mock data.
- **Styling:** Adjust MUI theme or add styles in `Dashboard.css` or `index.css`.

## Scripts

- `npm start` — Run the app in development mode.
- `npm run build` — Build for production.
- `npm test` — Run tests (if available).

## License

MIT

---
