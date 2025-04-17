"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { useEffect, useCallback } from "react";

const organizerApplicationForm = z.object({
  organization: z.string().min(3, { message: "Please enter the organization you are a part of." }),
  targetDays: z.string().min(3, { message: "Please specify your target days for the hackathon." }),
  additionalInfo: z.string().optional(),
});

export default function OrganizerApplicationForm() {
  const router = useRouter();

  // Create callback for handling already applied status
  const handleAlreadyApplied = useCallback((hasApplied: boolean) => {
    if (hasApplied) {
      toast.info("You have already submitted an application.");
      router.push("/hacker");
    }
  }, [router]);

  // Get the current hacker profile information
  const { data: hackerProfile, isLoading: hackerLoading } = api.hacker.getHackerProfile.useQuery();
  
  // Check if user has already applied
  const { data: hasApplied, isLoading: checkingApplication } = api.hacker.hasAppliedToOrganize.useQuery();
  
  // Handle redirect if user has already applied
  useEffect(() => {
    if (hasApplied) {
      handleAlreadyApplied(hasApplied);
    }
  }, [hasApplied, handleAlreadyApplied]);

  const form = useForm<z.infer<typeof organizerApplicationForm>>({
    resolver: zodResolver(organizerApplicationForm),
    defaultValues: {
      organization: "",
      targetDays: "",
      additionalInfo: "",
    },
  });

  // Update loading state to include application check
  const isLoading = hackerLoading || checkingApplication;

  const applyToOrganize = api.hacker.applyToOrganize.useMutation({
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      router.push("/hacker");
    },
    onError: (error) => {
      toast.error(`Application failed: ${error.message}`);
    }
  });

  const onSubmit = async (values: z.infer<typeof organizerApplicationForm>) => {
    try {
      await applyToOrganize.mutateAsync({
        organization: values.organization,
        target_days: values.targetDays,
        additional_info: values.additionalInfo ?? null,
      });
    } catch (err) {
      console.error("Application failed:", err);
    }
  };

  return (
    <div className="mt-4 p-6 max-w-2xl mx-auto bg-Lavender shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-2 pt-2 text-Mint">Apply to Organize</h1>
      <p className="text-sm text-gray-500 mb-4">
        <i>Apply to be an organizer for a hackathon. Applications are reviewed by admins.</i>
      </p>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-Mint"></div>
        </div>
      ) : (
        <>
          {/* Display hacker information for reference */}
          {hackerProfile && (
            <Card className="mb-6 bg-[#f5f5f5] shadow-sm">
              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold mb-2 text-SpaceCadet">Your Hacker Profile</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {hackerProfile.firstname} {hackerProfile.lastname}
                  </div>
                  <div>
                    <span className="font-medium">University:</span> {hackerProfile.university}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {hackerProfile.eduemail}
                  </div>
                  <div>
                    <span className="font-medium">Graduation:</span> {new Date(hackerProfile.graduation).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-SpaceCadet space-y-6">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What organization are you a part of?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Computer Science Club, IEEE Student Branch, etc."
                        className="border-RoseQuartz"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your target days for the hackathon?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Friday evening and Saturday morning"
                        className="border-RoseQuartz"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Anything else you'd like us to know?" 
                        className="min-h-[80px] border-RoseQuartz"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full text-Mint bg-SpaceCadet font-bold"
                disabled={applyToOrganize.isPending}
              >
                {applyToOrganize.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
