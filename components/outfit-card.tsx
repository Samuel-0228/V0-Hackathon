'use client';

import { Outfit } from '@/lib/supabase';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface OutfitCardProps {
  outfit: Outfit;
  showDescription?: boolean;
}

export default function OutfitCard({ outfit, showDescription = true }: OutfitCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      {/* Outfit Image */}
      <div className="relative bg-gray-200 h-40 sm:h-48 flex items-center justify-center overflow-hidden group">
        <div className="text-gray-400 text-sm font-medium">
          {outfit.name}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          aria-label="Like outfit"
        >
          <Heart
            size={18}
            className={`transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Outfit Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-black text-lg">{outfit.name}</h3>
            <p className="text-xs text-gray-500 capitalize">{outfit.occasion}</p>
          </div>
        </div>

        {showDescription && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {outfit.description}
          </p>
        )}

        {/* Style Tags */}
        <div className="flex flex-wrap gap-2">
          {outfit.style_tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-gray-200 text-gray-800 text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
