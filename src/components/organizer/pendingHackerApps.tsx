'use client'

import { useState } from 'react';
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'date-fns';

export function PendingHackerApps() {
  const { data: applications, isLoading, refetch } = api.hacker.getAllHackathonApplications.useQuery();
  const [pendingActions, setPendingActions] = useState<Record<string, boolean>>({});
  
  const updateStatusMutation = api.hacker.updateHackathonApplicationStatus.useMutation({
    onSuccess: async () => {
      toast.success("Application status updated successfully", {
        autoClose: 3000,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      await refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update application status", {
        autoClose: 3000,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onSettled: () => {
      setPendingActions({});
    }
  });

  const handleStatusUpdate = async (applicationId: number, status: "pending" | "accepted" | "rejected") => {
    try {
      const actionKey = `${applicationId}-${status}`;
      setPendingActions(prev => ({ ...prev, [actionKey]: true }));
      await updateStatusMutation.mutateAsync({ applicationId, status });
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const isActionPending = (applicationId: number, action: "pending" | "accepted" | "rejected") => {
    return pendingActions[`${applicationId}-${action}`] === true;
  };

  if (isLoading) return <div>Loading applications...</div>;
  if (!applications || applications.length === 0) {
    return (
      <>
        <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
          <h2 className="text-xl font-semibold mb-4">Pending Hacker Applications</h2>
          <p className="opacity-70 text-sm">
            No hackathon applications found.
          </p>
        </div>
      </>
    );
  }

  // Filter applications by status
  const pendingApplications = applications.filter(app => app.status === "pending");
  const acceptedApplications = applications.filter(app => app.status === "accepted");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  return (
    <>
      <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 className="text-xl font-semibold mb-4">Hackathon Applications</h2>
        
        {/* Pending Applications */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Pending Applications ({pendingApplications.length})</h3>
          {pendingApplications.length === 0 ? (
            <p className="opacity-70 text-sm">No pending applications</p>
          ) : (
            <ScrollArea className="h-[300px] rounded-md p-4">
              <div className="space-y-4">
                {pendingApplications.map((app) => (
                  <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onAccept={() => handleStatusUpdate(app.id, "accepted")}
                    onReject={() => handleStatusUpdate(app.id, "rejected")}
                    isAcceptPending={isActionPending(app.id, "accepted")}
                    isRejectPending={isActionPending(app.id, "rejected")}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        
        {/* Accepted Applications */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Accepted Applications ({acceptedApplications.length})</h3>
          {acceptedApplications.length === 0 ? (
            <p className="opacity-70 text-sm">No accepted applications</p>
          ) : (
            <ScrollArea className="h-[300px] rounded-md p-4">
              <div className="space-y-4">
                {acceptedApplications.map((app) => (
                  <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onReject={() => handleStatusUpdate(app.id, "rejected")}
                    onPending={() => handleStatusUpdate(app.id, "pending")}
                    isRejectPending={isActionPending(app.id, "rejected")}
                    isPendingPending={isActionPending(app.id, "pending")}
                    showActions={true}
                    actionType="accepted"
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        
        {/* Rejected Applications */}
        <div>
          <h3 className="text-lg font-medium mb-2">Rejected Applications ({rejectedApplications.length})</h3>
          {rejectedApplications.length === 0 ? (
            <p className="opacity-70 text-sm">No rejected applications</p>
          ) : (
            <ScrollArea className="h-[300px] rounded-md p-4">
              <div className="space-y-4">
                {rejectedApplications.map((app) => (
                  <ApplicationCard 
                    key={app.id} 
                    application={app} 
                    onAccept={() => handleStatusUpdate(app.id, "accepted")}
                    onPending={() => handleStatusUpdate(app.id, "pending")}
                    isAcceptPending={isActionPending(app.id, "accepted")}
                    isPendingPending={isActionPending(app.id, "pending")}
                    showActions={true}
                    actionType="rejected"
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </>
  );
}

interface ApplicationCardProps {
  application: {
    id: number;
    status: string;
    createdAt: Date;
    hacker: {
      id: number;
      firstname: string;
      lastname: string;
      eduemail: string;
      university: string;
    } | null;
    event: {
      id: number;
      name: string;
      date: string;
      school: string;
    } | null;
  };
  onAccept?: () => void;
  onReject?: () => void;
  onPending?: () => void;
  isAcceptPending?: boolean;
  isRejectPending?: boolean;
  isPendingPending?: boolean;
  showActions?: boolean;
  actionType?: "pending" | "accepted" | "rejected";
}

function ApplicationCard({ 
  application, 
  onAccept, 
  onReject,
  onPending,
  isAcceptPending = false,
  isRejectPending = false,
  isPendingPending = false,
  showActions = true,
  actionType = "pending"
}: ApplicationCardProps) {
  const formattedDate = format(new Date(application.createdAt), 'MMM d, yyyy h:mm a');
  const eventDate = application.event ? format(new Date(application.event.date), 'MMM d, yyyy') : 'Date not available';
  
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          {application.hacker ? (
            <>
              <h4 className="font-medium">{application.hacker.firstname} {application.hacker.lastname}</h4>
              <p className="text-sm opacity-70">{application.hacker.eduemail}</p>
              <p className="text-sm opacity-70">{application.hacker.university}</p>
            </>
          ) : (
            <p className="text-sm opacity-70">Hacker information not available</p>
          )}
        </div>
        <div className="text-right">
          {application.event ? (
            <>
              <p className="font-medium">{application.event.name}</p>
              <p className="text-sm opacity-70">{application.event.school}</p>
              <p className="text-sm opacity-70">{eventDate}</p>
            </>
          ) : (
            <p className="text-sm opacity-70">Event information not available</p>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs opacity-60">
        Applied on {formattedDate}
      </div>
      
      {showActions && (
        <div className="mt-4 flex gap-2">
          {actionType === "pending" && (
            <>
              <Button 
                onClick={onAccept} 
                disabled={isAcceptPending || isRejectPending}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isAcceptPending ? 'Processing...' : 'Accept'}
              </Button>
              <Button 
                onClick={onReject} 
                disabled={isAcceptPending || isRejectPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isRejectPending ? 'Processing...' : 'Reject'}
              </Button>
            </>
          )}
          
          {actionType === "accepted" && (
            <>
              <Button 
                onClick={onReject} 
                disabled={isRejectPending || isPendingPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isRejectPending ? 'Processing...' : 'Reject'}
              </Button>
              <Button 
                onClick={onPending} 
                disabled={isRejectPending || isPendingPending}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {isPendingPending ? 'Processing...' : 'Mark as Pending'}
              </Button>
            </>
          )}
          
          {actionType === "rejected" && (
            <>
              <Button 
                onClick={onAccept} 
                disabled={isAcceptPending || isPendingPending}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isAcceptPending ? 'Processing...' : 'Accept'}
              </Button>
              <Button 
                onClick={onPending} 
                disabled={isAcceptPending || isPendingPending}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {isPendingPending ? 'Processing...' : 'Mark as Pending'}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}