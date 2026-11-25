// ============================================================
// DEMO DATA & FETCH INTERCEPTOR
// This file overrides window.fetch so the real app.js works
// without any backend. All data is hardcoded fake data.
// ============================================================

// ============ CATEGORIES ============
const DEMO_CATEGORIES = [
    { id: 1, name: 'Food & Dining', color: '#e74c3c' },
    { id: 2, name: 'Transportation', color: '#e67e22' },
    { id: 3, name: 'Housing & Rent', color: '#f39c12' },
    { id: 4, name: 'Healthcare', color: '#1abc9c' },
    { id: 5, name: 'Pet Care', color: '#d35400' },
    { id: 6, name: 'Personal Care', color: '#9b59b6' },
    { id: 7, name: 'Kids & Education', color: '#feca57' },
    { id: 8, name: 'Childcare & Education', color: '#ffd32a' },
    { id: 9, name: 'Bills & Utilities', color: '#3498db' },
    { id: 10, name: 'Gym & Fitness', color: '#00d2d3' },
    { id: 11, name: 'Subscriptions', color: '#48dbfb' },
    { id: 12, name: 'Books & Media', color: '#ff9ff3' },
    { id: 13, name: 'Shopping', color: '#a29bfe' },
    { id: 14, name: 'Home & Hardware', color: '#ff9f43' },
    { id: 15, name: 'Entertainment', color: '#fd79a8' },
    { id: 16, name: 'Alcohol & Liquor', color: '#ff6348' },
    { id: 17, name: 'Electronics & Tech', color: '#4b6584' },
    { id: 18, name: 'Investments & Savings', color: '#2ecc71' },
    { id: 19, name: 'Taxation', color: '#c0392b' },
    { id: 20, name: 'Income', color: '#27ae60' },
    { id: 21, name: 'Other', color: '#95a5a6' }
];

// Helper to get category name/color by id
function demoCatName(id) {
    const c = DEMO_CATEGORIES.find(x => x.id === id);
    return c ? c.name : 'Other';
}
function demoCatColor(id) {
    const c = DEMO_CATEGORIES.find(x => x.id === id);
    return c ? c.color : '#95a5a6';
}

