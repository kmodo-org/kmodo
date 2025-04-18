"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserManagement } from "~/components/admin/UserManagement";
import { EventManagement } from "~/components/admin/EventManagement";
import { OrganizerApplicationsManagement } from "~/components/admin/OrganizerApplicationsManagement";
import { SupportTicketManagement } from "~/components/admin/supportTicketManagement";
import { Button } from "~/components/ui/button";

export function AdminDashboard() {
  const [, setActiveTab] = useState("users");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleCheeseClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.style.display = "none";
      } else {
        videoRef.current.style.display = "block";
        void videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Hide video initially
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#59BC89]">Admin Dashboard</h1>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">
          Comprehensive tools to manage users, events, and platform settings.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Button 
          onClick={handleCheeseClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          {isPlaying ? "Stop Cheese" : "Cheese"}
        </Button>
        
        <div className="mt-6 rounded-lg overflow-hidden shadow-xl">
          <video 
            ref={videoRef}
            src="/images/spinning-food-spinny-food.mp4" 
            width="400"
            height="400"
            autoPlay
            muted
            loop
            controls
            className="rounded-lg"
          />
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-[#2D2647]">
          <TabsTrigger value="users" className="data-[state=active]:bg-[#59BC89] data-[state=active]:text-white">Users</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-[#59BC89] data-[state=active]:text-white">Events</TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-[#59BC89] data-[state=active]:text-white">Applications</TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-[#59BC89] data-[state=active]:text-white">Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="events">
          <EventManagement />
        </TabsContent>
        
        <TabsContent value="applications">
          <OrganizerApplicationsManagement />
        </TabsContent>

        <TabsContent value="support">
          <SupportTicketManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
} 