"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/app/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { TRPCClientErrorLike } from "@trpc/client";

const hackerFormSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required." }),
  middlename: z.string().optional(),
  lastname: z.string().min(1, { message: "Last name is required." }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Birthdate must be YYYY-MM-DD." }),
  eduemail: z.string().email({ message: "Invalid email address." }),
  graduation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Graduation date must be YYYY-MM-DD." }),
  university: z.string().min(1, { message: "University is required." }),
  phone: z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  address: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  github: z.string().url({ message: "Invalid URL." }).optional(),
  linkedin: z.string().url({ message: "Invalid URL." }).optional(),
  personalwebsite: z.string().url({ message: "Invalid URL." }).optional(),
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
    onError: (error: TRPCClientErrorLike<any>) => {
      alert(`Failed to create hacker profile: ${error.message}`);
    },
  });

  const onSubmit = async (values: z.infer<typeof hackerFormSchema>) => { 
    try {
      const user_Id = "some_user_id"; 
      await createHacker.mutateAsync({ ...values, user_Id });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-[#59BC89]">Hacker Application Form</h1>
      <p className="text-sm text-gray-500">
        <i>Fill out this form to begin hacking with Kmodo!</i>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {[
            { name: "firstname", label: "First Name", placeholder: "John" },
            { name: "middlename", label: "Middle Name (optional)", placeholder: "Doe", optional: true },
            { name: "lastname", label: "Last Name", placeholder: "Smith" },
            { name: "birthdate", label: "Birthdate", type: "date" },
            { name: "eduemail", label: "Edu Email", placeholder: "john.doe@university.edu" },
            { name: "graduation", label: "Graduation Date", type: "date" },
            { name: "university", label: "University", placeholder: "Example University" },
            { name: "phone", label: "Phone", placeholder: "+1234567890" },
            { name: "address", label: "Address (optional)", placeholder: "123 Main St", optional: true },
            { name: "gender", label: "Gender (optional)", placeholder: "Gender identity (e.g., Male, Female, Non-binary, Agender, etc.)", optional: true },
            { name: "race", label: "Race (optional)", placeholder: "Race", optional: true },
            { name: "github", label: "GitHub (optional)", placeholder: "https://github.com/username", optional: true },
            { name: "linkedin", label: "LinkedIn (optional)", placeholder: "https://linkedin.com/in/username", optional: true },
            { name: "personalwebsite", label: "Personal Website (optional)", placeholder: "https://yourwebsite.com", optional: true },
          ].map(({ name, label, placeholder, type = "text", optional = false }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof hackerFormSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input type={type} placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="w-full text-[#59BC89] bg-white">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
