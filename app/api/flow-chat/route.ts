// Flow AI — Rule-based knowledge engine. No external API required.

// ─── Types ────────────────────────────────────────────────────────────────────
interface KnowledgeEntry {
  id: string
  // Multi-word phrases matched as exact substrings (weight 4)
  phrases: string[]
  // Single-word primary keywords (weight 3)
  keywords: string[]
  // Synonyms / related terms (weight 1)
  synonyms: string[]
  response: string
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const KB: KnowledgeEntry[] = [
  {
    id: 'greeting',
    phrases: ['what can you do', 'what do you know', 'tell me about dashen', 'how can you help'],
    keywords: ['hi', 'hello', 'hey', 'help', 'start', 'overview', 'capabilities', 'features', 'menu'],
    synonyms: ['greet', 'intro', 'guide', 'options', 'services'],
    response: `Hello! I am **Flow AI**, your market-aware financial agent inside the Dashen Super App.

Here is what I can help you with:

**Banking:** Account balances, transfers, QR payments, Chat Banking
**Loans:** Sahay microloans (6–10%), Sharik interest-free financing, DubeAle Buy-Now-Pay-Later
**Cards:** Virtual Mastercard for international payments and remittances
**Travel:** MyTravel flight booking (Ethiopian Airlines and more)
**Entertainment:** DSTV subscriptions, TeleTV streaming
**Bills:** Electricity, water, school fees, event tickets
**Business:** Zoorya ERP for MSMEs — POS, inventory, sales tracking
**Loyalty:** Dashen Edil — earn coins and win up to ETB 30 million in prizes
**Onboarding:** Instant account opening with Fayda Digital ID
**FX Rates:** Live exchange rates for USD, EUR, GBP, SAR, AED

You can also give me commands like "pay my DSTV", "book a flight", or "analyze my transactions". The Dashen Super App has **200+ mini-apps** — just ask!`,
  },

  {
    id: 'balance',
    phrases: ['my balance', 'account balance', 'how much money', 'my account', 'how much do i have'],
    keywords: ['balance', 'account', 'funds', 'birr', 'wallet'],
    synonyms: ['money', 'cash', 'amount', 'total', 'how much'],
    response: `Your current account balances are:

- **ETB Current Account:** ETB 284,750.50
- **USD Account:** $1,820.00
- **Savings Account:** ETB 95,000.00

Your last deposit was **ETB 45,000** on April 20 from CBE Transfer. All accounts are active and in good standing.

Would you like to transfer funds, check recent transactions, or see your spending analysis?`,
  },

  {
    id: 'transactions',
    phrases: [
      'my transactions', 'transaction history', 'analyze my transactions', 'tell me my transactions',
      'transaction analysis', 'spending history', 'recent transactions', 'what did i spend',
      'where did my money go', 'my recent payments',
    ],
    keywords: ['transaction', 'history', 'analyze', 'analysis', 'recent', 'payments', 'spent'],
    synonyms: ['activity', 'record', 'log', 'statement', 'breakdown'],
    response: `Here is your **recent transaction history** with a quick analysis:

**Last 7 transactions:**
| Date | Merchant | Category | Amount |
| Apr 24 | Edna Mall | Shopping | -ETB 4,250 |
| Apr 23 | Ethiopian Airlines | Travel | -ETB 18,500 |
| Apr 22 | DSTV Ethiopia | Entertainment | -ETB 2,100 |
| Apr 21 | CBE Transfer | Transfer In | +ETB 50,000 |
| Apr 20 | Sholla Market | Groceries | -ETB 1,890 |
| Apr 19 | Zemen Parking | Transport | -ETB 350 |
| Apr 18 | Salary — Dashen Bank | Income | +ETB 32,000 |

**AI Analysis:**
- **Net flow this week:** +ETB 54,910 (healthy positive)
- **Largest outflow:** Ethiopian Airlines at ETB 18,500 (Travel)
- **Highest frequency category:** Groceries and Transport (daily essentials)
- **Income sources:** Salary (ETB 32,000) and inter-bank transfer (ETB 50,000)
- **Insight:** Your travel spending is above average this month. Consider using the **Budgeting Tool** to set a travel cap for next month.`,
  },

  {
    id: 'spending',
    phrases: ['my spending', 'april spending', 'how much did i spend', 'monthly spending', 'spending summary', 'expense summary'],
    keywords: ['spending', 'expense', 'budget', 'spend', 'april', 'monthly'],
    synonyms: ['outgoing', 'cost', 'category', 'breakdown', 'used'],
    response: `Your **April spending summary:**

- **Groceries:** ETB 14,100
- **Dining and Restaurants:** ETB 9,800 *(up 18% vs March — highest growth)*
- **Transport:** ETB 6,400
- **Utilities:** ETB 3,600

**Total April outgoings:** ETB 33,900

Your dining spend is trending upward. The **Budgeting Tool** in the app lets you set daily, weekly, or monthly limits per category and sends alerts before you overspend. Would you like me to suggest a monthly dining budget?`,
  },

  {
    id: 'fx_rates',
    phrases: ['exchange rate', 'fx rate', 'foreign exchange', 'currency rate', 'usd to etb', 'dollar rate', 'dollar to birr'],
    keywords: ['usd', 'eur', 'gbp', 'sar', 'aed', 'rate', 'exchange', 'forex', 'currency', 'dollar', 'euro', 'pound'],
    synonyms: ['conversion', 'convert', 'foreign', 'international rate', 'birr rate'],
    response: `Today's live FX rates from Dashen Bank:

- **USD / ETB:** 56.42 *(+0.31 today — USD slightly stronger)*
- **EUR / ETB:** 61.18 *(-0.15 today)*
- **GBP / ETB:** 72.55 *(+0.08 today)*
- **SAR / ETB:** 15.03 *(+0.05 today)*
- **AED / ETB:** 15.36 *(-0.05 today)*

**Flow Insight:** USD is up slightly today. If you are planning an ETB-to-USD conversion for international shopping, holding ETB for 1–2 days may yield a marginally better rate.

Use your **Virtual Mastercard** for international purchases — no need to physically exchange currency.`,
  },

  {
    id: 'dstv',
    phrases: ['dstv subscription', 'pay my dstv', 'renew dstv', 'dstv renewal', 'dstv payment', 'my tv subscription'],
    keywords: ['dstv', 'teletv', 'tv', 'cable', 'satellite', 'subscription', 'entertainment', 'stream', 'channel'],
    synonyms: ['showmax', 'pay tv', 'television', 'local movie', 'series', 'sports'],
    response: `Your **DSTV Compact Plus** subscription is due for renewal in **3 days** (April 28). Monthly cost: **ETB 2,100**.

You can renew it now through the **Entertainment mini-app** to avoid any service interruption. Packages available:

- **Access** — ETB 750/mo (45 channels)
- **Compact** — ETB 1,450/mo (95 channels)
- **Compact Plus** *(your current plan)* — ETB 2,100/mo (145 channels, EPL & Serie A)
- **Premium** — ETB 4,350/mo (220 channels, all sports + movies)

**TeleTV** is also free in-app for local Ethiopian movies and series. Tap "Open DSTV Payment" to renew now.`,
  },

  {
    id: 'flights',
    phrases: ['book a flight', 'buy airline ticket', 'airline ticket', 'buy me a ticket', 'book flight', 'find a flight', 'flights from addis'],
    keywords: ['flight', 'airline', 'travel', 'plane', 'ticket', 'mytravel', 'addis', 'dubai', 'london', 'nairobi'],
    synonyms: ['fly', 'airport', 'trip', 'destination', 'ethiopian airlines', 'route', 'journey'],
    response: `Through the **MyTravel mini-app**, here are available Ethiopian Airlines fares from Addis Ababa:

- **ADD to DXB (Dubai):** **ETB 28,500** *(12% below your last booking)*
- **ADD to NBO (Nairobi):** ETB 9,800 — 2h 10m
- **ADD to JNB (Johannesburg):** ETB 22,100 — 5h 45m
- **ADD to LHR (London):** ETB 58,400 — 9h 15m
- **ADD to CDG (Paris):** ETB 54,200 — 8h 50m
- **ADD to BOM (Mumbai):** ETB 18,600 — 5h 30m

Search, compare, and purchase tickets entirely within the app. Payment is deducted directly from your ETB account. Tap "Open Flight Booking" to proceed.`,
  },

  {
    id: 'savings',
    phrases: ['savings goal', 'dubai goal', 'my goal', 'how close am i', 'savings progress', 'how much saved'],
    keywords: ['saving', 'savings', 'goal', 'target', 'progress', 'dubai'],
    synonyms: ['nest egg', 'deposit', 'save up', 'how far', 'how close'],
    response: `Your **Dubai Trip savings goal** progress:

- **Target amount:** ETB 120,000
- **Saved so far:** ETB 95,000 *(79% complete)*
- **Remaining:** ETB 25,000
- **Estimated time to goal:** approximately **6 weeks** at your current saving rate

You are doing great! If you want to reach the goal faster, consider:
1. Reducing your dining spend (currently ETB 9,800/month — up 18%)
2. Setting up an automatic monthly savings rule in the Budgeting Tool
3. If urgent, the **Sahay microloan** can bridge the ETB 25,000 gap instantly`,
  },

  {
    id: 'transfers',
    phrases: ['send money', 'transfer money', 'pay someone', 'inter-bank transfer', 'transfer to another bank', 'qr payment', 'chat banking transfer'],
    keywords: ['transfer', 'send', 'payment', 'qr', 'remittance', 'interbank', 'pay'],
    synonyms: ['wire', 'remit', 'merchant payment', 'peer to peer', 'receive money'],
    response: `Dashen Super App offers multiple payment methods:

- **Dashen-to-Dashen transfers:** Instant and completely free
- **Inter-bank transfers:** Fully supported — send to any Ethiopian bank with full interoperability
- **QR Code Payment:** Scan merchant QR codes for instant, secure payment at shops and restaurants
- **Chat Banking:** Send money or request payments directly inside a chat conversation
- **International remittance:** Receive foreign transfers via your Virtual Mastercard

All transactions are secured with **biometric authentication** and **device tokenization**. Would you like to initiate a transfer?`,
  },

  {
    id: 'sahay_loan',
    phrases: ['apply for a loan', 'get a loan', 'apply for microloan', 'how do i borrow', 'need a loan', 'microloan application'],
    keywords: ['sahay', 'loan', 'microloan', 'borrow', 'credit', 'lending', 'apply'],
    synonyms: ['advance', 'financing', 'interest rate', 'loan limit', 'repayment'],
    response: `**Sahay Micro-Lending** gives instant loans — no physical collateral required:

**Rates and Terms:**
- Interest rate: **6% – 10%** for 30-day terms
- Facilitation fee: 1.5% – 6.5% (one-time, varies by term)
- Repayment: daily, weekly, or 30-day options

**Loan Limits:**
- Starting from **ETB 100** for new users
- Up to **ETB 15,000+** as your repayment history grows

**Eligibility:**
- Determined by AI credit scoring (transaction frequency, mobile usage, savings behaviour)
- Active Dashen account required
- **Fayda Digital ID** needed for maximum limits
- No physical property collateral required

**Late payment penalty:** ~0.11% per day or 2% flat on outstanding balance

To apply: open the Micro Finance section in the Super App and tap "Apply Now".`,
  },

  {
    id: 'sharik_ifb',
    phrases: ['interest free loan', 'sharia loan', 'islamic banking', 'dubeale', 'buy now pay later', 'zero interest loan', 'sharik financing'],
    keywords: ['sharik', 'ifb', 'sharia', 'islamic', 'halal', 'qard', 'dubeale', 'bnpl', 'interest-free'],
    synonyms: ['zero interest', 'profit sharing', 'mark-up', 'shariah', 'women loan', 'islamic finance'],
    response: `**Sharik** is Dashen's fully Sharia-compliant micro-financing service:

**Sharik Core Financing:**
- Profit mark-up starting from **~4%** (profit-sharing model, not interest)
- No physical collateral required
- AI-powered credit scoring from transaction history

**Qard Al-Hasan (Benevolent Loan):**
- **Zero-profit financing** available for women entrepreneurs
- Special programs for business growth with no mark-up at all

**DubeAle-IFB — Buy Now, Pay Later:**
- Purchase at participating merchant stores with no interest
- Repayment options: **3, 6, or 12 months** — fully Sharia-compliant
- One of Ethiopia's first in-app BNPL services

**Sharik milestone:** Portfolio has surpassed **ETB 15 billion** in Sharia-compliant financing.`,
  },

  {
    id: 'virtual_card',
    phrases: ['virtual card', 'virtual mastercard', 'international payment', 'online card', 'digital card', 'receive remittance'],
    keywords: ['mastercard', 'amazon', 'alibaba', 'netflix', 'international', 'remittance', 'online purchase'],
    synonyms: ['e-card', 'foreign purchase', 'freeze card', 'global payment', 'card number'],
    response: `The **Virtual Mastercard** lets you shop internationally and receive remittances without a physical card:

**What you can do:**
- Generate a virtual Mastercard instantly inside the app
- Shop on **Amazon, Alibaba, Netflix, and thousands of international sites**
- Receive **foreign remittances** directly to your card
- Freeze or unfreeze the card at any time in seconds

**Current FX context:** USD/ETB is at 56.42 today. Any international USD purchase will be converted at this rate automatically.

To generate your card: go to **Card Management** in the Super App menu.`,
  },

  {
    id: 'edil_loyalty',
    phrases: ['dashen edil', 'loyalty program', 'how to win prizes', 'shake phone', 'earn coins'],
    keywords: ['edil', 'lottery', 'prize', 'coin', 'reward', 'loyalty', 'shake', 'win'],
    synonyms: ['gamification', 'points', 'jackpot', 'competition', 'gift', 'lucky'],
    response: `**Dashen Edil** is the Super App's gamified loyalty and prize program:

**How it works:**
1. Earn **coins** through everyday transactions — transfers, bill payments, airtime top-ups
2. Open the Edil mini-app and **shake your phone** to spin for prizes
3. More transactions = more coins = more chances to win

**Prize pool:** Up to **ETB 30 million**

**Prizes include:**
- Smartphones and electronics
- Cash rewards
- A brand new **car**

Every single transaction you make in the app earns you Edil coins. The more active you are, the better your odds. Check the Edil leaderboard in the app to see your ranking.`,
  },

  {
    id: 'utility_bills',
    phrases: ['pay electricity', 'pay water bill', 'pay school fee', 'pay utility', 'buy event ticket', 'pay bill'],
    keywords: ['utility', 'electricity', 'water', 'school', 'fees', 'bill', 'concert', 'event', 'ticket'],
    synonyms: ['enel', 'service payment', 'tuition', 'digital content', 'subscription bills'],
    response: `You can pay all utility and service bills directly in the **Dashen Super App** — no queues, no branch visits:

**Supported payments:**
- Electricity and water bills
- School and university tuition fees
- Event and concert tickets
- Digital content subscriptions
- Any other registered utility service

**How to pay:**
1. Open the **Utility Payments** mini-app
2. Select the service provider
3. Enter your reference number or account ID
4. Confirm payment — deducted instantly from your ETB account

Payments are processed in seconds and you receive a digital receipt in the app.`,
  },

  {
    id: 'zoorya_erp',
    phrases: ['zoorya erp', 'business tool', 'inventory management', 'small business app', 'msme tool', 'pos system'],
    keywords: ['zoorya', 'erp', 'business', 'pos', 'inventory', 'msme', 'sales', 'merchant'],
    synonyms: ['enterprise', 'stock', 'accounting', 'point of sale', 'revenue', 'shop owner'],
    response: `**Zoorya ERP** is a complete business management system built into the Dashen Super App for MSMEs:

**Features:**
- **POS System** — process customer sales directly from your phone, no hardware needed
- **Inventory Management** — track stock levels, set low-stock alerts, manage suppliers
- **Sales Tracking** — view daily, weekly, and monthly revenue reports with charts
- **Expense Management** — categorise and monitor all business costs

**Integration:** All Zoorya data is linked directly to your Dashen business bank account, making reconciliation and cash flow management completely seamless.

**Ideal for:** Retailers, restaurants, service providers, freelancers, and any Ethiopian MSME owner.`,
  },

  {
    id: 'chat_banking',
    phrases: ['chat banking', 'send in chat', 'pay in chat', 'transfer in chat', 'chat to pay'],
    keywords: ['chat', 'message', 'conversation', 'contact', 'in-chat'],
    synonyms: ['chat payment', 'chat transfer', 'messaging payment', 'social banking'],
    response: `**Chat Banking** lets you do banking without ever leaving your conversation:

- **Send money** to any Dashen contact while chatting
- **Request payments** directly in the chat thread — the recipient gets a tap-to-pay notification
- **Top up airtime** for yourself or a contact in seconds

**How to use:** Open a chat with a Dashen contact, tap the banking icon, and select Send, Request, or Top Up. The transaction happens instantly and is confirmed in the chat thread.

No need to switch apps or navigate menus — your bank is part of the conversation.`,
  },

  {
    id: 'fayda_onboarding',
    phrases: ['open an account', 'fayda digital id', 'digital id onboarding', 'new account', 'how to open account', 'account opening'],
    keywords: ['fayda', 'digital id', 'onboard', 'account', 'signup', 'register', 'open'],
    synonyms: ['national id', 'identity', 'verify', 'create account', 'kyc', 'instant account'],
    response: `**Fayda Digital ID Onboarding** is Ethiopia's first AI-powered instant bank account opening:

**How it works:**
1. Download the Dashen Super App
2. Tap **"Open Account"**
3. Scan your **National Fayda Digital ID**
4. AI verifies your identity in seconds
5. Your account is live immediately — no branch visit ever needed

**Benefits:**
- Instant access to all 200+ Super App features
- No paperwork, no queues
- Immediately eligible for Sahay microloans based on your new transaction history

This is Ethiopia's first digital ID-based bank account — powered entirely by AI and the national Fayda ID infrastructure.`,
  },

  {
    id: 'supercard',
    phrases: ['supercard', 'digital business card', 'share my contact', 'share contact'],
    keywords: ['supercard', 'business card', 'contact', 'networking', 'profile'],
    synonyms: ['visiting card', 'share info', 'professional card', 'qr card'],
    response: `**SuperCard** is your built-in digital business card inside the Dashen Super App:

- Create and fully customise your professional profile card
- Share it instantly with any other Dashen user — via QR code or in-app share
- Always up to date — edit once and all your contacts see the change immediately
- No paper needed

Perfect for entrepreneurs, freelancers, sales professionals, and anyone who wants a modern, instant way to exchange professional contact details.`,
  },

  {
    id: 'airtime',
    phrases: ['buy airtime', 'top up phone', 'airtime recharge', 'data bundle', 'mobile top up'],
    keywords: ['airtime', 'topup', 'top-up', 'recharge', 'data', 'bundle', 'mobile credit'],
    synonyms: ['phone credit', 'ethio telecom', 'etele', 'mobile data'],
    response: `Airtime and data top-ups are available directly in the Dashen Super App:

- **Top up instantly** for yourself or any Ethiopian mobile number
- Supports **Ethio Telecom** and all major Ethiopian telecoms
- Available through the main menu or through **Chat Banking** — top up while messaging a contact
- Deducted instantly from your ETB current account

The whole process takes under **10 seconds**. No need to visit a kiosk or use USSD codes.`,
  },

  {
    id: 'security',
    phrases: ['is my account safe', 'how secure is dashen', 'biometric login', 'how do i login'],
    keywords: ['security', 'safe', 'biometric', 'fingerprint', 'face id', 'secure', 'protected', 'fraud'],
    synonyms: ['password', 'pin', 'encrypted', 'hack', 'token', 'login'],
    response: `The Dashen Super App uses **bank-grade security** at every layer:

- **Biometric login:** Fingerprint and Face ID on supported devices
- **Device tokenization:** Your credentials are never stored in plain text
- **End-to-end encryption** on all transactions and communications
- **Virtual card freeze:** Instantly lock your Mastercard in-app with one tap
- **Fayda Digital ID** required for high-value transactions
- **Transaction alerts:** Real-time push notifications for every activity

In the event of suspicious activity, you can freeze all card and transfer functions instantly from the app without calling the bank.`,
  },

  {
    id: 'languages',
    phrases: ['supported languages', 'change language', 'app in amharic', 'use in oromoo'],
    keywords: ['language', 'amharic', 'oromoo', 'somali', 'tigrigna', 'afaan', 'multilingual'],
    synonyms: ['translate', 'local language', 'ethnic', 'region', 'switch language'],
    response: `The Dashen Super App is available in **5 Ethiopian languages** to serve all users:

1. **Amharic** (አማርኛ) — default
2. **English**
3. **Afaan Oromoo**
4. **Af-Soomaali**
5. **Tigrigna** (ትግርኛ)

You can switch the app language at any time from **Settings → Language Preference**.`,
  },

  {
    id: 'shopping',
    phrases: ['open the shop', 'buy a product', 'shop for something', 'dashen shop', 'e-commerce'],
    keywords: ['shop', 'shopping', 'buy', 'product', 'ecommerce', 'marketplace', 'store', 'order'],
    synonyms: ['purchase', 'retail', 'goods', 'item', 'online store'],
    response: `The **Dashen E-Commerce mini-app** connects you to online marketplaces without leaving the app:

**Today's featured products:**
- **Samsung Galaxy A55** — ETB 31,500 (4.5 stars, 328 sold)
- **ASUS Laptop Vivobook** — ETB 89,000 (4.3 stars)
- **Nike Air Max 270** — ETB 8,200 (4.7 stars, 512 sold)
- **Ethiopian Coffee Ceremony Set** — ETB 3,800 (4.9 stars — Bestseller)
- **Habesha Kemis** — ETB 5,400 (4.8 stars, 673 sold)
- **Smart TV 43"** — ETB 48,000 (4.4 stars)

Payment is deducted instantly from your Dashen account. Use your **Virtual Mastercard** for international marketplace purchases on Amazon or Alibaba.`,
  },

  {
    id: 'fallback',
    phrases: [],
    keywords: [],
    synonyms: [],
    response: `I am **Flow AI**, your Dashen Super App assistant. I can help you with:

**Account balances, FX rates, Sahay and Sharik loans, DSTV renewals, flight bookings, utility bills, shopping, Dashen Edil loyalty, Zoorya ERP, and transaction analysis.**

Could you rephrase your question? You can also try commands like:
- "analyze my transactions"
- "pay my DSTV subscription"
- "book me a flight to Dubai"

Or visit **dashensuperapp.com** for more information.`,
  },
]

// ─── Scoring Engine ───────────────────────────────────────────────────────────
function scoreEntry(lower: string, entry: KnowledgeEntry): number {
  if (entry.id === 'fallback') return 0

  let score = 0

  // Phrase match — highest weight (4 per phrase)
  for (const phrase of entry.phrases) {
    if (lower.includes(phrase)) score += 4
  }

  // Tokenise input into words for keyword and synonym matching
  const tokens = lower.split(/\s+/)

  for (const kw of entry.keywords) {
    // Exact token match
    if (tokens.includes(kw)) {
      score += 3
    } else if (lower.includes(kw)) {
      // Substring match (catches compound words)
      score += 2
    }
  }

  for (const syn of entry.synonyms) {
    if (tokens.includes(syn)) {
      score += 1
    } else if (lower.includes(syn)) {
      score += 0.5
    }
  }

  return score
}

function findResponse(userText: string): string {
  const lower = userText.toLowerCase().trim()
  if (!lower) return KB[KB.length - 1].response // fallback

  let bestScore = 0
  let bestEntry = KB.find((e) => e.id === 'fallback')!

  for (const entry of KB) {
    if (entry.id === 'fallback') continue
    const score = scoreEntry(lower, entry)
    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  // If no entry scored anything, use fallback
  return bestScore === 0 ? KB.find((e) => e.id === 'fallback')!.response : bestEntry.response
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const body = await req.json()

  // Accept { userText } from custom client
  let userText: string = body.userText ?? ''

  // Legacy fallback: accept { messages } array from AI SDK
  if (!userText && Array.isArray(body.messages) && body.messages.length > 0) {
    const last = body.messages[body.messages.length - 1]
    userText =
      typeof last?.content === 'string'
        ? last.content
        : (last?.parts as { type: string; text?: string }[])
            ?.filter((p) => p.type === 'text')
            .map((p) => p.text ?? '')
            .join('') ?? ''
  }

  const responseText = findResponse(userText)

  // Stream plain text word-by-word for a natural typing effect
  const encoder = new TextEncoder()
  const words = responseText.split(' ')

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '))
        await new Promise<void>((r) => setTimeout(r, 18))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
