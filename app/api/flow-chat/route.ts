// No external AI API required — purely rule-based with keyword scoring

const KNOWLEDGE_BASE: { keywords: string[]; synonyms: string[]; response: string }[] = [
  {
    keywords: ['balance', 'account balance', 'how much money', 'my money', 'account'],
    synonyms: ['funds', 'birr', 'cash', 'wallet amount'],
    response: `Your current account balances are:

- **ETB Current Account:** ETB 284,750.50
- **USD Account:** $1,820.00
- **Savings Account:** ETB 95,000.00

Your last deposit was **ETB 45,000** on April 20. All accounts are active and in good standing. Would you like to make a transfer or check your recent transactions?`,
  },
  {
    keywords: ['fx rate', 'exchange rate', 'dollar', 'usd', 'eur', 'gbp', 'forex', 'currency', 'birr rate', 'exchange'],
    synonyms: ['conversion', 'convert', 'foreign currency', 'rate today', 'sar', 'saudi'],
    response: `Here are today's live FX rates from Dashen Bank:

- **USD / ETB:** 56.42 (+0.31 today)
- **EUR / ETB:** 61.18 (-0.15 today)
- **GBP / ETB:** 72.55 (+0.08 today)
- **SAR / ETB:** 15.03 (+0.05 today)

The USD is slightly up today. You can use your **Virtual Mastercard** for international purchases on Amazon, Alibaba, Netflix, and more — no need to physically exchange cash.`,
  },
  {
    keywords: ['dstv', 'teletv', 'tv', 'stream', 'entertainment', 'cable', 'subscription'],
    synonyms: ['television', 'satellite', 'showmax', 'local movie', 'channel', 'pay tv'],
    response: `Your **DSTV Compact Plus** subscription is due for renewal in **3 days** (April 28). The monthly cost is **ETB 2,100**.

You can renew it now directly through the Entertainment mini-app to avoid a service interruption. **TeleTV** is also available in-app for streaming local Ethiopian movies and shows at no extra cost.`,
  },
  {
    keywords: ['flight', 'airline', 'travel', 'mytravel', 'air ticket', 'addis', 'dubai', 'nairobi', 'london', 'book flight', 'plane'],
    synonyms: ['fly', 'airport', 'ticket', 'trip', 'destination', 'ethiopian airlines', 'booking'],
    response: `Through the **MyTravel** mini-app, here are available Ethiopian Airlines fares:

- **ADD to DXB (Dubai):** ETB 28,500 — *12% below your last booking*
- **ADD to NBO (Nairobi):** ETB 14,200
- **ADD to LHR (London):** ETB 52,000

You can search, compare, and purchase air tickets entirely within the Dashen Super App. Navigate to MyTravel from the main menu to get started.`,
  },
  {
    keywords: ['spend', 'spending', 'expense', 'budget', 'budgeting', 'april', 'how much did i spend'],
    synonyms: ['transactions', 'outgoing', 'cost', 'monthly spend', 'weekly spend', 'category'],
    response: `Here is your **April spending summary:**

- **Groceries:** ETB 14,100
- **Dining and Restaurants:** ETB 9,800 *(up 18% vs March)*
- **Transport:** ETB 6,400
- **Utilities:** ETB 3,600

Your dining spend is trending up. Use the **Budgeting Tool** in the app to set daily, weekly, or monthly limits and receive alerts before you overspend.`,
  },
  {
    keywords: ['saving', 'savings', 'goal', 'target', 'dubai goal'],
    synonyms: ['save up', 'how close', 'progress', 'nest egg', 'deposit'],
    response: `Your **Dubai Trip savings goal** is at **79% complete:**

- **Target:** ETB 120,000
- **Saved so far:** ETB 95,000
- **Remaining:** ETB 25,000

At your current saving rate you are approximately **6 weeks away** from reaching your goal. If you need funds sooner, you can also explore a **Sahay microloan** to bridge the gap.`,
  },
  {
    keywords: ['transfer', 'send money', 'send', 'pay someone', 'payment', 'qr', 'qr code', 'interbank', 'other bank'],
    synonyms: ['remit', 'wire', 'pay', 'receive money', 'merchant payment', 'peer to peer'],
    response: `Dashen makes payments fast and flexible:

- **Dashen-to-Dashen transfers:** Instant and free
- **Inter-bank transfers:** Fully supported — send to any Ethiopian bank
- **QR Code Payment:** Scan any merchant QR code for instant, secure payment
- **Chat Banking:** Send money or request payments directly while chatting with a Dashen contact

All transfers are secured with biometric authentication and device tokenization.`,
  },
  {
    keywords: ['sahay', 'loan', 'microloan', 'borrow', 'lend', 'credit', 'apply for loan', 'micro loan', 'lending'],
    synonyms: ['financing', 'advance', 'collateral', 'repayment', 'interest rate', 'loan limit'],
    response: `**Sahay Micro-Lending (Conventional)** gives you instant loans — no physical collateral required:

- **Interest rate:** 6%–10% for 30-day terms
- **Facilitation fee:** 1.5%–6.5% (one-time, varies by term)
- **Loan limits:** From **ETB 100** up to **ETB 15,000+** — grows as you build repayment history
- **Repayment options:** Daily, weekly, or 30-day
- **Late penalty:** ~0.11% per day or 2% flat on outstanding balance

Eligibility is determined by AI credit scoring based on your transaction history and savings behaviour. An active Dashen account and **Fayda Digital ID** are required for the highest limits.`,
  },
  {
    keywords: ['sharik', 'interest free', 'interest-free', 'ifb', 'sharia', 'islamic', 'halal', 'qard', 'dubeale', 'buy now pay later', 'bnpl'],
    synonyms: ['zero interest', 'profit sharing', 'mark up', 'shariah compliant', 'islamic banking', 'women loan'],
    response: `**Sharik** is Dashen's Sharia-compliant micro-financing service — no interest, ever:

- **Profit mark-up:** Starts from ~4% (profit-sharing model, not interest)
- **Qard Al-Hasan:** Zero-profit loans available for women entrepreneurs and special programs
- **DubeAle-IFB:** Buy Now, Pay Later at participating stores — repay in **3, 6, or 12 months**, fully interest-free
- Sharik portfolio has surpassed **ETB 15 billion** in Sharia-compliant financing

Both Sahay and Sharik require no physical collateral. Eligibility is AI-scored from your transaction history.`,
  },
  {
    keywords: ['virtual card', 'mastercard', 'international payment', 'amazon', 'alibaba', 'netflix', 'online purchase', 'remittance'],
    synonyms: ['online card', 'digital card', 'e-card', 'virtual mastercard', 'foreign purchase', 'freeze card'],
    response: `The **Virtual Mastercard** lets you shop internationally without a physical card:

- Generate a virtual Mastercard instantly in the app
- Use it on **Amazon, Alibaba, Netflix**, and thousands of international sites
- Receive **foreign remittances** directly to your card
- Freeze or unfreeze the card at any time from the app

This is especially useful if you are shopping online or need to receive money from abroad.`,
  },
  {
    keywords: ['edil', 'dashen edil', 'lottery', 'prize', 'coin', 'reward', 'loyalty', 'shake', 'win'],
    synonyms: ['gamification', 'points', 'lucky', 'jackpot', 'competition', 'gift'],
    response: `**Dashen Edil** is the Super App's gamified loyalty program:

- Earn **coins** through everyday transactions — transfers, bill payments, airtime top-ups
- Shake your phone to spin for prizes
- **Prizes include:** Smartphones, cash rewards, and a **brand new car**
- Total prize pool: up to **ETB 30 million**

Every transaction earns you more coins and more chances to win. Keep transacting to maximise your entries!`,
  },
  {
    keywords: ['utility', 'electricity', 'water', 'school fee', 'bill payment', 'concert', 'event ticket', 'pay bill'],
    synonyms: ['enel', 'awash', 'sewage', 'service payment', 'tuition', 'fees', 'bills'],
    response: `You can pay all your utility and service bills directly in the **Dashen Super App** — no queues, no branch visits:

- **Electricity and Water bills**
- **School and university fees**
- **Event and concert tickets**
- **Digital content subscriptions**

Navigate to the Utility Payments mini-app, select the service, enter your reference number, and confirm payment instantly from your ETB balance.`,
  },
  {
    keywords: ['zoorya', 'erp', 'business', 'pos', 'inventory', 'msme', 'sales tracking', 'small business'],
    synonyms: ['merchant', 'shop owner', 'enterprise', 'stock', 'accounting', 'point of sale', 'revenue'],
    response: `**Zoorya ERP** is built for small and medium business owners right inside the app:

- **POS system** — process sales directly from your phone
- **Inventory management** — track stock levels in real time
- **Sales tracking** — view daily, weekly, monthly revenue reports
- **Expense management** — categorise and monitor business costs

All Zoorya data is linked to your Dashen business account, making reconciliation seamless. Perfect for MSMEs looking to run their entire business from one platform.`,
  },
  {
    keywords: ['chat banking', 'chat to pay', 'chat transfer', 'send in chat', 'message'],
    synonyms: ['in-chat', 'chat payment', 'chat money', 'chat transfer', 'conversation payment'],
    response: `**Chat Banking** lets you do banking without leaving your conversation:

- **Send money** to any Dashen contact while chatting
- **Request payments** directly in the chat thread
- **Top up airtime** for yourself or a contact in seconds

It works just like a messaging app — type your request, confirm, and the transaction is done. No need to navigate away from the chat.`,
  },
  {
    keywords: ['fayda', 'digital id', 'open account', 'account opening', 'onboard', 'new account'],
    synonyms: ['national id', 'identity', 'signup', 'register', 'create account', 'verify'],
    response: `**Fayda Digital ID Onboarding** lets you open a Dashen account instantly — no branch visit required:

- Uses Ethiopia's **National Digital ID (Fayda)** system
- **AI-powered** identity verification in seconds
- Immediately access all Super App features after opening
- **Ethiopia's first** digital ID-based bank account opening

Simply launch the Super App, tap "Open Account", and scan your Fayda Digital ID. Your account is ready within minutes.`,
  },
  {
    keywords: ['supercard', 'business card', 'digital business card', 'share contact'],
    synonyms: ['networking', 'visiting card', 'profile card', 'share info'],
    response: `**SuperCard** is your digital business card built into the Dashen Super App:

- Create and customise your professional digital card
- Share it instantly with any other Dashen user
- No paper cards needed — always up to date

Perfect for entrepreneurs, freelancers, and professionals who want a modern way to share their contact details.`,
  },
  {
    keywords: ['airtime', 'top up', 'topup', 'recharge', 'data bundle'],
    synonyms: ['mobile credit', 'phone credit', 'ethio telecom', 'etele', 'data', 'bundle'],
    response: `Airtime and data top-ups are available directly in the Dashen Super App:

- Top up for **yourself or any Ethiopian number**
- Supports all major telecoms (**Ethio Telecom**, etc.)
- Also available via **Chat Banking** — top up while messaging a contact
- Deducted instantly from your ETB account

No need to visit a kiosk — it takes under 10 seconds in the app.`,
  },
  {
    keywords: ['language', 'amharic', 'oromoo', 'afaan', 'somali', 'tigrigna', 'tigrinya'],
    synonyms: ['lingua', 'translate', 'multilingual', 'local language', 'ethnic', 'region'],
    response: `The Dashen Super App is available in **5 languages** to serve all Ethiopians:

1. **Amharic** (አማርኛ)
2. **English**
3. **Afaan Oromoo**
4. **Af-Soomaali**
5. **Tigrigna** (ትግርኛ)

You can switch languages at any time from the app settings.`,
  },
  {
    keywords: ['security', 'safe', 'biometric', 'fingerprint', 'face id', 'secure', 'protected'],
    synonyms: ['password', 'pin', 'encrypted', 'fraud', 'hack', 'token', 'login'],
    response: `Dashen Super App uses **bank-grade security** to protect your account:

- **Biometric login:** Fingerprint and Face ID supported
- **Device tokenization:** Your credentials are never stored in plain text
- **End-to-end encryption** on all transactions
- **Virtual card freeze:** Instantly freeze your Mastercard from the app
- **Fayda Digital ID** verification for highest-limit transactions

Your money and data are always protected.`,
  },
  {
    keywords: ['shop', 'shopping', 'buy', 'product', 'ecommerce', 'e-commerce', 'marketplace'],
    synonyms: ['purchase', 'order', 'goods', 'store', 'retail', 'item', 'online store'],
    response: `The **E-Commerce mini-app** connects you to online marketplaces without leaving Dashen:

- Browse and purchase from integrated merchants
- Use your **Virtual Mastercard** to shop on Amazon, Alibaba, and more
- **Today's featured products:**
  - Samsung Galaxy A55 — **ETB 31,500**
  - Ethiopian Coffee Ceremony Set — **ETB 3,800**
  - Nike Air Max 270 — **ETB 8,200**

Payments are deducted directly from your Dashen account — fast, safe, and paperless.`,
  },
  {
    keywords: ['what can you do', 'help', 'capabilities', 'mini app', 'features', 'what do you know', 'overview', 'tell me about dashen', 'hi', 'hello', 'hey', 'start'],
    synonyms: ['services', 'options', 'topics', 'menu', 'guide', 'introduce', 'greet'],
    response: `Hello! I am **Flow AI**, your market-aware financial agent inside the Dashen Super App. Here is what I can help you with:

**Banking:** Account balances, transfers, QR payments, Chat Banking
**Loans:** Sahay microloans (6%–10%), Sharik interest-free financing, DubeAle BNPL
**Cards:** Virtual Mastercard for international payments and remittances
**Travel:** MyTravel flight booking engine
**Entertainment:** DSTV subscriptions, TeleTV streaming
**Bills:** Electricity, water, school fees, event tickets
**Business:** Zoorya ERP for MSMEs (POS, inventory, sales tracking)
**Loyalty:** Dashen Edil — earn coins and win up to ETB 30 million in prizes
**Onboarding:** Open an account instantly with Fayda Digital ID
**FX Rates:** Live exchange rates for USD, EUR, GBP, SAR

The Dashen Super App has **200+ mini-apps**. Just ask me anything!`,
  },
]

