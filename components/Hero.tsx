"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-purple-200"
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Powered by Gemini 2.5 Flash</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Transform Content Into{" "}
            <span className="relative">
              Insights
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              />
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
            Instantly summarize YouTube videos and articles with AI-powered precision.
            <br />
            Save time, learn faster, stay informed.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/summarize">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full group"
              >
                Start Summarizing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg rounded-full border-2 hover:bg-gray-50"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <Video className="h-8 w-8 text-red-500" />
              <span className="text-lg font-semibold text-gray-700">YouTube Videos</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="text-lg font-semibold text-gray-700">Web Articles</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}