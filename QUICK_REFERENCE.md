# StyleMind Agent - Quick Reference

## 🎯 App Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Landing page | ✅ Public |
| `/chat` | AI styling assistant | ✅ Public |
| `/outfits` | Outfit gallery | ✅ Public |
| `/dashboard` | Sales analytics | ✅ Owner-only |
| `/inventory` | Product management | ✅ Owner-only |
| `/insights` | AI recommendations | ✅ Owner-only |
| `/api/init-db` | Database setup | ✅ POST endpoint |

## 🗄️ Database Tables

### Customer-Facing
- `conversations` - Chat sessions
- `messages` - Chat messages
- `outfits` - Outfit collections
- `products` - Fashion items

### Business-Facing
- `sales_data` - Daily metrics
- `inventory_alerts` - Stock alerts
- `outfit_recommendations` - AI scoring

### Supporting
- `customer_metadata` - User preferences
- `activity_logs` - Action history

## 📊 Key Data Fields

**Products**
```
id, name, description, category, price, image_url, in_stock
```

**Outfits**
```
id, name, description, occasion, style_tags, image_url
```

**Conversations**
```
id, customer_id, customer_name, customer_email, status, preferences
```

**Messages**
```
id, conversation_id, sender, content, message_type, outfit_data
```

**Sales Data**
```
date, total_sales, total_orders, total_revenue, average_order_value
```

## 🎨 Component Hierarchy

```
RootLayout
├── Navigation (fixed header)
├── Page Content
│   ├── Route-specific components
│   └── Shared components
│       ├── ChatInterface
│       ├── OutfitCard
│       ├── SetupStatus
│       └── UI components (Button, Input, Badge, etc.)
└── Analytics (Dashboard & Insights)
```

## 🔑 Environment Variables

Required for Supabase connection:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
POSTGRES_URL=postgresql://user:pass@host/db
```

## 💡 Tips & Tricks

### Chat Interface
- Type outfit requests like: "business meeting", "evening", "casual"
- AI automatically recommends matching outfits
- Messages persist in Supabase automatically

### Dashboard
- Charts update with sample data from initialization
- Filter by date range (prepare to extend)
- Export data (prepare to add)

### Inventory
- Add products with name, category, and price
- Stock status updates automatically
- Delete with confirmation popup

### Outfits
- Filter by occasion to narrow results
- Each outfit shows recommended style tags
- Click heart icon to save favorites (prepare UI)

## 🚀 Common Tasks

### Add a New Product
```
1. Go to /inventory
2. Click "Add Product"
3. Fill in: Name, Category, Price, Description
4. Click "Save Product"
✓ Product appears in gallery
```

### Recommend an Outfit
```
1. Go to /chat
2. Type: "I need [occasion] outfit"
3. AI responds with recommendation
4. Outfit card shows below message
✓ Conversation saved automatically
```

### View Sales Dashboard
```
1. Go to /dashboard
2. See 4 key metrics at top
3. Scroll for revenue trend chart
4. View daily orders breakdown
✓ All data from Supabase
```

### Get Business Insights
```
1. Go to /insights
2. Read AI-generated analysis
3. Review recommendations section
4. Act on actionable insights
✓ Based on live database data
```

## 🔧 Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Run tests (when added)
pnpm test

# Format code
pnpm format

# Lint code
pnpm lint
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

All pages are optimized for all breakpoints.

## 🎯 Performance Tips

1. **Images**: Using Unsplash CDN - consider self-hosting
2. **Charts**: Recharts handles large datasets well
3. **Database**: Add indexes for frequent queries
4. **Caching**: Consider SWR for API calls

## 🔒 Security Checklist

- [ ] Environment variables set in Vercel
- [ ] Supabase RLS policies enabled
- [ ] API keys rotated regularly
- [ ] No sensitive data in client code
- [ ] CORS properly configured
- [ ] Input validation on all forms

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Database not initialized | Click setup button on home page |
| Supabase connection error | Check env vars in Vercel settings |
| Images not loading | Check internet connection |
| Chat not responding | Ensure database initialized first |
| Charts not showing | Check sales_data table has records |

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Component Gallery**: ui.shadcn.com
- **Tailwind Utilities**: tailwindcss.com
- **TypeScript Help**: typescriptlang.org

## 🎓 Next Learning Steps

1. **Authentication**: Add Supabase Auth
2. **Real-time**: Use Supabase Realtime subscriptions
3. **File Storage**: Add Supabase Storage for product images
4. **Payments**: Integrate Stripe
5. **Testing**: Add Jest + React Testing Library
6. **Analytics**: Add Vercel Analytics

---

**Last Updated**: April 2024
**Version**: 1.0.0
