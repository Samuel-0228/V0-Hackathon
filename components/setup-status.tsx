'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';

export function SetupStatus() {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStatus, setShowStatus] = useState(true);

  const initializeDatabase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/init-db', { method: 'POST' });
      const data = await response.json();

      if (response.ok) {
        setInitialized(true);
        setTimeout(() => setShowStatus(false), 2000);
      } else {
        setError(data.error || 'Failed to initialize database');
      }
    } catch (err) {
      setError('Connection error. Please check your Supabase credentials.');
      console.error('Database init error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!showStatus) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      {initialized ? (
        <div className="flex items-start gap-3">
          <Check className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-gray-900">Database Ready!</h3>
            <p className="text-sm text-gray-600 mt-1">
              Sample data has been loaded. You can now explore the app.
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Setup Required</h3>
            <p className="text-sm text-gray-600 mt-1">{error}</p>
            <Button
              onClick={initializeDatabase}
              disabled={loading}
              className="mt-3 bg-black text-white hover:bg-gray-800 text-sm"
            >
              {loading ? 'Initializing...' : 'Try Again'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">First Time Setup</h3>
          <p className="text-sm text-gray-600 mb-4">
            Initialize your database with sample data to explore all features.
          </p>
          <Button
            onClick={initializeDatabase}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {loading ? 'Initializing Database...' : 'Initialize Database'}
          </Button>
        </div>
      )}
    </div>
  );
}
