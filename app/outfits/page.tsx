'use client';

import { Navigation } from '@/components/navigation';
import OutfitCard from '@/components/outfit-card';
import { supabase, type Outfit } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      const { data, error } = await supabase
        .from('outfits')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOutfits(data);
        setFilteredOutfits(data);
      }
      setLoading(false);
    };

    fetchOutfits();
  }, []);

  const occasions = ['Work', 'Evening', 'Casual', 'Weekend'];

  const handleOccasionFilter = (occasion: string) => {
    setSelectedOccasion(selectedOccasion === occasion ? null : occasion);

    if (selectedOccasion === occasion) {
      setFilteredOutfits(outfits);
    } else {
      setFilteredOutfits(
        outfits.filter((outfit) => outfit.occasion === occasion)
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-2">Outfit Collections</h1>
          <p className="text-gray-600">
            Browse our curated collection of stylish outfits for every occasion
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gray-600 mb-4 uppercase">Filter by Occasion</h2>
            <div className="flex flex-wrap gap-3">
              {occasions.map((occasion) => (
                <button
                  key={occasion}
                  onClick={() => handleOccasionFilter(occasion)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedOccasion === occasion
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          {/* Outfit Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            </div>
          ) : filteredOutfits.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No outfits found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
