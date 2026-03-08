"use client";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkUserEmail} from "@/lib/data/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, "Password at least 8 characters."),
    "submit-button": z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  const user = await checkUserEmail(values.email);

  if (!user) {
    toast.error("User not found");
    return;
  }

  if (user.password !== values.password) {
    toast.error("Incorrect password");
    return ;
  }

  toast.success("Login success");

  localStorage.setItem("user", JSON.stringify(user));
  if (user.role === "admin") {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
}

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={onReset}
      className="space-y-8 @container border p-3  shadow-lg rounded-2xl"
    >
      <div className="grid grid-cols-12 gap-4">
        <div key="text-0" id="text-0" className=" col-span-12 col-start-auto">
          <p className="not-first:mt-6 text-xl font-bold" style={{ textAlign: "center" }}>
            Login
          </p>
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Email</FieldLabel>

              <Input
                key="text-input-0"
                placeholder="email.example@gmail.com"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Password</FieldLabel>

              <Input
                key="text-input-1"
                placeholder="--- --- ---"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="submit-button"
          render={({ fieldState }) => (
            <Field
              className=" col-span-12 mt-2 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

              <Button
                key="submit-button-0"
                id="submit-button"
                name=""
                className="w-full mb-3 bg-blue-500 hover:bg-blue-600"
                type="submit"
                variant="default"
              >
                Login
              </Button>
            
                <FieldLabel className="flex justify-center">
                    <Link  href={"/register"}>Not a member? <span className="text-blue-400 hover:text-blue-500">register</span></Link>
                </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  );
}
