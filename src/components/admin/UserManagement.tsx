"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { allowedUserIds } from "~/consts/goat";
import { Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { useSession } from "next-auth/react";

export function UserManagement() {
  const [search, setSearch] = useState("");
  
  // Get current user session
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  
  const { data: users, isLoading, refetch } = api.admin.getAllUsers.useQuery(
    { search },
    { enabled: true }
  );
  
  const deleteUserMutation = api.admin.deleteUser.useMutation({
    onSuccess: () => {
      toast.success("User deleted successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
  });
  
  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete user ${userName}? This action cannot be undone and will permanently remove the user and all their data.`)) {
      deleteUserMutation.mutate({ userId });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-1.5">
        <h2 className="text-3xl font-bold tracking-tight text-[#59BC89]">User Management</h2>
        <p className="text-[#D9DBF1] font-['Open Sans'] font-light">Manage and delete user accounts from the platform.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#9E9BA8]" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full bg-[#2D2647] border-[#4264AC] text-white placeholder:text-[#9E9BA8]"
          />
        </div>
      </div>
      
      <Card className="border-transparent bg-[#2D2647] text-white shadow-xl">
        <CardHeader className="bg-[#32324E]">
          <CardTitle className="text-[#59BC89]">Users</CardTitle>
          <CardDescription className="text-[#D9DBF1] font-['Open Sans']">
            View all registered users and manage their accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#59BC89]"></div>
            </div>
          ) : users && users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#32324E] hover:bg-[#32324E]">
                  <TableHead className="text-[#D9DBF1]">Name</TableHead>
                  <TableHead className="text-[#D9DBF1]">ID</TableHead>
                  <TableHead className="text-[#D9DBF1]">Email Verified</TableHead>
                  <TableHead className="text-[#D9DBF1] text-center">Role</TableHead>
                  <TableHead className="text-right text-[#D9DBF1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-white/5">
                    <TableCell className="font-medium text-white">
                      {user.name ?? "No name"}
                      <div className="text-xs text-gray-400">{user.email ?? "No email"}</div>
                    </TableCell>
                    <TableCell className="text-white">
                      {user.id}
                    </TableCell>
                    <TableCell className="text-white">
                      {user.emailVerified ? new Date(user.emailVerified).toLocaleString() : "Not verified"}
                    </TableCell>
                    <TableCell className="text-white text-center">
                      {allowedUserIds.has(user.id) && (
                        <Badge variant="default" className="bg-green-600">Admin</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {allowedUserIds.has(user.id) || user.id === currentUserId ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-600/50 hover:bg-red-700/50 text-white cursor-not-allowed opacity-50"
                                disabled={true}
                              >
                                Delete User
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cannot delete admin users or yourself</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.name ?? user.email ?? user.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          disabled={deleteUserMutation.isPending}
                        >
                          {deleteUserMutation.isPending && deleteUserMutation.variables?.userId === user.id ? (
                            <>
                              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                              Deleting...
                            </>
                          ) : (
                            "Delete User"
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 px-4">
              <p className="text-[#D9DBF1] font-['Open Sans']">No users found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between py-4 border-t border-[#4264AC]/30">
          <p className="text-sm text-[#D9DBF1] font-['Open Sans']">
            {users?.length ?? 0} users found
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 