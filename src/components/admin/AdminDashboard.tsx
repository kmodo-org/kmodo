"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserManagement } from "~/components/admin/UserManagement";
import { EventManagement } from "~/components/admin/EventManagement";

export function AdminDashboard() {
  const [, setActiveTab] = useState("users");

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#59BC89]">Admin Dashboard</h1>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">
          Comprehensive tools to manage users, events, and platform settings.
        </p>
      </div>

      <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#2D2647]">
          <TabsTrigger value="users" className="data-[state=active]:bg-[#4264AC] data-[state=active]:text-white">Users</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-[#4264AC] data-[state=active]:text-white">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="events">
          <EventManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
} 