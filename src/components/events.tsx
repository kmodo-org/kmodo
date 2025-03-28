import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { api } from "~/trpc/server";
import Image from "next/image";

export default async function Events() {
    const events = await api.hacker.getEvents();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {events.map((event) => {
                const date = new Date(event.date);
                const startTime = new Date(event.starttime);
                const endTime = new Date(event.endtime);
                
                // Define an image map with index signature
                const imageMap: Record<string, string> = {
                    "KnightHacks VIII": "/images/knighthacks.png",
                    "Bitcamp": "/images/bitcamp.png",
                    "ShellHacks": "/images/shellhacks.png"
                };

                const imageSrc = imageMap[event.name] ?? "/images/kmodoL.svg"; // Default fallback

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
                                <div className="flex mb-10 ">
                                    <div className="flex justify-center w-full">
                                        <Button className="mt-11 bg-accent text-destructive-foreground hover:bg-destructive-foreground hover:text-accent">
                                            Register
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