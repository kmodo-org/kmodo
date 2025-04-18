'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HackathonCardProps {
    title: string;
    desc: string;
    date: string;
    starttime: Date;
    endtime: Date;
    school: string;
    location: string;
    id: number;
}

// Define an image map with index signature
const imageMap: Record<string, string> = {
    "Knight Hacks": "/images/knighthacks.png",
    "Bitcamp": "/images/bitcamp.png",
    "Shell Hacks": "/images/shellhacks.png"
};

const Events: React.FC<HackathonCardProps> = (props) => {
    const { data: events, isLoading: eventsLoading } = api.hacker.getEvents.useQuery();
    const { data: hackerProfile } = api.hacker.getHackerProfile.useQuery();
    const { data: applications = [], refetch: refetchApplications } = api.hacker.getHackathonApplications.useQuery();
    
    // Track pending state for each event ID
    const [pendingActions, setPendingActions] = useState<Record<string, boolean>>({});
    
    const applyMutation = api.hacker.applyToHackathon.useMutation({
        onSuccess: async () => {
            toast.success("Successfully applied to hackathon!");
            // Refetch applications to update the UI
            await refetchApplications();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to apply. Please try again.");
        },
        onSettled: (_, __, ___, variables) => {
            // Clear the pending state for this event using the eventId from the mutation variables
            const eventId = (variables as { eventId: number })?.eventId;
            if (eventId) {
                setPendingActions(prev => {
                    const newState = { ...prev };
                    delete newState[`${eventId}-apply`];
                    return newState;
                });
            }
        }
    });

    const handleHackathonRegistration = useCallback(async (eventId: number) => {
        try {
            if (!hackerProfile) {
                toast.error("Please complete your profile before registering.");
                return;
            }

            // Set pending state for this specific event
            setPendingActions(prev => ({ ...prev, [`${eventId}-apply`]: true }));
            
            // Make sure we're passing a number for eventId
            if (typeof eventId !== 'number') {
                console.error('Invalid eventId:', eventId);
                toast.error("Invalid event ID. Please try again.");
                return;
            }
            
            await applyMutation.mutateAsync({ eventId });
        } catch (error) {
            console.error('Failed to register:', error);
        }
    }, [hackerProfile, applyMutation]);

    const isActionPending = (eventId: number) => {
        return pendingActions[`${eventId}-apply`] === true;
    };

    if (eventsLoading) return <div>Loading...</div>;
    if (!events) return <div>No events found</div>;

    const imageSrc = imageMap[props.title] ?? "/images/kmodoL.svg";
    const hasApplied = applications.some(app => app.event_id === props.id);
    const isPending = isActionPending(props.id);
    
    return (
        <>
            <Card className="bg-destructive text-destructive-foreground hover:scale-[1.01]">
                <div className="p-6">
                    <CardHeader>
                        <CardTitle className="mb-2 font-extrabold text-4xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl break-words">
                            {props.title}
                        </CardTitle>
                        <CardDescription>
                            <div className="flex flex-col text-lg font-semibold">
                                <span>{props.school}</span>
                                <span>{props.location}</span>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <Image
                                src={imageSrc}
                                width={200}
                                height={100}
                                alt={props.title}
                                className="mb-4 object-fill h-[200px] rounded-2xl"
                            />
                        </div>
                        <p className="text-sm text-destructive-foreground mb-2 mt-4">
                            {props.desc}
                        </p>
                        <div className="flex gap-4 text-sm">
                            <div>
                                <p className="font-medium">Date</p>
                                <p>{props.date}</p>
                            </div>
                            <div>
                                <p className="font-medium">Time</p>
                                <p>
                                    {props.starttime ? props.starttime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                        : "N/A"}{" "}
                                    -{" "}
                                    {props.endtime
                                        ? props.endtime.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex mb-10">
                            <div className="flex justify-center w-full">
                                <Button 
                                    onClick={() => handleHackathonRegistration(props.id)}
                                    disabled={hasApplied || isPending}
                                    className="mt-11 bg-accent text-destructive-foreground hover:bg-destructive-foreground hover:text-accent"
                                >
                                    {hasApplied ? 'Applied' : isPending ? 'Applying...' : 'Register'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </>
    );
}

export { Events };