// ============ EXPENSES ============
// ~120 realistic fake transactions across Jan 2025 - Jan 2026
const DEMO_EXPENSES = [
    // --- INCOME (recurring monthly) ---
    // Salary
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: m, description: 'Direct Credit From ACME CORP - Salary', amount: 6200.00,
        date: `2025-${String(m).padStart(2,'0')}-15`, category_id: 20, category: 'Income',
        is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday',
        tags: ['salary'], notes: '', is_recurring: true, bpay_biller_code: null
    })),
    // Rental income - Property 1
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 100+m, description: 'Transfer From RT ETGAR GLEN EIRA - Rental', amount: 1800.00,
        date: `2025-${String(m).padStart(2,'0')}-01`, category_id: 20, category: 'Income',
        is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday',
        tags: ['rental'], notes: 'Brooklyn Avenue rental income', is_recurring: true, bpay_biller_code: null
    })),
    // Rental income - Property 2
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 200+m, description: 'Transfer From JEREMY WALD - Rent', amount: 1650.00,
        date: `2025-${String(m).padStart(2,'0')}-05`, category_id: 20, category: 'Income',
        is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday',
        tags: ['rental'], notes: 'Denbigh Road rental income', is_recurring: true, bpay_biller_code: null
    })),

    // --- HOUSING (recurring monthly) ---
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 300+m, description: 'BPAY Mortgage Repayment - ANZ Home Loan', amount: 2400.00,
        date: `2025-${String(m).padStart(2,'0')}-20`, category_id: 3, category: 'Housing & Rent',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['mortgage'], notes: '', is_recurring: true, bpay_biller_code: '23456'
    })),
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 400+m, description: 'BPAY Body Corp Strata Fees', amount: 850.00,
        date: `2025-${String(m).padStart(2,'0')}-10`, category_id: 3, category: 'Housing & Rent',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['strata'], notes: '', is_recurring: true, bpay_biller_code: '34567'
    })),

    // --- BILLS & UTILITIES (recurring) ---
    ...[1,3,5,7,9,11].map(m => ({
        id: 500+m, description: 'BPAY AGL Energy - Electricity', amount: 185.40,
        date: `2025-${String(m).padStart(2,'0')}-18`, category_id: 9, category: 'Bills & Utilities',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['electricity'], notes: '', is_recurring: true, bpay_biller_code: '45678'
    })),
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 600+m, description: 'Direct Debit To TELSTRA CORP', amount: 89.00,
        date: `2025-${String(m).padStart(2,'0')}-22`, category_id: 9, category: 'Bills & Utilities',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['phone', 'internet'], notes: '', is_recurring: true, bpay_biller_code: null
    })),

    // --- SUBSCRIPTIONS (recurring monthly) ---
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 700+m, description: 'Purchase NETFLIX.COM', amount: 22.99,
        date: `2025-${String(m).padStart(2,'0')}-03`, category_id: 11, category: 'Subscriptions',
        is_essential: true, transaction_type: 'expense', source_account: 'Amex',
        tags: ['streaming'], notes: '', is_recurring: true, bpay_biller_code: null
    })),
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 800+m, description: 'Purchase SPOTIFY PREMIUM', amount: 12.99,
        date: `2025-${String(m).padStart(2,'0')}-07`, category_id: 11, category: 'Subscriptions',
        is_essential: true, transaction_type: 'expense', source_account: 'Amex',
        tags: ['music'], notes: '', is_recurring: true, bpay_biller_code: null
    })),

    // --- FOOD & DINING (varied) ---
    { id: 900, description: 'Purchase WOOLWORTHS MelbourneCBD', amount: 142.35, date: '2025-01-08', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: 'Weekly shop', is_recurring: false, bpay_biller_code: null },
    { id: 901, description: 'Purchase WOOLWORTHS MelbourneCBD', amount: 98.20, date: '2025-01-22', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 902, description: 'Purchase COLES SUPERMARKET Toorak', amount: 67.80, date: '2025-02-05', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 903, description: 'Purchase UBER EATS Sydney', amount: 42.50, date: '2025-02-14', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['takeaway'], notes: "Valentine's dinner", is_recurring: false, bpay_biller_code: null },
    { id: 904, description: 'Purchase WOOLWORTHS SouthYarra', amount: 115.90, date: '2025-03-02', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 905, description: 'Purchase MENULOG ORDER', amount: 38.90, date: '2025-03-18', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['takeaway'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 906, description: 'Purchase COLES EXPRESS Richmond', amount: 28.50, date: '2025-04-10', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 907, description: 'Purchase WOOLWORTHS MelbourneCBD', amount: 135.60, date: '2025-05-12', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 908, description: 'Purchase UBER EATS Melbourne', amount: 55.20, date: '2025-06-20', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['takeaway'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 909, description: 'Purchase ALDI Prahran', amount: 82.40, date: '2025-07-03', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 910, description: 'Purchase COLES SUPERMARKET SouthYarra', amount: 95.10, date: '2025-08-15', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 911, description: 'Purchase WOOLWORTHS MelbourneCBD', amount: 127.85, date: '2025-09-08', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 912, description: 'Purchase GRILL\'D BURGERS Toorak', amount: 34.50, date: '2025-10-22', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['dining'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 913, description: 'Purchase WOOLWORTHS SouthYarra', amount: 108.25, date: '2025-11-05', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 914, description: 'Purchase UBER EATS Melbourne', amount: 47.80, date: '2025-12-18', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['takeaway'], notes: '', is_recurring: false, bpay_biller_code: null },

    // --- TRANSPORTATION ---
    { id: 950, description: 'Purchase BP TOORAK ROAD', amount: 78.50, date: '2025-01-12', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 951, description: 'Purchase SHELL COLES EXPRESS Richmond', amount: 65.20, date: '2025-02-20', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 952, description: 'Purchase UBER *TRIP Melbourne', amount: 18.50, date: '2025-03-08', category_id: 2, category: 'Transportation', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['rideshare'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 953, description: 'Purchase BP SOUTH YARRA', amount: 82.30, date: '2025-04-15', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 954, description: 'Purchase 7-ELEVEN TOORAK', amount: 12.50, date: '2025-05-02', category_id: 1, category: 'Food & Dining', is_essential: false, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: [], notes: 'Snacks', is_recurring: false, bpay_biller_code: null },
    { id: 955, description: 'Purchase BP TOORAK ROAD', amount: 71.80, date: '2025-06-10', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 956, description: 'Purchase DIDI *TRIP MelbourneAU', amount: 24.30, date: '2025-07-25', category_id: 2, category: 'Transportation', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['rideshare'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 957, description: 'Purchase SHELL COLES EXPRESS SthYarra', amount: 68.90, date: '2025-09-14', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 958, description: 'Purchase BP SOUTH YARRA', amount: 75.40, date: '2025-11-20', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },

    // --- HEALTHCARE ---
    { id: 960, description: 'Purchase PRICELINE PHARMACY Toorak', amount: 35.80, date: '2025-02-10', category_id: 4, category: 'Healthcare', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['pharmacy'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 961, description: 'Purchase DR SMITH MEDICAL CENTRE', amount: 85.00, date: '2025-04-22', category_id: 4, category: 'Healthcare', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['doctor'], notes: 'Annual checkup', is_recurring: false, bpay_biller_code: null },
    { id: 962, description: 'Purchase DENTAL CARE SOUTH YARRA', amount: 280.00, date: '2025-07-15', category_id: 4, category: 'Healthcare', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['dental'], notes: 'Cleaning + check', is_recurring: false, bpay_biller_code: null },

    // --- ENTERTAINMENT ---
    { id: 970, description: 'Purchase VILLAGE CINEMAS Crown', amount: 22.00, date: '2025-01-25', category_id: 15, category: 'Entertainment', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['cinema'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 971, description: 'Purchase TICKETMASTER AU', amount: 120.00, date: '2025-03-28', category_id: 15, category: 'Entertainment', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['events'], notes: 'Comedy show', is_recurring: false, bpay_biller_code: null },
    { id: 972, description: 'Purchase CROWN ENTERTAINMENT', amount: 85.00, date: '2025-06-14', category_id: 15, category: 'Entertainment', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: [], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 973, description: 'Purchase VILLAGE CINEMAS Jam Factory', amount: 44.00, date: '2025-09-20', category_id: 15, category: 'Entertainment', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['cinema'], notes: 'Date night', is_recurring: false, bpay_biller_code: null },

    // --- SHOPPING ---
    { id: 980, description: 'Purchase KMART MelbourneCBD', amount: 45.00, date: '2025-02-28', category_id: 13, category: 'Shopping', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: [], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 981, description: 'Purchase TARGET Chadstone', amount: 89.95, date: '2025-05-18', category_id: 13, category: 'Shopping', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: [], notes: 'Birthday gift', is_recurring: false, bpay_biller_code: null },
    { id: 982, description: 'Purchase UNIQLO MelbourneCBD', amount: 129.90, date: '2025-08-10', category_id: 13, category: 'Shopping', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['clothing'], notes: '', is_recurring: false, bpay_biller_code: null },

    // --- HOME & HARDWARE ---
    { id: 985, description: 'Purchase BUNNINGS WAREHOUSE Hawthorn', amount: 67.30, date: '2025-03-15', category_id: 14, category: 'Home & Hardware', is_essential: false, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: [], notes: 'Garden supplies', is_recurring: false, bpay_biller_code: null },
    { id: 986, description: 'Purchase IKEA Richmond', amount: 245.00, date: '2025-06-28', category_id: 14, category: 'Home & Hardware', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['furniture'], notes: 'Bookshelf', is_recurring: false, bpay_biller_code: null },

    // --- ALCOHOL ---
    { id: 988, description: 'Purchase DAN MURPHY\'S Toorak', amount: 52.00, date: '2025-01-18', category_id: 16, category: 'Alcohol & Liquor', is_essential: false, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: [], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 989, description: 'Purchase BWS SouthYarra', amount: 28.50, date: '2025-04-05', category_id: 16, category: 'Alcohol & Liquor', is_essential: false, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: [], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 990, description: 'Purchase DAN MURPHY\'S MelbourneCBD', amount: 78.00, date: '2025-07-30', category_id: 16, category: 'Alcohol & Liquor', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: [], notes: 'Dinner party supplies', is_recurring: false, bpay_biller_code: null },

    // --- GYM & FITNESS ---
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 1100+m, description: 'Direct Debit To ANYTIME FITNESS', amount: 65.00,
        date: `2025-${String(m).padStart(2,'0')}-01`, category_id: 10, category: 'Gym & Fitness',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['gym'], notes: '', is_recurring: true, bpay_biller_code: null
    })),

    // --- ELECTRONICS & TECH ---
    { id: 1200, description: 'Purchase JB HI-FI MelbourneCBD', amount: 349.00, date: '2025-03-22', category_id: 17, category: 'Electronics & Tech', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['tech'], notes: 'Headphones', is_recurring: false, bpay_biller_code: null },
    { id: 1201, description: 'Purchase APPLE.COM/AU', amount: 14.99, date: '2025-06-05', category_id: 17, category: 'Electronics & Tech', is_essential: false, transaction_type: 'expense', source_account: 'Amex', tags: ['icloud'], notes: 'iCloud storage', is_recurring: false, bpay_biller_code: null },

    // --- INVESTMENTS & SAVINGS ---
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 1300+m, description: 'Direct Debit To FUTURITY INVESTMENT GROUP', amount: 500.00,
        date: `2025-${String(m).padStart(2,'0')}-25`, category_id: 18, category: 'Investments & Savings',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['education bond'], notes: '', is_recurring: true, bpay_biller_code: null
    })),

    // --- TAXATION ---
    { id: 1400, description: 'BPAY ATO Tax Payment', amount: 3200.00, date: '2025-04-28', category_id: 19, category: 'Taxation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['tax'], notes: 'Q3 PAYG instalment', is_recurring: false, bpay_biller_code: '75556' },
    { id: 1401, description: 'Purchase H&R BLOCK Richmond', amount: 450.00, date: '2025-09-30', category_id: 19, category: 'Taxation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['tax return'], notes: 'Annual tax return preparation', is_recurring: false, bpay_biller_code: null },

    // --- PET CARE ---
    { id: 1410, description: 'Purchase PETBARN SouthYarra', amount: 68.50, date: '2025-02-15', category_id: 5, category: 'Pet Care', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['pet food'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 1411, description: 'Purchase GREENCROSS VET Toorak', amount: 185.00, date: '2025-05-28', category_id: 5, category: 'Pet Care', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['vet'], notes: 'Annual vaccination', is_recurring: false, bpay_biller_code: null },

    // --- PERSONAL CARE ---
    { id: 1420, description: 'Purchase KINGS DOMAIN BARBER', amount: 40.00, date: '2025-01-30', category_id: 6, category: 'Personal Care', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['haircut'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 1421, description: 'Purchase KINGS DOMAIN BARBER', amount: 40.00, date: '2025-04-18', category_id: 6, category: 'Personal Care', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['haircut'], notes: '', is_recurring: false, bpay_biller_code: null },

    // --- KIDS & EDUCATION ---
    ...[1,2,3,4,5,6,7,8,9,10,11,12].map(m => ({
        id: 1500+m, description: 'BPAY LITTLE STARS CHILDCARE', amount: 420.00,
        date: `2025-${String(m).padStart(2,'0')}-12`, category_id: 8, category: 'Childcare & Education',
        is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday',
        tags: ['childcare'], notes: '', is_recurring: true, bpay_biller_code: '56789'
    })),

    // --- Jan 2026 entries ---
    { id: 2001, description: 'Direct Credit From ACME CORP - Salary', amount: 6400.00, date: '2026-01-15', category_id: 20, category: 'Income', is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday', tags: ['salary'], notes: 'Pay rise effective Jan', is_recurring: true, bpay_biller_code: null },
    { id: 2002, description: 'Transfer From RT ETGAR GLEN EIRA - Rental', amount: 1850.00, date: '2026-01-01', category_id: 20, category: 'Income', is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday', tags: ['rental'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2003, description: 'Transfer From JEREMY WALD - Rent', amount: 1700.00, date: '2026-01-05', category_id: 20, category: 'Income', is_essential: false, transaction_type: 'income', source_account: 'ANZ Everyday', tags: ['rental'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2004, description: 'BPAY Mortgage Repayment - ANZ Home Loan', amount: 2400.00, date: '2026-01-20', category_id: 3, category: 'Housing & Rent', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['mortgage'], notes: '', is_recurring: true, bpay_biller_code: '23456' },
    { id: 2005, description: 'Purchase WOOLWORTHS SouthYarra', amount: 118.40, date: '2026-01-08', category_id: 1, category: 'Food & Dining', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['groceries'], notes: '', is_recurring: false, bpay_biller_code: null },
    { id: 2006, description: 'Direct Debit To ANYTIME FITNESS', amount: 65.00, date: '2026-01-01', category_id: 10, category: 'Gym & Fitness', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['gym'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2007, description: 'Purchase NETFLIX.COM', amount: 22.99, date: '2026-01-03', category_id: 11, category: 'Subscriptions', is_essential: true, transaction_type: 'expense', source_account: 'Amex', tags: ['streaming'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2008, description: 'Purchase SPOTIFY PREMIUM', amount: 12.99, date: '2026-01-07', category_id: 11, category: 'Subscriptions', is_essential: true, transaction_type: 'expense', source_account: 'Amex', tags: ['music'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2009, description: 'Direct Debit To TELSTRA CORP', amount: 89.00, date: '2026-01-22', category_id: 9, category: 'Bills & Utilities', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['phone', 'internet'], notes: '', is_recurring: true, bpay_biller_code: null },
    { id: 2010, description: 'Purchase BP TOORAK ROAD', amount: 74.60, date: '2026-01-18', category_id: 2, category: 'Transportation', is_essential: true, transaction_type: 'expense', source_account: 'ANZ Everyday', tags: ['fuel'], notes: '', is_recurring: false, bpay_biller_code: null },
];

// ============ CASH POSITIONS ============
const DEMO_CASH_POSITIONS = [
    { id: 1, date: '2025-01-01', amount: 42000.00, notes: 'Start of year balance' },
    { id: 2, date: '2025-04-01', amount: 38500.00, notes: 'Q1 review' },
    { id: 3, date: '2025-07-01', amount: 35200.00, notes: 'Mid-year review' },
    { id: 4, date: '2025-10-01', amount: 33800.00, notes: 'Q3 review' },
    { id: 5, date: '2026-01-01', amount: 31500.00, notes: 'Start of 2026' },
];

const DEMO_RUNWAY = {
    current_cash: 31500.00,
    current_cash_date: '2026-01-01',
    runway_months: 7.2,
    runway_date: '2026-08-15',
    monthly_burn: 4375.00,
    message: 'success'
};

// Per-month net burn (expenses minus income). Last 3 months average to monthly_burn above.
DEMO_RUNWAY.monthly_burns = {
    '2025-01': 3850.00, '2025-02': 4120.50, '2025-03': 4890.25, '2025-04': 3975.00,
    '2025-05': 4210.75, '2025-06': 4560.00, '2025-07': 3790.40, '2025-08': 4325.00,
    '2025-09': 4480.60, '2025-10': 4100.00, '2025-11': 4650.00, '2025-12': 4375.00,
    '2026-01': 4100.00
};

// ============ LEARNED RULES ============
const DEMO_RULES = [
    { id: 1, description_pattern: 'woolworths', bpay_biller_code: null, category_id: 1, category_name: 'Food & Dining', is_essential: true, transaction_type: 'expense', match_type: 'contains', priority: 10, created_at: '2025-01-10T10:00:00' },
    { id: 2, description_pattern: null, bpay_biller_code: '23456', category_id: 3, category_name: 'Housing & Rent', is_essential: true, transaction_type: 'expense', match_type: 'bpay', priority: 100, created_at: '2025-01-05T08:00:00' },
    { id: 3, description_pattern: 'netflix', bpay_biller_code: null, category_id: 11, category_name: 'Subscriptions', is_essential: true, transaction_type: 'expense', match_type: 'contains', priority: 10, created_at: '2025-01-03T12:00:00' },
    { id: 4, description_pattern: 'anytime fitness', bpay_biller_code: null, category_id: 10, category_name: 'Gym & Fitness', is_essential: true, transaction_type: 'expense', match_type: 'contains', priority: 10, created_at: '2025-01-01T09:00:00' },
    { id: 5, description_pattern: null, bpay_biller_code: '56789', category_id: 8, category_name: 'Childcare & Education', is_essential: true, transaction_type: 'expense', match_type: 'bpay', priority: 100, created_at: '2025-01-12T14:00:00' },
    { id: 6, description_pattern: 'buddy telco aussiebb', bpay_biller_code: null, category_id: 9, category_name: 'Bills & Utilities', is_essential: true, transaction_type: 'expense', match_type: 'contains', priority: 30, created_at: '2025-02-15T11:00:00' },
];

// ============ STATISTICS COMPUTATION ============
// Compute statistics from DEMO_EXPENSES dynamically based on period/year
function computeDemoStats(period, year) {
    const baseYear = year || 2025;
    let filtered = DEMO_EXPENSES;
    const now = new Date();

    // Filter by period
    if (period && period.startsWith('custom-')) {
        const monthStr = period.replace('custom-', '');
        const [y, m] = monthStr.split('-').map(Number);
        filtered = DEMO_EXPENSES.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === y && (d.getMonth() + 1) === m;
        });
    } else if (period === 'month') {
        const cm = now.getMonth() + 1;
        const cy = baseYear === now.getFullYear() ? now.getFullYear() : baseYear;
        const targetMonth = baseYear === now.getFullYear() ? cm : 12;
        filtered = DEMO_EXPENSES.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === cy && (d.getMonth() + 1) === targetMonth;
        });
    } else if (period === 'last3months') {
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - 3);
        filtered = DEMO_EXPENSES.filter(e => new Date(e.date) >= cutoff);
    } else if (period === 'last12months') {
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - 12);
        filtered = DEMO_EXPENSES.filter(e => new Date(e.date) >= cutoff);
    } else if (period === 'year') {
        filtered = DEMO_EXPENSES.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === baseYear;
        });
    }
    // else 'all' - no filter

    const incomeTotal = filtered.filter(e => e.transaction_type === 'income').reduce((s, e) => s + e.amount, 0);
    const expenseTotal = filtered.filter(e => e.transaction_type === 'expense').reduce((s, e) => s + e.amount, 0);

    // Year totals (always for baseYear)
    const yearTx = DEMO_EXPENSES.filter(e => new Date(e.date).getFullYear() === baseYear);
    const yearIncome = yearTx.filter(e => e.transaction_type === 'income').reduce((s, e) => s + e.amount, 0);
    const yearExpenses = yearTx.filter(e => e.transaction_type === 'expense').reduce((s, e) => s + e.amount, 0);

    // Month totals
    let monthNum;
    if (baseYear === now.getFullYear()) {
        monthNum = now.getMonth() + 1;
    } else {
        monthNum = 12;
    }
    const monthTx = DEMO_EXPENSES.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === baseYear && (d.getMonth() + 1) === monthNum;
    });
    const monthIncome = monthTx.filter(e => e.transaction_type === 'income').reduce((s, e) => s + e.amount, 0);
    const monthExpenses = monthTx.filter(e => e.transaction_type === 'expense').reduce((s, e) => s + e.amount, 0);

    // Essential vs optional (year expenses only)
    const yearExpOnly = yearTx.filter(e => e.transaction_type === 'expense');
    const essentialTotal = yearExpOnly.filter(e => e.is_essential).reduce((s, e) => s + e.amount, 0);
    const optionalTotal = yearExpOnly.filter(e => !e.is_essential).reduce((s, e) => s + e.amount, 0);

    // By category
    const byCategory = {};
    filtered.forEach(e => {
        const name = e.category || 'Other';
        if (!byCategory[name]) {
            byCategory[name] = { amount: 0, count: 0, color: demoCatColor(e.category_id), type: e.transaction_type };
        }
        byCategory[name].amount += e.amount;
        byCategory[name].count += 1;
    });

    // Monthly trend (12 months of baseYear)
    const monthlyTrend = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let m = 1; m <= 12; m++) {
        const mTx = DEMO_EXPENSES.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === baseYear && (d.getMonth() + 1) === m;
        });
        const mInc = mTx.filter(e => e.transaction_type === 'income').reduce((s, e) => s + e.amount, 0);
        const mExp = mTx.filter(e => e.transaction_type === 'expense').reduce((s, e) => s + e.amount, 0);
        const mExpOnly = mTx.filter(e => e.transaction_type === 'expense');
        monthlyTrend.push({
            month: `${monthNames[m-1]} ${baseYear}`,
            income: mInc,
            expenses: mExp,
            net: mInc - mExp,
            essential: mExpOnly.filter(e => e.is_essential).reduce((s, e) => s + e.amount, 0),
            optional: mExpOnly.filter(e => !e.is_essential).reduce((s, e) => s + e.amount, 0)
        });
    }

    return {
        income_total: incomeTotal,
        expense_total: expenseTotal,
        net_position: incomeTotal - expenseTotal,
        year_income: yearIncome,
        year_expenses: yearExpenses,
        year_net: yearIncome - yearExpenses,
        month_income: monthIncome,
        month_expenses: monthExpenses,
        month_net: monthIncome - monthExpenses,
        count: filtered.length,
        essential_total: essentialTotal,
        optional_total: optionalTotal,
        by_category: byCategory,
        monthly_trend: monthlyTrend,
        mom_change: 0
    };
}

