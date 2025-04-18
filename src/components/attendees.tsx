"use client";

import { Card } from "./card";
import { InfoRow } from "./inforow";
// import { api } from "~/trpc/react"; // uncomment when the query works

export function AttendeesCard() { // temorary hardcoded values
  const totalRegistered = 500;
  const totalAccepted   = 300;

  /* When your query is ready:
  const { data: stats } = api.organizer.attendees.counts.useQuery();
  const totalRegistered = stats?.totalRegistered ?? "—";
  const totalAccepted   = stats?.totalAccepted   ?? "—";
  */

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Attendees</h2>
      <InfoRow label="Registered" value={totalRegistered} />
      <InfoRow label="Accepted"   value={totalAccepted} />
    </Card>
  );
}
