"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { insertProduct } from "@/lib/data/products";
import { toast } from "sonner";
import { use } from "react";
import { Category } from "@/lib/type/product";
import { useRouter } from "next/navigation";

export default function CreateProductForm({
  getData,
}: {
  getData: Promise<Category[]>;
}) {

    const router = useRouter();
  const data = use(getData);

  const formSchema = z.object({
    title: z
      .string()
      .min(5, "Title at least 5 characters")
      .max(25, "Title max 25 characters"),

    price: z.number(),

    description: z
      .string()
      .max(50, "Description max size 50 characters"),
    categoryId: z.string(),
    image: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const fakeImage = "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/shape/cover/sport/iStock-487787108-3f77e523663f73c106cbcb81834a4248.jpg"
    
    const newProduct = {
      title: values.title,
      price: Number(values.price),
      description: values.description,
      categoryId: Number(values.categoryId),
      images: [fakeImage],
    };

    try {
      const data = await insertProduct(newProduct);
      console.log("Inserted product:", data);
      form.reset();
      toast.success("Product created successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product!");
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
      className="space-y-8"
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 text-center">
          <strong>Create Product</strong>
        </div>

        {/* Title */}
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Title</FieldLabel>

              <Input type="text" {...field} />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Price */}
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Price</FieldLabel>

              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Description */}
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Description</FieldLabel>

              <Textarea {...field} />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Category */}
        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Category</FieldLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {data.map((c) => (
                    <SelectItem
                      key={c.id}
                      value={c.id.toString()}
                    >
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Upload Image</FieldLabel>

              <Input
                type="file"
                onChange={(e) =>
                  field.onChange(e.target.files?.[0])
                }
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="col-span-12">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}