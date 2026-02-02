# Balance Sheet - Demo

A demo version of the Balance Sheet personal finance tracker. This site shows the full UI with sample data — no real financial information is used.

## Features Showcased

- **Dashboard** with income, expenses, net position, essential/optional breakdowns
- **Transaction management** with monthly tabs, search, filters, and sortable columns
- **Reports** with interactive Chart.js charts (category pie chart, monthly trend line chart)
- **Category breakdown** with expandable transaction details
- **Cash position tracking** with runway calculations
- **CSV import** support for ANZ, CBA, NAB, and Amex statement formats
- **PDF export** with customizable report sections
- **Smart categorization** with 18+ expense categories and learned rules
- **Fuzzy matching** for bulk category updates across similar transactions
- **Xero-inspired dark mode** theme

## Tech Stack

- HTML5 + CSS3 (custom dark theme)
- Bootstrap 5.3
- Chart.js 4.4
- Vanilla JavaScript

## Running Locally

Open `index.html` in your browser, or serve with any static file server:

```bash
cd balance-sheet-demo
python3 -m http.server 8081
# Open http://localhost:8081
```

## Deployment

This is a static site — deploy to GitHub Pages, Netlify, Vercel, or any static hosting provider.
