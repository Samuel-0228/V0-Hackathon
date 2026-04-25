// Dashen Flow AI — Mock data for all modules

export const accountBalance = {
  etb: 284_750.5,
  usd: 1_820.0,
  savings: 95_000,
}

export const fxRates = [
  { pair: 'USD/ETB', rate: 56.42, change: +0.31, direction: 'up' as const },
  { pair: 'EUR/ETB', rate: 61.18, change: -0.15, direction: 'down' as const },
  { pair: 'GBP/ETB', rate: 72.55, change: +0.08, direction: 'up' as const },
  { pair: 'SAR/ETB', rate: 15.04, change: +0.02, direction: 'up' as const },
  { pair: 'AED/ETB', rate: 15.36, change: -0.05, direction: 'down' as const },
]

export const spendingData = [
  { month: 'Nov', groceries: 12_400, utilities: 3_200, transport: 5_800, dining: 8_100 },
  { month: 'Dec', groceries: 18_200, utilities: 3_800, transport: 6_200, dining: 12_400 },
  { month: 'Jan', groceries: 11_600, utilities: 4_100, transport: 5_100, dining: 7_200 },
  { month: 'Feb', groceries: 13_800, utilities: 3_500, transport: 6_600, dining: 9_500 },
  { month: 'Mar', groceries: 15_200, utilities: 3_900, transport: 7_200, dining: 10_100 },
  { month: 'Apr', groceries: 14_100, utilities: 3_600, transport: 6_400, dining: 9_800 },
]

export const transactions = [
  { id: 't1', merchant: 'Edna Mall', category: 'Shopping', amount: -4_250, date: '2025-04-24', icon: 'shopping' },
  { id: 't2', merchant: 'Ethiopian Airlines', category: 'Travel', amount: -18_500, date: '2025-04-23', icon: 'plane' },
  { id: 't3', merchant: 'DSTV Ethiopia', category: 'Entertainment', amount: -2_100, date: '2025-04-22', icon: 'tv' },
  { id: 't4', merchant: 'CBE Transfer', category: 'Transfer In', amount: +50_000, date: '2025-04-21', icon: 'transfer' },
  { id: 't5', merchant: 'Sholla Market', category: 'Groceries', amount: -1_890, date: '2025-04-20', icon: 'groceries' },
  { id: 't6', merchant: 'Zemen Parking', category: 'Transport', amount: -350, date: '2025-04-19', icon: 'transport' },
  { id: 't7', merchant: 'Salary - Dashen Bank', category: 'Income', amount: +32_000, date: '2025-04-18', icon: 'income' },
]

export const dstvPackages = [
  {
    id: 'compact-plus',
    name: 'Compact Plus',
    price: 2_100,
    channels: 145,
    highlight: 'EPL, Serie A & more',
    tag: 'Popular',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4_350,
    channels: 220,
    highlight: 'All sports + movies',
    tag: 'Best Value',
  },
  {
    id: 'compact',
    name: 'Compact',
    price: 1_450,
    channels: 95,
    highlight: 'News, lifestyle & drama',
    tag: null,
  },
  {
    id: 'access',
    name: 'Access',
    price: 750,
    channels: 45,
    highlight: 'Everyday essentials',
    tag: null,
  },
]

export const dstvAddons = [
  { id: 'french-plus', name: 'French Plus', price: 580 },
  { id: 'hdpvr', name: 'HD PVR Service', price: 350 },
  { id: 'extra-view', name: 'Extra View', price: 420 },
]

export const airlines = [
  { id: 'et', name: 'Ethiopian Airlines', code: 'ET', logo: 'ET' },
  { id: 'af', name: 'Africa World', code: 'AW', logo: 'AW' },
]

export const flightRoutes = [
  { id: 'r1', from: 'ADD', to: 'DXB', fromCity: 'Addis Ababa', toCity: 'Dubai', price: 28_500, duration: '4h 20m', airline: 'ET' },
  { id: 'r2', from: 'ADD', to: 'NBO', fromCity: 'Addis Ababa', toCity: 'Nairobi', price: 9_800, duration: '2h 10m', airline: 'ET' },
  { id: 'r3', from: 'ADD', to: 'JNB', fromCity: 'Addis Ababa', toCity: 'Johannesburg', price: 22_100, duration: '5h 45m', airline: 'ET' },
  { id: 'r4', from: 'ADD', to: 'LHR', fromCity: 'Addis Ababa', toCity: 'London', price: 58_400, duration: '9h 15m', airline: 'ET' },
  { id: 'r5', from: 'ADD', to: 'CDG', fromCity: 'Addis Ababa', toCity: 'Paris', price: 54_200, duration: '8h 50m', airline: 'ET' },
  { id: 'r6', from: 'ADD', to: 'BOM', fromCity: 'Addis Ababa', toCity: 'Mumbai', price: 18_600, duration: '5h 30m', airline: 'ET' },
]

