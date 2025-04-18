"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card } from "./card";
import { InfoRow } from "./inforow";
// import { api } from "~/trpc/react";        

dayjs.extend(relativeTime);

// swap with api.organizer.event.details.useQuery()
const stubEvent = {
  location: "TBA",
  startsAt: dayjs().add(7, "day").startOf("hour").toISOString(),
  endsAt: dayjs().add(8, "day").startOf("hour").toISOString(),
};

export function EventSummaryCard() {
  /* 
  const { data: event } = api.organizer.event.details.useQuery();
  */
  const event = stubEvent; // fallback for now

  /* live countdown */
  const [now, setNow] = useState(() => dayjs());
  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!event) {
    return (
      <Card>
        <h2 className="text-xl font-semibold">Event Overview</h2>
        <p className="opacity-70 mt-4">No event created yet.</p>
      </Card>
    );
  }

  const start  = dayjs(event.startsAt);
  const end    = dayjs(event.endsAt);
  const liveIn = start.diff(now) > 0 ? start.from(now, true) : "LIVE";

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Event Overview</h2>

      <p className="text-5xl font-bold mb-2">
        {liveIn}
        <span className="text-lg font-normal ml-2">until start</span>
      </p>

      <div className="mt-4 space-y-1 text-sm">
        <InfoRow label="Location" value={event.location ?? "TBA"} />
        <InfoRow label="Start"    value={start.format("MMM D, YYYY h:mm A")} />
        <InfoRow label="End"      value={end.format("MMM D, YYYY h:mm A")} />
      </div>
    </Card>
  );
}
