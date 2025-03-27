"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const eventForm = z.object({
    name: z.string().min(1, { message: "Please input a valid event name." }),
    school: z.string().min(1, { message: "Please enter a valid school name." }),
    location: z.string().min(1, { message: "Please enter a valid location."}),
    description: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter the event's date" }),
    starttime: z.string().regex(/^\d{2}:\d{2}$/, { message: "Please enter the event's start time" }),
    endtime: z.string().regex(/^\d{2}:\d{2}$/, { message: "Please enter the event's end time" }),
});

const allowedUserIds = new Set([
  "71181949-05ab-4011-a6c9-9f7f97d154e6", // daniel efres 
  "7052d1fe-bb96-4db4-9d90-0791d9a7b9c5", // carlos
  "6ad7e677-86c3-46d9-8041-9fff7e9f6132", // kai
  "094f333e-589e-4a6b-9a58-41893606fc06", // carfos
  "b00087f4-fbe1-465c-a74d-791d74278e7b", // eli
  "ec6e9191-6e59-49fa-a35a-71b99ce8b85e", // adrian
  "846fe944-93cd-4b07-8f47-bcd743f4ec39", // sam 
]);

export default function EventApplication() {
    const router = useRouter();
    const { data: session, status } = useSession();
    
    const form = useForm<z.infer<typeof eventForm>>({
        resolver: zodResolver(eventForm),
        defaultValues: {
            name: "",
            school: "",
            location: "",
            description: "",
            date: "",
            starttime: "",
            endtime: ""
        }
    });

    const createEvent = api.hacker.createEvent.useMutation({
        onSuccess: () => {
            router.push("/dashboard");
        }
    });

    const onSubmit = async (values: z.infer<typeof eventForm>) => { 
        try {
            await createEvent.mutateAsync({ 
                ...values, 
                starttime: new Date(`1970-01-01T${values.starttime}:00Z`), 
                endtime: new Date(`1970-01-01T${values.endtime}:00Z`) 
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated" && (!session.user?.id || !allowedUserIds.has(session.user.id))) {
            router.push("/");
        }
    }, [status, session, router]);

    if (status !== "authenticated" || !session.user?.id || !allowedUserIds.has(session.user.id)) {
        return null; // or a loading spinner
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="p-6 max-w-lg w-full bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-2 text-Mint">Event Application Form</h1> 
                <p className="text-sm text-gray-500 mb-4">
                    <i>Fill out this form to create an Event with Kmodo</i>
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="text-SpaceCadet space-y-4">
                        {[
                            { name: "name", label: "Event Name", placeholder: "KnightHacks X", type: "text" },
                            { name: "school", label: "School", placeholder: "University of Central Florida" },
                            { name: "location", label: "Location", placeholder: "Orlando, FL", type: "text" },
                            { name: "description", label: "Description (optional)", placeholder: "Description", type: "text"},
                            { name: "date", label: "Date", placeholder: "YYYY-MM-DD", type: "date" },
                            { name: "starttime", label: "Start Time", placeholder: "HH:MM", type: "time" },
                            { name: "endtime", label: "End Time", placeholder: "HH:MM", type: "time" },
                        ].map(({ name, label, placeholder, type }) => ( 
                            <FormField
                                key={name}
                                control={form.control}
                                name={name as keyof z.infer<typeof eventForm>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input type={type} placeholder={placeholder} {...field} className="border-RoseQuartz"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full text-Mint bg-SpaceCadet font-bold">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}