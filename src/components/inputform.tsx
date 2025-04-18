"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const hackerFormSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required." }),
  middlename: z.string().optional().or(z.literal("")),
  lastname: z.string().min(1, { message: "Last name is required." }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Birthdate must be YYYY-MM-DD." }),
  eduemail: z.string().email({ message: "Invalid email address." }),
  graduation: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Graduation date must be YYYY-MM-DD." }),
  university: z.string().min(1, { message: "University is required." }),
  phone: z.string().regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  address: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  race: z.string().optional().or(z.literal("")),
  github: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
  personalwebsite: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
  tosAgreement: z.number().min(1, { message: "You must agree to the Terms of Service." })
});

export function InputForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof hackerFormSchema>>({
    resolver: zodResolver(hackerFormSchema),
    defaultValues: {
      firstname: "",
      middlename: undefined,
      lastname: "",
      birthdate: "",
      eduemail: "",
      graduation: "",
      university: "",
      phone: "",
      address: undefined,
      gender: undefined,
      race: undefined,
      github: undefined,
      linkedin: undefined,
      personalwebsite: undefined,
      tosAgreement: 0 
    }
  });

  const createHacker = api.hacker.createHacker.useMutation({
    onSuccess: () => {
      router.push("/hacker");
    }
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
      <div className="mb-6">
        <p className="text-base text-gray-700 mb-2">
          <i>Fill out this form to begin hacking with Kmodo!</i>
        </p>
        <p className="text-sm text-gray-600">
          Please complete all required fields. Fields marked as optional can be left blank.
        </p>
      </div>
  
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
                  <FormLabel className="font-medium text-gray-800">{label}{!optional && <span className="text-red-500 ml-1">*</span>}</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...field}
                      value={typeof field.value === "boolean" ? "" : field.value}
                      className="border-2 rounded-md p-2 shadow-md text-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}
          
          <FormField
            control={form.control}
            name="tosAgreement"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value === 1}
                    onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                </FormControl>
                <FormLabel className="text-sm m-0 translate-y-[-4px] text-gray-700">
                  I agree to the{" "}
                  <a href="/tos" className="text-[#59BC89] underline">
                    Terms of Service
                  </a>
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mt-6 text-sm text-gray-700">
            <p>Fields marked with <span className="text-red-500">*</span> are required</p>
          </div>

          <Button
            type="submit"
            disabled={form.watch("tosAgreement") !== 1 || form.formState.isSubmitting} 
            className="w-full text-[#59BC89] bg-[#111111] disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
