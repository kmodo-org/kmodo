"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

export function SupportTicketManagement() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"open" | "in_progress" | "closed" | "all">("all");
  const [selectedType, setSelectedType] = useState<"organizer" | "hacker" | "all">("all");
  const [adminResponse, setAdminResponse] = useState<Record<number, string>>({});

  const { data: tickets, isLoading, refetch } = api.support.getAll.useQuery(
    { 
      search,
      status: selectedStatus === "all" ? undefined : selectedStatus,
      type: selectedType === "all" ? undefined : selectedType,
    },
    { enabled: true }
  );

  const updateStatusMutation = api.support.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Ticket status updated successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update ticket status: ${error.message}`);
    },
  });

  const deleteTicketMutation = api.support.delete.useMutation({
    onSuccess: () => {
      toast.success("Ticket deleted successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete ticket: ${error.message}`);
    },
  });

  const handleStatusUpdate = (ticketId: number, status: "open" | "in_progress" | "closed") => {
    updateStatusMutation.mutate({
      ticketId,
      status,
      adminResponse: adminResponse[ticketId],
    });
    setAdminResponse((prev) => {
      const newState = { ...prev };
      delete newState[ticketId];
      return newState;
    });
  };

  const handleDeleteTicket = (ticketId: number) => {
    if (confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
      deleteTicketMutation.mutate({ ticketId });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-yellow-500";
      case "in_progress":
        return "bg-blue-500";
      case "closed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "organizer":
        return "bg-red-500";
      case "hacker":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight text-[#59BC89]">Support Tickets</h2>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">
          Manage and respond to user support tickets.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9E9BA8]" />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full bg-[#2D2647] border-[#4264AC] text-white placeholder:text-[#9E9BA8] focus-visible:ring-[#59BC89]"
          />
        </div>

        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value as "open" | "in_progress" | "closed" | "all")}
        >
          <SelectTrigger className="w-[180px] bg-[#2D2647] border-[#4264AC] text-white focus:ring-[#59BC89]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as "organizer" | "hacker" | "all")}
        >
          <SelectTrigger className="w-[180px] bg-[#2D2647] border-[#4264AC] text-white focus:ring-[#59BC89]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
            <SelectItem value="hacker">Hacker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-transparent bg-[#2D2647] text-white shadow-xl">
        <CardHeader className="bg-[#32324E]">
          <CardTitle className="text-[#59BC89]">Support Tickets</CardTitle>
          <CardDescription className="text-[#D9DBF1] font-['Open Sans']">
            View and manage all support tickets from users.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#59BC89]"></div>
            </div>
          ) : tickets && tickets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#32324E] hover:bg-[#32324E]">
                  <TableHead className="text-[#D9DBF1]">Title</TableHead>
                  <TableHead className="text-[#D9DBF1]">Type</TableHead>
                  <TableHead className="text-[#D9DBF1]">Status</TableHead>
                  <TableHead className="text-[#D9DBF1]">Created</TableHead>
                  <TableHead className="text-[#D9DBF1]">Response</TableHead>
                  <TableHead className="text-right text-[#D9DBF1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-white/5">
                    <TableCell className="font-medium text-white">
                      {ticket.title}
                      <div className="text-xs text-gray-400">{ticket.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTypeColor(ticket.type)}`}>
                        {ticket.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-md">
                      {ticket.status === "in_progress" ? (
                        <Textarea
                          placeholder="Admin response..."
                          value={adminResponse[ticket.id] ?? ticket.adminResponse ?? ""}
                          onChange={(e) => 
                            setAdminResponse((prev) => ({
                              ...prev,
                              [ticket.id]: e.target.value,
                            }))
                          }
                          className="bg-[#2D2647] border-[#4264AC] text-white min-h-[100px] focus-visible:ring-[#59BC89]"
                        />
                      ) : ticket.adminResponse ? (
                        <div className="text-white whitespace-pre-wrap">{ticket.adminResponse}</div>
                      ) : (
                        <div className="text-gray-400 italic">No response yet</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-y-2">
                      {ticket.status !== "closed" && (
                        <>
                          {ticket.status === "open" && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(ticket.id, "in_progress")}
                              className="w-full bg-[#59BC89] hover:bg-[#59BC89]/80 text-white"
                              disabled={updateStatusMutation.isPending}
                            >
                              Start
                            </Button>
                          )}
                          {ticket.status === "in_progress" && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(ticket.id, "closed")}
                              className="w-full bg-[#59BC89] hover:bg-[#59BC89]/80 text-white"
                              disabled={updateStatusMutation.isPending}
                            >
                              Close
                            </Button>
                          )}
                        </>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white"
                        disabled={deleteTicketMutation.isPending}
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
              <p className="text-[#D9DBF1] font-['Open Sans']">
                No support tickets found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between py-4 border-t border-[#4264AC]/30">
          <p className="text-sm text-[#D9DBF1] font-['Open Sans']">
            {tickets?.length ?? 0} tickets found
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 