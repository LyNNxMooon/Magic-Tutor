import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Magic Tutor
              </span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Transform your content consumption with AI-powered summaries. 
              Save time, learn faster, and stay informed with Magic Tutor - completely free for everyone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/summarize" className="hover:text-white transition-colors">Summarize</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Magic Tutor. All rights reserved. Free for everyone, forever.</p>
        </div>
      </div>
    </footer>
  );
}