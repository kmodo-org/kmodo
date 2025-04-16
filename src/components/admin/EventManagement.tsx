"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search } from "lucide-react";

// Define event type
type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  school: string;
};

export function EventManagement() {
  const [search, setSearch] = useState("");
  
  // Events
  const { data: events, isLoading: eventsLoading, refetch: refetchEvents, error: eventsError } = api.admin.getAllEvents.useQuery(
    { search },
    { 
      enabled: true,
      retry: 1
    }
  );
  
  // Event mutations
  const deleteEventMutation = api.admin.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success("Event deleted successfully");
      void refetchEvents();
    },
    onError: (error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    },
  });
  
  // Event handlers
  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      deleteEventMutation.mutate({ id: eventId });
    }
  };
  
  // If there's an error loading events, show an error message
  if (eventsError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Events</h2>
        <p className="text-[#D9DBF1]">
          There was a problem loading the events. This might be due to a network issue or an authentication problem.
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-[#59BC89] hover:bg-[#59BC89]/80 text-white"
        >
          Refresh Page
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight text-[#59BC89]">Event Management</h2>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">Manage hackathon events on the platform.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9E9BA8]" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full bg-[#2D2647] border-[#4264AC] text-white placeholder:text-[#9E9BA8]"
          />
        </div>
      </div>
      
      <Card className="border-transparent bg-[#2D2647] text-white shadow-xl">
        <CardHeader className="bg-[#32324E]">
          <CardTitle className="text-[#59BC89]">Events</CardTitle>
          <CardDescription className="text-[#D9DBF1] font-['Open Sans']">
            View and manage all hackathon events.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#59BC89]"></div>
            </div>
          ) : events && events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#32324E] hover:bg-[#32324E]">
                  <TableHead className="text-[#D9DBF1]">Name</TableHead>
                  <TableHead className="text-[#D9DBF1]">Date</TableHead>
                  <TableHead className="text-[#D9DBF1]">Location</TableHead>
                  <TableHead className="text-[#D9DBF1]">School</TableHead>
                  <TableHead className="text-right text-[#D9DBF1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id} className="hover:bg-[#32324E]/50 border-b border-[#4264AC]/30">
                    <TableCell className="font-medium text-white">{event.name}</TableCell>
                    <TableCell className="text-white">
                      {format(new Date(event.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-white">{event.location}</TableCell>
                    <TableCell className="text-white">{event.school}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-red-600 hover:bg-red-700 text-white border-none"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 px-4">
              <p className="text-[#D9DBF1] font-['Open Sans']">No events found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between py-4 border-t border-[#4264AC]/30">
          <p className="text-sm text-[#D9DBF1] font-['Open Sans']">
            {events?.length ?? 0} events found
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 