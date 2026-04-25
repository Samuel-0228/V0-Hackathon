'use client';

import { Navigation } from '@/components/navigation';
import { SetupStatus } from '@/components/setup-status';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Your AI Fashion Stylist
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience premium personalized style recommendations powered by advanced AI. 
            Discover outfits tailored to your preferences and lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 h-auto">
                Start Styling Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button variant="outline" className="border-black text-black hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Explore Collections
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-16 text-center">
            Why Choose StyleMind
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="mb-4 p-3 bg-black rounded-lg w-fit">
                <MessageSquare className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">AI-Powered Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with our intelligent styling assistant that understands your preferences and creates personalized recommendations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="mb-4 p-3 bg-black rounded-lg w-fit">
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Curated Collections</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse expertly curated outfits for every occasion, from casual weekends to formal events.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="mb-4 p-3 bg-black rounded-lg w-fit">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Trend Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay informed with detailed analytics on style trends and customer preferences in your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-black text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Style?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Start your personalized styling journey today with StyleMind Agent.
          </p>
          <Link href="/chat">
            <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto">
              Begin Chat
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 StyleMind Agent. All rights reserved.</p>
        </div>
      </footer>

      {/* Setup Status */}
      <SetupStatus />
    </div>
  );
}
