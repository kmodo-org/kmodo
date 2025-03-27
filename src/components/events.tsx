import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Mock database query function (replace with your actual database query)
async function getEvents() {
    return [
        { id: 1, title: "Event 1", description: "Description for Event 1" },
        { id: 2, title: "Event 2", description: "Description for Event 2" },
        { id: 3, title: "Event 3", description: "Description for Event 3" },
        { id: 4, title: "Event 4", description: "Description for Event 4" },
        { id: 5, title: "Event 5", description: "Description for Event 5" },
    ];
}

export default async function Events() {
    const events = await getEvents();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {events.map((event) => (
                <Card key={event.id} className="bg-card">
                    <div className="p-6">
                        <CardHeader className="items-center">
                            <CardTitle className="mb-2 items-center">
                                {event.title}
                            </CardTitle>
                            <CardDescription>
                                {event.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Additional content for the event can go here */}
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
}