export const shopCategories = [
  { id: 'electronics', name: 'Electronics', icon: 'monitor' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'home', name: 'Home & Living', icon: 'home' },
  { id: 'groceries', name: 'Groceries', icon: 'shopping-bag' },
]

export const shopProducts = [
  { id: 'p1', name: 'Samsung Galaxy A55', category: 'electronics', price: 31_500, rating: 4.5, sold: 328, image: 'phone' },
  { id: 'p2', name: 'ASUS Laptop Vivobook', category: 'electronics', price: 89_000, rating: 4.3, sold: 142, image: 'laptop' },
  { id: 'p3', name: 'Nike Air Max 270', category: 'fashion', price: 8_200, rating: 4.7, sold: 512, image: 'shoe' },
  { id: 'p4', name: 'Ethiopian Coffee Set', category: 'home', price: 3_800, rating: 4.9, sold: 891, image: 'coffee' },
  { id: 'p5', name: 'Habesha Kemis', category: 'fashion', price: 5_400, rating: 4.8, sold: 673, image: 'dress' },
  { id: 'p6', name: 'Smart TV 43"', category: 'electronics', price: 48_000, rating: 4.4, sold: 219, image: 'tv' },
]

export const aiInsights = [
  'Your DSTV Compact Plus renews in 3 days. Pay now to lock in today\'s rate before FX shifts.',
  'USD/ETB rose 0.31% today. Good time to hold ETB and delay FX conversion.',
  'Your dining spend is up 18% this month. Flow suggests setting a monthly dining budget.',
  'Ethiopian Airlines has a flash sale on ADD-DXB — 12% below your last booking price.',
  'You\'ve saved ETB 4,200 vs last month. Great progress toward your travel goal!',
]

export const flowChatResponses: Record<string, string> = {
  balance:
    'Your current ETB balance is **ETB 284,750.50** and your USD account holds **$1,820.00**. Your savings account has **ETB 95,000**. Would you like to transfer between accounts or check your credit limit?',
  dstv:
    'Your DSTV Compact Plus subscription expires in **3 days** (April 28). The renewal fee is **ETB 2,100**. I can pay it right now from your main account — want me to proceed?',
  flight:
    'Based on your travel history, I found great deals on ADD-DXB flights this week. Ethiopian Airlines has availability at **ETB 28,500** — that\'s 12% lower than your last booking. Shall I open the booking screen?',
  rate:
    'Live FX rates right now:\n- **USD/ETB: 56.42** (+0.31 today)\n- **EUR/ETB: 61.18** (−0.15 today)\n- **GBP/ETB: 72.55** (+0.08 today)\n\nUSD is slightly stronger today. If you\'re planning a conversion, ETB is a good hold.',
  spend:
    'Your April spending summary:\n- Groceries: **ETB 14,100**\n- Dining: **ETB 9,800** ↑18%\n- Transport: **ETB 6,400**\n- Utilities: **ETB 3,600**\n\nDining is your fastest-growing category. Want me to set a monthly cap and send you alerts?',
  save:
    'Your savings goal for the Dubai trip is **ETB 120,000**. You\'ve saved **ETB 95,000** so far — that\'s **79% there**! At your current rate you\'ll reach the goal in about **6 weeks**. Keep it up!',
  transfer:
    'I can initiate a transfer right now. Please specify the recipient account number and the amount in ETB. Transfers to Dashen accounts are instant and free.',
  shop:
    'The Dashen Flow Shop has great deals today. Top picks: Samsung Galaxy A55 at **ETB 31,500**, Ethiopian Coffee Set at **ETB 3,800** (bestseller), and Nike Air Max 270 at **ETB 8,200**. Shall I open the shop for you?',
  default:
    'I\'m Flow, your Dashen AI financial agent. I can help you check your **balance**, view **FX rates**, renew your **DSTV**, book a **flight**, review your **spending**, or shop at the **Dashen store**. What can I help you with today?',
}
