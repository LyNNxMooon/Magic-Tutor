export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { getSummaryFromGemini } from "@/lib/getSummary";
import { fetchTranscript } from "@/lib/fetchTranscript";
import { fetchArticle } from "@/lib/fetchArticle";
import { db } from "@/lib/firebase";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const { userId } = getAuth(req);

    // Rate limiting for guests only
    if (!userId) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
      const today = new Date().toISOString().split("T")[0];
      const docRef = db.collection("guest_usage").doc(`${ip}_${today}`);
      const doc = await docRef.get();
      const count = doc.exists ? doc.data()?.count || 0 : 0;

      if (count >= 3) {
        return NextResponse.json(
          {
            error:
              "Free users are limited to 3 summaries per day. Please get Pro Plan for unlimited access.",
          },
          { status: 403 }
        );
      }

      await docRef.set({ count: count + 1, date: today }, { merge: true });
    }

    let content = "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      content = await fetchTranscript(url);
    } else {
      content = await fetchArticle(url);
    }

    if (!content) {
      return NextResponse.json(
        { error: "Unable to extract content" },
        { status: 500 }
      );
    }

    const summary = await getSummaryFromGemini(content);
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json(
      { error: "Please sign in to start summarizing!", details: String(err) },
      { status: 500 }
    );
  }
}
