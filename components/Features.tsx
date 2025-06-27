"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Clock, Globe, Brain, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get summaries in seconds, not minutes. Our AI processes content at incredible speed.",
    color: "text-yellow-500",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Powered by Google's Gemini 2.5 Flash for the most accurate and contextual summaries.",
    color: "text-purple-500",
  },
  {
    icon: Globe,
    title: "Universal Support",
    description: "Works with YouTube videos and web articles from any website worldwide.",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays secure. We don't store your content or personal information.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Turn hours of content into digestible insights in just a few clicks.",
    color: "text-orange-500",
  },
  {
    icon: Rocket,
    title: "Always Improving",
    description: "Regular updates and new features to enhance your summarization experience.",
    color: "text-indigo-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Why Choose Magic Tutor?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make Magic Tutor the ultimate content summarization tool
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors mb-6`}>
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}