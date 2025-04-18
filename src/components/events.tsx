'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Events() {
    const { data: events, isLoading: eventsLoading } = api.hacker.getEvents.useQuery();
    const { data: hackerProfile } = api.hacker.getHackerProfile.useQuery();
    const { data: applications = [], refetch: refetchApplications } = api.hacker.getHackathonApplications.useQuery();
    
    // Track pending state for each event ID
    const [pendingEventIds, setPendingEventIds] = useState<number[]>([]);
    
    const applyMutation = api.hacker.applyToHackathon.useMutation({
        onSuccess: async () => {
            toast.success("Successfully applied to hackathon!");
            // Refetch applications to update the UI
            await refetchApplications();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to apply. Please try again.");
        },
    });

    const handleHackathonRegistration = useCallback(async (eventId: number) => {
        try {
            if (!hackerProfile) {
                toast.error("Please complete your profile before registering.");
                return;
            }

            // Add this event ID to pending list
            setPendingEventIds(prev => [...prev, eventId]);
            
            await applyMutation.mutateAsync({ eventId });
        } catch (error) {
            console.error('Failed to register:', error);
        } finally {
            // Remove this event ID from pending list
            setPendingEventIds(prev => prev.filter(id => id !== eventId));
        }
    }, [hackerProfile, applyMutation]);

    if (eventsLoading) return <div>Loading...</div>;
    if (!events) return <div>No events found</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {events.map((event) => {
                const date = new Date(event.date);
                const startTime = new Date(event.starttime);
                const endTime = new Date(event.endtime);
                
                const imageMap: Record<string, string> = {
                    "Knight Hacks VIII": "/images/knighthacks.png",
                    "Bitcamp": "/images/bitcamp.png",
                    "ShellHacks": "/images/shellhacks.png"
                };

                const imageSrc = imageMap[event.name] ?? "/images/kmodoL.svg";
                
                // Check if user has already applied to this specific event
                const hasApplied = applications.some(app => app.event_id === event.id);
                
                // Check if this specific event is pending
                const isPending = pendingEventIds.includes(event.id);

                return (
                    <Card key={event.id} className="bg-destructive text-destructive-foreground">
                        <div className="p-6">
                            <CardHeader>
                                <CardTitle className="mb-2 font-extrabold text-4xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl break-words">
                                    {event.name}
                                </CardTitle>
                                <CardDescription>
                                    <div className="flex flex-col text-lg font-semibold">
                                        <span>{event.school}</span>
                                        <span>{event.location}</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <Image
                                        src={imageSrc}
                                        width={200}
                                        height={100}
                                        alt={event.name}
                                        className="mb-4 object-fill h-[200px]" // Fixed height for the image
                                    />
                                </div>
                                <p className="text-sm text-destructive-foreground mb-2 mt-4">
                                    {event.description}
                                </p>
                                <div className="flex gap-4 text-sm">
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p>{date.toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p>
                                            {startTime.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })} - {" "}
                                            {endTime.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex mb-10">
                                    <div className="flex justify-center w-full">
                                        <Button 
                                            onClick={() => handleHackathonRegistration(event.id)}
                                            disabled={hasApplied ?? isPending}
                                            className="mt-11 bg-accent text-destructive-foreground hover:bg-destructive-foreground hover:text-accent"
                                        >
                                            {hasApplied ? 'Applied' : isPending ? 'Applying...' : 'Register'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}