// ============ FETCH INTERCEPTOR ============
// This overrides window.fetch so that app.js works without a backend

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
}

const _originalFetch = window.fetch;

window.fetch = async function(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const urlStr = typeof url === 'string' ? url : url.toString();

    // --- GET routes ---

    // Categories
    if (urlStr === '/api/categories' && method === 'GET') {
        return jsonResponse(DEMO_CATEGORIES);
    }

    // Expenses list
    if (urlStr === '/api/expenses' && method === 'GET') {
        return jsonResponse(DEMO_EXPENSES);
    }

    // Statistics
    if (urlStr.startsWith('/api/statistics')) {
        const params = new URLSearchParams(urlStr.split('?')[1] || '');
        const period = params.get('period') || 'month';
        const year = params.get('year') ? parseInt(params.get('year')) : null;
        return jsonResponse(computeDemoStats(period, year));
    }

    // Cash runway
    if (urlStr.match(/\/api\/cash-position\/runway/)) {
        return jsonResponse(DEMO_RUNWAY);
    }

    // Cash position list
    if (urlStr === '/api/cash-position' && method === 'GET') {
        return jsonResponse(DEMO_CASH_POSITIONS);
    }

    // Learned rules
    if (urlStr === '/api/learned-rules' && method === 'GET') {
        return jsonResponse(DEMO_RULES);
    }

    // Duplicates scan
    if (urlStr === '/api/duplicates' && method === 'GET') {
        return jsonResponse({ duplicates: [], total_groups: 0 });
    }

    // Tags
    if (urlStr === '/api/tags' && method === 'GET') {
        return jsonResponse([
            { id: 1, name: 'groceries' }, { id: 2, name: 'fuel' }, { id: 3, name: 'salary' },
            { id: 4, name: 'rental' }, { id: 5, name: 'streaming' }, { id: 6, name: 'gym' },
            { id: 7, name: 'mortgage' }, { id: 8, name: 'childcare' }
        ]);
    }

    // --- POST routes (write operations — return success) ---

    // Fuzzy match preview
    if (urlStr.includes('/api/expenses/fuzzy-match-preview') && method === 'POST') {
        return jsonResponse({
            keywords: 'woolworths',
            match_count: 8,
            sample_descriptions: [
                'Purchase WOOLWORTHS MelbourneCBD',
                'Purchase WOOLWORTHS SouthYarra',
                'Purchase WOOLWORTHS Toorak'
            ]
        });
    }

    // Bulk update category
    if (urlStr.includes('/api/expenses/bulk-update-category') && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: category updated', count: 5, match_type: 'exact', rule_saved: true });
    }

    // Bulk update essential
    if (urlStr.includes('/api/expenses/bulk-update-essential') && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: essential updated', updated_count: 3 });
    }

    // Recategorize service stations
    if (urlStr.includes('/api/expenses/recategorize-service-stations') && method === 'POST') {
        return jsonResponse({ message: 'Demo mode', updated_to_transport: 4, updated_to_food: 2 });
    }

    // Delete all
    if (urlStr.includes('/api/expenses/delete-all') && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: no data deleted', count: 0 });
    }

    // CSV import
    if (urlStr.includes('/api/import-csv') && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: import simulated', imported: 15, errors: [] });
    }

    // PDF export - return a fake blob
    if (urlStr.includes('/api/export/pdf') && method === 'POST') {
        const blob = new Blob(['Demo PDF - not a real document'], { type: 'application/pdf' });
        return new Response(blob, { status: 200, headers: { 'Content-Type': 'application/pdf' } });
    }

    // Create expense
    if (urlStr === '/api/expenses' && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: expense created', id: 9999 }, 201);
    }

    // Create category
    if (urlStr === '/api/categories' && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: category created', id: 99 }, 201);
    }

    // Create cash position
    if (urlStr === '/api/cash-position' && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: cash position saved', id: 99 }, 201);
    }

    // Create learned rule
    if (urlStr === '/api/learned-rules' && method === 'POST') {
        return jsonResponse({ message: 'Demo mode: rule created', id: 99 }, 201);
    }

    // --- PUT/DELETE routes (single item operations) ---

    // Expense detail (PUT or DELETE)
    if (urlStr.match(/\/api\/expenses\/\d+/) && (method === 'PUT' || method === 'DELETE')) {
        return jsonResponse({ message: 'Demo mode: expense updated', rule_saved: false });
    }

    // Category detail (PUT or DELETE)
    if (urlStr.match(/\/api\/categories\/\d+/) && (method === 'PUT' || method === 'DELETE')) {
        return jsonResponse({ message: 'Demo mode: category updated' });
    }

    // Cash position detail (PUT or DELETE)
    if (urlStr.match(/\/api\/cash-position\/\d+/) && (method === 'PUT' || method === 'DELETE')) {
        return jsonResponse({ message: 'Demo mode: cash position updated' });
    }

    // Learned rule detail (DELETE)
    if (urlStr.match(/\/api\/learned-rules\/\d+/) && method === 'DELETE') {
        return jsonResponse({ message: 'Demo mode: rule deleted' });
    }

    // Duplicates remove
    if (urlStr.includes('/api/duplicates/remove') && method === 'DELETE') {
        return jsonResponse({ message: 'Demo mode', removed_count: 0 });
    }

    // Fallback: pass through to original fetch (for CDN resources etc.)
    return _originalFetch(url, options);
};

console.log('%c Balance Sheet Demo Mode ', 'background: #13B5EA; color: white; font-size: 14px; padding: 4px 8px; border-radius: 4px;');
console.log('All data shown is fake sample data. No real financial information is used.');
