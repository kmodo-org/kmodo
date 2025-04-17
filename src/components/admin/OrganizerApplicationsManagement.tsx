"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

export function OrganizerApplicationsManagement() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [adminNotes, setAdminNotes] = useState<Record<number, string>>({});
  
  // Query to fetch all applications based on status
  const { data: applications, isLoading, refetch } = api.admin.getAllOrganizerApplications.useQuery(
    { status: activeTab as "pending" | "approved" | "rejected" },
    { enabled: true }
  );
  
  // Mutations for approving/rejecting applications
  const updateApplicationMutation = api.admin.updateOrganizerApplication.useMutation({
    onSuccess: (data) => {
      console.log("Application update successful:", data);
      toast.success("Application status updated");
      void refetch();
    },
    onError: (error) => {
      console.error("Application update failed:", error);
      toast.error(`Failed to update application: ${error.message}`);
    },
  });
  
  // Add delete application mutation
  const deleteApplicationMutation = api.admin.deleteOrganizerApplication.useMutation({
    onSuccess: () => {
      toast.success("Application deleted successfully");
      void refetch();
    },
    onError: (error) => {
      console.error("Application deletion failed:", error);
      toast.error(`Failed to delete application: ${error.message}`);
    },
  });
  
  // Handler for approving an application
  const handleApprove = (applicationId: number) => {
    if (confirm("Are you sure you want to approve this application? The user will be granted organizer access.")) {
      console.log("Approving application:", applicationId);
      try {
        updateApplicationMutation.mutate({
          applicationId,
          status: "approved",
          adminNotes: adminNotes[applicationId] || undefined
        });
      } catch (error) {
        console.error("Error in handleApprove:", error);
      }
    }
  };
  
  // Handler for rejecting an application
  const handleReject = (applicationId: number) => {
    if (confirm("Are you sure you want to reject this application?")) {
      console.log("Rejecting application:", applicationId);
      try {
        updateApplicationMutation.mutate({
          applicationId,
          status: "rejected",
          adminNotes: adminNotes[applicationId] || undefined
        });
      } catch (error) {
        console.error("Error in handleReject:", error);
      }
    }
  };
  
  // Handler for deleting an application
  const handleDelete = (applicationId: number) => {
    if (confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      try {
        deleteApplicationMutation.mutate({ applicationId });
      } catch (error) {
        console.error("Error in handleDelete:", error);
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight text-[#59BC89]">Organizer Applications</h2>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">
          Review and manage applications from users who want to become organizers.
        </p>
      </div>
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#2D2647]">
          <TabsTrigger value="pending" className="data-[state=active]:bg-[#4264AC] data-[state=active]:text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-[#4264AC] data-[state=active]:text-white">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-[#4264AC] data-[state=active]:text-white">
            Rejected
          </TabsTrigger>
        </TabsList>
        
        {["pending", "approved", "rejected"].map((status) => (
          <TabsContent key={status} value={status}>
            <Card className="border-transparent bg-[#2D2647] text-white shadow-xl">
              <CardHeader className="bg-[#32324E]">
                <CardTitle className="text-[#59BC89]">
                  {status.charAt(0).toUpperCase() + status.slice(1)} Applications
                </CardTitle>
                <CardDescription className="text-[#D9DBF1] font-['Open Sans']">
                  {status === "pending" && "Applications awaiting your review."}
                  {status === "approved" && "Applications you have approved."}
                  {status === "rejected" && "Applications you have rejected."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#59BC89]"></div>
                  </div>
                ) : applications && applications.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#32324E] hover:bg-[#32324E]">
                          <TableHead className="text-[#D9DBF1]">Applicant</TableHead>
                          <TableHead className="text-[#D9DBF1]">Organization</TableHead>
                          <TableHead className="text-[#D9DBF1]">Target Days</TableHead>
                          <TableHead className="text-[#D9DBF1]">Details</TableHead>
                          {status === "pending" && <TableHead className="text-[#D9DBF1]">Admin Notes</TableHead>}
                          <TableHead className="text-right text-[#D9DBF1]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((item) => (
                          <TableRow key={item.application.id} className="hover:bg-[#32324E]/50 border-b border-[#4264AC]/30">
                            <TableCell className="font-medium text-white">
                              {item.hacker?.firstname} {item.hacker?.lastname}
                              <div className="text-xs text-gray-400">{item.hacker?.eduemail}</div>
                            </TableCell>
                            <TableCell className="text-white">
                              {item.application.organization}
                            </TableCell>
                            <TableCell className="text-white">
                              {item.application.target_days}
                            </TableCell>
                            <TableCell className="text-white">
                              <Badge 
                                className="cursor-pointer"
                                onClick={() => {
                                  alert(`
Organization: ${item.application.organization || "Not specified"}

Target Days: ${item.application.target_days || "Not specified"}

${item.event ? `Event: ${item.event.name} (${item.event.school})` : 'No specific event'}

${item.application.availability ? `Availability: ${item.application.availability}` : 'Availability not specified'}

Additional Info: ${item.application.additional_info || "None provided"}
                                  `);
                                }}
                              >
                                View Details
                              </Badge>
                            </TableCell>
                            
                            {status === "pending" ? (
                              <>
                                <TableCell>
                                  <Textarea
                                    placeholder="Add notes about this application"
                                    value={adminNotes[item.application.id] || ""}
                                    onChange={(e) => 
                                      setAdminNotes({
                                        ...adminNotes,
                                        [item.application.id]: e.target.value
                                      })
                                    }
                                    className="min-h-[80px] text-black"
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex flex-col space-y-2">
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => handleApprove(item.application.id)}
                                      className="bg-green-600 hover:bg-green-700 text-white border-none"
                                      disabled={updateApplicationMutation.isPending}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleReject(item.application.id)}
                                      className="bg-red-600 hover:bg-red-700 text-white border-none"
                                      disabled={updateApplicationMutation.isPending}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            ) : (
                              <TableCell className="text-right">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(item.application.id)}
                                  className="bg-red-600 hover:bg-red-700 text-white border-none"
                                  disabled={deleteApplicationMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <p className="text-[#D9DBF1] font-['Open Sans']">
                      No {status} applications found.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 