const FALLBACK = `I am Flow AI, your Dashen Super App assistant. I can help you with:

**Account balances, FX rates, loans (Sahay or Sharik), DSTV, flight bookings, utility bills, shopping, Dashen Edil loyalty, Zoorya ERP, and more.**

Could you rephrase your question? You can also visit **dashensuperapp.com** or call Dashen Bank support for further assistance.`

/**
 * Score a query against a knowledge base entry.
 * Returns a numeric score — higher means a better match.
 */
function scoreEntry(lower: string, entry: { keywords: string[]; synonyms: string[] }): number {
  let score = 0
  for (const kw of entry.keywords) {
    if (lower.includes(kw)) score += 3  // keyword hit = weight 3
  }
  for (const syn of entry.synonyms) {
    if (lower.includes(syn)) score += 1  // synonym hit = weight 1
  }
  return score
}

function findResponse(text: string): string {
  const lower = text.toLowerCase().trim()

  let bestScore = 0
  let bestResponse = FALLBACK

  for (const entry of KNOWLEDGE_BASE) {
    const score = scoreEntry(lower, entry)
    if (score > bestScore) {
      bestScore = score
      bestResponse = entry.response
    }
  }

  return bestResponse
}

export async function POST(req: Request) {
  const body = await req.json()

  // Accept both { userText } (our custom client) and { messages } (legacy)
  let userText: string = body.userText ?? ''
  if (!userText && Array.isArray(body.messages) && body.messages.length > 0) {
    const last = body.messages[body.messages.length - 1]
    userText =
      typeof last?.content === 'string'
        ? last.content
        : last?.parts?.filter((p: { type: string }) => p.type === 'text').map((p: { type: string; text?: string }) => (p as { text: string }).text).join('') ?? ''
  }

  const responseText = findResponse(userText)

  // Stream plain text word-by-word — no external SDK needed
  const encoder = new TextEncoder()
  const words = responseText.split(' ')

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '))
        await new Promise((r) => setTimeout(r, 20))
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
