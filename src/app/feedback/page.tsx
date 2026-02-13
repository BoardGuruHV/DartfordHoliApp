"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { generateId } from "@/lib/utils";
import type { FeedbackEntry } from "@/types";

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div>
      <label className="text-sm text-white/70 block mb-1">{label}</label>
      <div className="flex gap-1" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl transition-transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            role="radio"
            aria-checked={value === star}
          >
            {star <= value ? "⭐" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

const STARS = ["", "⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

function formatFeedbackText(entries: FeedbackEntry[]): string {
  if (entries.length === 0) return "No feedback submitted yet.";

  return entries
    .map((entry, i) => {
      const date = new Date(entry.timestamp).toLocaleString();
      return [
        `--- Feedback #${i + 1} (${date}) ---`,
        `Overall: ${STARS[entry.overallRating]} (${entry.overallRating}/5)`,
        entry.entertainmentRating ? `Entertainment: ${STARS[entry.entertainmentRating]} (${entry.entertainmentRating}/5)` : null,
        entry.foodRating ? `Food & Drink: ${STARS[entry.foodRating]} (${entry.foodRating}/5)` : null,
        entry.organizationRating ? `Organisation: ${STARS[entry.organizationRating]} (${entry.organizationRating}/5)` : null,
        entry.comments ? `Comments: ${entry.comments}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function FeedbackExport({ feedback }: { feedback: FeedbackEntry[] }) {
  const [copied, setCopied] = useState(false);

  const feedbackText = formatFeedbackText(feedback);
  const subject = encodeURIComponent("Dartford Holi Festival 2025 — Feedback");
  const body = encodeURIComponent(feedbackText);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = feedbackText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (feedback.length === 0) return null;

  return (
    <Card className="border-white/10">
      <h3 className="text-sm font-semibold mb-2">Share Your Feedback</h3>
      <p className="text-xs text-white/50 mb-3">Send your feedback to the organisers or save a copy.</p>
      <div className="flex gap-2">
        <a
          href={mailtoLink}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-holi-purple/30 border border-holi-purple/30 text-sm font-medium hover:bg-holi-purple/40 transition-colors"
        >
          📧 Email
        </a>
        <button
          onClick={handleCopy}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
    </Card>
  );
}

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useLocalStorage("holi-feedback-submitted", false);
  const [feedback, setFeedback] = useLocalStorage<FeedbackEntry[]>("holi-feedback", []);

  const [overall, setOverall] = useState(0);
  const [entertainment, setEntertainment] = useState(0);
  const [food, setFood] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (overall === 0) return;

    const entry: FeedbackEntry = {
      id: generateId(),
      overallRating: overall,
      entertainmentRating: entertainment,
      foodRating: food,
      organizationRating: organization,
      comments,
      timestamp: new Date().toISOString(),
    };

    setFeedback((prev) => [...prev, entry]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <PageHeader title="Feedback" />
        <div className="px-4 space-y-4">
          <div className="text-center py-8">
            <span className="text-5xl block mb-4">🙏</span>
            <h2 className="text-2xl font-bold gradient-text">Thank You!</h2>
            <p className="text-white/60 mt-2">Your feedback has been saved. We appreciate it!</p>
          </div>

          <FeedbackExport feedback={feedback} />

          <div className="text-center">
            <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Feedback" subtitle="Help us improve next year!" />

      <form onSubmit={handleSubmit} className="px-4 space-y-4">
        <Card>
          <div className="space-y-4">
            <StarRating value={overall} onChange={setOverall} label="Overall Experience *" />
            <StarRating value={entertainment} onChange={setEntertainment} label="Entertainment" />
            <StarRating value={food} onChange={setFood} label="Food & Drink" />
            <StarRating value={organization} onChange={setOrganization} label="Organisation" />
          </div>
        </Card>

        <Card>
          <label className="text-sm text-white/70 block mb-2">Comments & Suggestions</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Tell us what you loved or what we could improve..."
            className="w-full bg-holi-surface rounded-xl p-3 text-sm text-white placeholder:text-white/30 min-h-[120px] resize-none border border-white/10 focus:border-holi-pink/50 focus:outline-none transition-colors"
          />
        </Card>

        <Button type="submit" className="w-full" disabled={overall === 0}>
          Submit Feedback
        </Button>
        <p className="text-center text-white/40 text-xs">
          Feedback is stored on your device only.
        </p>
      </form>
    </div>
  );
}
