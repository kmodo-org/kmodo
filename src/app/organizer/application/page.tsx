"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const organizerApplicationForm = z.object({
  eventId: z.string().min(1, { message: "Please select an event." }),
});

export default function OrganizerApplicationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof organizerApplicationForm>>({
    resolver: zodResolver(organizerApplicationForm),
    defaultValues: {
      eventId: "",
    },
  });

  const { data: events } = api.hacker.getAllEvents.useQuery(); // fetch all events for dropdown

  const applyToOrganize = api.hacker.applyToOrganize.useMutation({
    onSuccess: () => router.push("/hacker"),
  });

  const onSubmit = async (values: z.infer<typeof organizerApplicationForm>) => {
    try {
      await applyToOrganize.mutateAsync({
        event_id: parseInt(values.eventId),
      });
    } catch (err) {
      console.error("Application failed:", err);
    }
  };

  return (
    <div className="mt-4 p-6 max-w-lg mx-auto bg-Lavender shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2 pt-2 text-Mint">Apply to Organize</h1>
      <p className="text-sm text-gray-500 mb-4">
        <i>Select an event you&apos;d like to help organize.</i>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-SpaceCadet space-y-4">
          <FormField
            control={form.control}
            name="eventId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border-RoseQuartz rounded-md p-2">
                    <option value="">Select an event</option>
                    {events?.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name} ({event.school})
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-Mint bg-SpaceCadet font-bold">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
}
