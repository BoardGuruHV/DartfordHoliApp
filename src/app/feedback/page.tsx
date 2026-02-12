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

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useLocalStorage("holi-feedback-submitted", false);
  const [, setFeedback] = useLocalStorage<FeedbackEntry[]>("holi-feedback", []);

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
        <div className="px-4 text-center py-12">
          <span className="text-5xl block mb-4">🙏</span>
          <h2 className="text-2xl font-bold gradient-text">Thank You!</h2>
          <p className="text-white/60 mt-2">Your feedback has been saved. We appreciate it!</p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>Submit Another</Button>
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
