"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Copy, Loader2, Video, FileText, CheckCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SummarizePage() {
  const { isSignedIn } = useAuth();
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
        toast.success("Summary generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate summary");
      }
    } catch (error) {
      toast.error("Please sign in to continue!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Content Summarizer
            </h1>
            <p className="text-xl text-gray-600">
              Paste any YouTube video or article URL to get an instant AI-powered summary - completely free!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {url && isYouTubeUrl(url) ? (
                    <Video className="h-6 w-6 text-red-500" />
                  ) : (
                    <FileText className="h-6 w-6 text-blue-500" />
                  )}
                  <span>Enter URL to Summarize</span>
                </CardTitle>
                <CardDescription>
                  Supports YouTube videos and web articles from any website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=... or https://example.com/article"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 h-12 text-lg border-2 focus:border-purple-400"
                      disabled={loading}
                    />
                    <Button
                      type="submit"
                      disabled={loading || !url.trim()}
                      className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Summarize"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <span>AI Summary</span>
                    </CardTitle>
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                        {summary}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 grid md:grid-cols-2 gap-8"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Video className="h-8 w-8 text-red-500" />
                  <h3 className="text-xl font-semibold">YouTube Videos</h3>
                </div>
                <p className="text-gray-600">
                  Extract transcripts and generate summaries from any YouTube video
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <h3 className="text-xl font-semibold">Web Articles</h3>
                </div>
                <p className="text-gray-600">
                  Summarize articles, blog posts, and news from any website
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
