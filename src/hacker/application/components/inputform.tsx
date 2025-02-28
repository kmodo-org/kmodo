"use client"; // This component uses client-side interactivity

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";

const hackerFormSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required." }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: "Last name is required." }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Birthdate must be YYYY-MM-DD.",
  }),
  eduemail: z.string().email({ message: "Invalid email address." }),
  graduation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Graduation date must be YYYY-MM-DD.",
  }),
  university: z.string().min(1, { message: "University is required." }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits.",
  }),
  address: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  github: z.string().url({ message: "Invalid URL." }).optional(),
  linkedin: z.string().url({ message: "Invalid URL." }).optional(),
  personalwebsite: z.string()
    .url({ message: "Invalid URL." })
    .optional(),
});

export function InputForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof hackerFormSchema>>({
    resolver: zodResolver(hackerFormSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      birthdate: "",
      eduemail: "",
      graduation: "",
      university: "",
      phone: "",
      address: "",
      gender: "",
      race: "",
      github: "",
      linkedin: "",
      personalwebsite: "",
    },
  });

  const createHacker = api.hacker.createHacker.useMutation({
    onSuccess: () => {
      router.push("/dashboard"); 
    },
    onError: (error: TRPCClientError<any>) => {
      alert("Failed to create hacker profile. Please try again.");
    },
  });

  const onSubmit = async (values: z.infer<typeof hackerFormSchema>) => { 
    try {
      await createHacker.mutateAsync({
        ...values,
        birthdate: new Date(values.birthdate),
        graduation: new Date(values.graduation),
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="middlename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthdate</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eduemail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edu Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@university.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="graduation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduation Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input placeholder="Example University" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Male/Female/Other" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Race</FormLabel>
              <FormControl>
                <Input placeholder="Race" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalwebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourwebsite.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}