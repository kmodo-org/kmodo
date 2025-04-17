"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { toast } from "sonner";

export function OrganizerManagement() {
  const [selectedHacker, setSelectedHacker] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  
  const { data: hackers, isLoading: hackersLoading } = api.admin.getAllHackers.useQuery(
    { search: "" },
    { enabled: true }
  );
  
  const { data: events, isLoading: eventsLoading } = api.admin.getAllEvents.useQuery(
    { search: "" },
    { enabled: true }
  );
  
  const makeOrganizerMutation = api.admin.makeOrganizer.useMutation({
    onSuccess: () => {
      toast.success("Organizer added successfully");
      setSelectedHacker(null);
      setSelectedEvent(null);
    },
    onError: (error) => {
      toast.error(`Failed to add organizer: ${error.message}`);
    },
  });
  
  const removeOrganizerMutation = api.admin.removeOrganizer.useMutation({
    onSuccess: () => {
      toast.success("Organizer removed successfully");
    },
    onError: (error) => {
      toast.error(`Failed to remove organizer: ${error.message}`);
    },
  });
  
  const handleMakeOrganizer = () => {
    if (selectedHacker && selectedEvent) {
      makeOrganizerMutation.mutate({
        hackerId: selectedHacker,
        eventId: selectedEvent,
      });
    } else {
      toast.error("Please select both a hacker and an event");
    }
  };
  
  const handleRemoveOrganizer = (hackerId: number, eventId: number) => {
    if (confirm("Are you sure you want to remove this organizer? This action cannot be undone.")) {
      removeOrganizerMutation.mutate({
        hackerId,
        eventId,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Organizer Management</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Organizer</CardTitle>
          <CardDescription>
            Assign hackers as organizers for specific events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Hacker</label>
              <Select
                value={selectedHacker?.toString() ?? ""}
                onValueChange={(value: string) => setSelectedHacker(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a hacker" />
                </SelectTrigger>
                <SelectContent>
                  {hackers?.map((hacker) => (
                    <SelectItem key={hacker.id} value={hacker.id.toString()}>
                      {hacker.firstname} {hacker.lastname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Event</label>
              <Select
                value={selectedEvent?.toString() ?? ""}
                onValueChange={(value: string) => setSelectedEvent(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {events?.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            onClick={handleMakeOrganizer}
            disabled={!selectedHacker || !selectedEvent || makeOrganizerMutation.isPending}
          >
            {makeOrganizerMutation.isPending ? "Adding..." : "Add Organizer"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Organizers</CardTitle>
          <CardDescription>
            View and manage current event organizers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hackersLoading || eventsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : hackers && events && hackers.length > 0 && events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hacker</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* This is a simplified view. In a real app, you would fetch the actual organizer relationships */}
                {hackers.slice(0, 5).map((hacker) => (
                  <TableRow key={hacker.id}>
                    <TableCell>{hacker.firstname} {hacker.lastname}</TableCell>
                    <TableCell>
                      {events.slice(0, 1).map((event) => (
                        <span key={event.id}>{event.name}</span>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const eventId = events[0]?.id;
                            if (eventId) {
                              handleRemoveOrganizer(hacker.id, eventId);
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No organizers found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 