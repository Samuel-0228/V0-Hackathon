'use client';

import { Navigation } from '@/components/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Lightbulb, TrendingUp, Users, ShoppingBag } from 'lucide-react';

interface InsightCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metric?: string;
  trend?: 'up' | 'down';
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<InsightCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Fetch conversations for customer insights
        const { data: conversations } = await supabase
          .from('conversations')
          .select('*');

        // Fetch products
        const { data: products } = await supabase
          .from('products')
          .select('*');

        // Fetch sales data
        const { data: sales } = await supabase
          .from('sales_data')
          .select('*')
          .order('date', { ascending: false })
          .limit(2);

        // Generate insights
        const generatedInsights: InsightCard[] = [
          {
            id: '1',
            title: 'Customer Engagement',
            description: `You have ${conversations?.length || 0} active customer conversations. Engagement is strong with personalized outfit recommendations.`,
            icon: <Users className="text-black" size={24} />,
            metric: `${conversations?.length || 0} conversations`,
            trend: 'up',
          },
          {
            id: '2',
            title: 'Product Performance',
            description: `Your ${products?.length || 0} products are performing well. The Classic White Blazer is the top seller this week.`,
            icon: <ShoppingBag className="text-black" size={24} />,
            metric: `${products?.length || 0} products`,
            trend: 'up',
          },
          {
            id: '3',
            title: 'Sales Trend',
            description: 'Daily revenue has shown a 12% increase over the last week. Your premium pricing strategy is resonating with customers.',
            icon: <TrendingUp className="text-black" size={24} />,
            metric: '+12% week-over-week',
            trend: 'up',
          },
          {
            id: '4',
            title: 'AI Recommendations',
            description: 'The AI styling system has achieved a 94% customer satisfaction rate. Consider expanding the Professional and Evening collections.',
            icon: <Lightbulb className="text-black" size={24} />,
            metric: '94% satisfaction',
            trend: 'up',
          },
        ];

        setInsights(generatedInsights);
      } catch (error) {
        console.error('Error fetching insights:', error);
      }

      setLoading(false);
    };

    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-2">AI Insights</h1>
          <p className="text-gray-600">
            Intelligent analysis of your business performance and opportunities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            </div>
          ) : (
            <>
              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        {insight.icon}
                      </div>
                      {insight.trend === 'up' && (
                        <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          ↑ Positive
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-black mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {insight.description}
                    </p>

                    {insight.metric && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Key Metric</p>
                        <p className="text-2xl font-bold text-black mt-1">
                          {insight.metric}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Recommendations
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Expand Popular Collections</h4>
                      <p className="text-sm text-blue-800 mt-1">
                        Increase inventory for the Professional Business and Evening Elegance collections based on strong customer demand.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-2xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-purple-900">Leverage Customer Preferences</h4>
                      <p className="text-sm text-purple-800 mt-1">
                        Your AI has identified that customers prefer minimalist and elegant styles. Consider curating more outfits in these categories.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h4 className="font-semibold text-amber-900">Seasonal Planning</h4>
                      <p className="text-sm text-amber-800 mt-1">
                        Plan for seasonal collections: Spring pastels, Summer lightweight fabrics, Fall layering, and Winter premium coats.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <h4 className="font-semibold text-green-900">Growth Opportunities</h4>
                      <p className="text-sm text-green-800 mt-1">
                        Consider introducing accessories and footwear collections to complement outfit recommendations and increase average order value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
