"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { insertUser } from "@/lib/data/user";
import { toast } from "sonner";



const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  user_email: z.string().email("Please enter a valid email address"),
  user_password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      user_email: "",
      user_password: "",
    },
  });

  async function onSubmit(values: FormData) {
  const createUser = {
    name: values.username,
    email: values.user_email,
    password: values.user_password,
    avatar: "https://i.pravatar.cc/150"
  };

  try {
    const data = await insertUser(createUser);
    console.log("Inserted user:", data);
    form.reset();
    toast.success("Successfully registered!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to register!");
  }
}

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 border p-6 shadow-lg rounded-2xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field className="flex flex-col gap-2">
            <FieldLabel>Username</FieldLabel>
            <Input placeholder="John Doe" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="user_email"
        render={({ field, fieldState }) => (
          <Field className="flex flex-col gap-2">
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="john.doe@gmail.com" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="user_password"
        render={({ field, fieldState }) => (
          <Field className="flex flex-col gap-2">
            <FieldLabel>Password</FieldLabel>
            <Input type="password" placeholder="Your password" {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" className="w-full mt-4">
        Register
      </Button>

      <p className="text-center mt-2 text-sm">
        Already a member?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}