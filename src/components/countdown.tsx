"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Clock } from "lucide-react";
import { Card } from "~/components/ui/card";

dayjs.extend(duration);

interface CountdownBannerProps {
  /** ISO start date, e.g. "2025‑05‑23T10:00:00‑04:00" */
  start: string;
}

export function CountdownBanner({ start }: CountdownBannerProps) {
  const startAt = dayjs(start);
  const [now, setNow] = useState(() => dayjs());

  /* tick every second */
  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1_000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(startAt.diff(now), 0);
  const d    = dayjs.duration(diff);
  const fmt  = (n: number) => n.toString().padStart(2, "0");

  return (
    <Card>
      <div className="flex flex-col rounded-xl bg-white/5 p-6 items-center text-center">
        <div className="bg-[#a72828]/10 p-4 rounded-lg border border-[#a72828]/20 mb-6">
          <Clock className="w-8 h-8 text-[#a72828]" />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#a72828]">
          Countdown to Event
        </h2>

        {diff > 0 ? (
          <p className="font-bold tracking-wider text-4xl lg:text-7xl">
            {fmt(d.days())}d&nbsp;{fmt(d.hours())}h&nbsp;{fmt(d.minutes())}m&nbsp;
            {fmt(d.seconds())}s
          </p>
        ) : (
          <p className="font-bold tracking-wider text-5xl lg:text-7xl text-[#a72828]">
            LIVE&nbsp;NOW
          </p>
        )}
      </div>
    </Card>
  );
}
