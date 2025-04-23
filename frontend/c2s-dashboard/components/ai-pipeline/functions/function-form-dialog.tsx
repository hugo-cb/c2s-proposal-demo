'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MonacoEditor } from "@/components/ui/monaco-editor";

const parameterTypes = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
  'any'
] as const;

const supportedLanguages = [
  'python',
  'javascript'
] as const;

interface Parameter {
  name: string;
  type: typeof parameterTypes[number];
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  inputs: z.array(z.object({
    name: z.string().min(1, 'Parameter name is required'),
    type: z.enum(parameterTypes, {
      required_error: "Parameter type is required",
    })
  })),
  outputs: z.array(z.object({
    name: z.string().min(1, 'Parameter name is required'),
    type: z.enum(parameterTypes, {
      required_error: "Parameter type is required",
    })
  })),
  code_language: z.enum(supportedLanguages),
  implementation: z.string().min(1, 'Implementation is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface FunctionFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  initialValues?: Partial<FormValues>;
}

export function FunctionFormDialog({
  open,
  onClose,
  onSubmit,
  initialValues
}: FunctionFormDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      code_language: initialValues?.code_language || 'python',
      implementation: initialValues?.implementation || '',
      inputs: initialValues?.inputs || [],
      outputs: initialValues?.outputs || []
    },
  });

  const { fields: inputFields, append: appendInput, remove: removeInput } = useFieldArray({
    control: form.control,
    name: "inputs"
  });

  const { fields: outputFields, append: appendOutput, remove: removeOutput } = useFieldArray({
    control: form.control,
    name: "outputs"
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues?.name ? 'Edit Function' : 'Create Function'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Function Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter function name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter function description" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_language"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supportedLanguages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <FormLabel>Input Parameters</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendInput({ name: '', type: 'string' })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Input
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {inputFields.map((field, index) => (
                      <div key={field.id} className="flex gap-4 items-start">
                        <FormField
                          control={form.control}
                          name={`inputs.${index}.name`}
                          render={({ field }: { field: any }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Parameter name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`inputs.${index}.type`}
                          render={({ field }: { field: any }) => (
                            <FormItem className="flex-1">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {parameterTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInput(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <FormLabel>Output Parameters</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendOutput({ name: '', type: 'string' })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Output
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {outputFields.map((field, index) => (
                      <div key={field.id} className="flex gap-4 items-start">
                        <FormField
                          control={form.control}
                          name={`outputs.${index}.name`}
                          render={({ field }: { field: any }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Parameter name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`outputs.${index}.type`}
                          render={({ field }: { field: any }) => (
                            <FormItem className="flex-1">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {parameterTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOutput(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="implementation"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Implementation</FormLabel>
                  <FormControl>
                    <div className="h-[400px] border rounded-md">
                      <MonacoEditor
                        language={form.watch('code_language')}
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues?.name ? 'Save Changes' : 'Create Function'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
