'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
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
import { Plus } from "lucide-react";

interface Function {
  id: string;
  name: string;
  description?: string;
  inputs: Array<{
    name: string;
    type: string;
  }>;
  outputs: Array<{
    name: string;
    type: string;
  }>;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  functionId: z.string().min(1, 'Function is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface NodeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { id?: string; name: string; function: Function }) => void;
  initialValues?: {
    id?: string;
    name: string;
    functionId: string;
  };
  onCreateFunction: () => void;
}

// Mock available functions - this would come from an API
const availableFunctions: Function[] = [
  {
    id: 'func_1',
    name: 'TextAnalyzer',
    description: 'Analyzes text content using LLM',
    inputs: [
      { name: 'text', type: 'string' },
      { name: 'analysis_type', type: 'string' }
    ],
    outputs: [
      { name: 'sentiment', type: 'float' },
      { name: 'entities', type: 'array' }
    ]
  },
  {
    id: 'func_2',
    name: 'CodeQualityAnalyzer',
    description: 'Evaluates code quality and suggests improvements',
    inputs: [
      { name: 'code', type: 'string' },
      { name: 'language', type: 'string' }
    ],
    outputs: [
      { name: 'quality_score', type: 'float' },
      { name: 'suggestions', type: 'array' }
    ]
  }
];

export function NodeFormDialog({
  open,
  onClose,
  onSubmit,
  initialValues,
  onCreateFunction
}: NodeFormDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || '',
      functionId: initialValues?.functionId || '',
    },
  });

  const selectedFunction = form.watch('functionId')
    ? availableFunctions.find(f => f.id === form.watch('functionId'))
    : null;

  const handleSubmit = (values: FormValues) => {
    const selectedFunc = availableFunctions.find(f => f.id === values.functionId);
    if (!selectedFunc) return;

    onSubmit({
      id: initialValues?.id,
      name: values.name,
      function: selectedFunc
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialValues?.id ? 'Edit Node' : 'Create Node'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Node Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter node name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="functionId"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Function</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onCreateFunction}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Function
                    </Button>
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a function" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableFunctions.map((func) => (
                        <SelectItem key={func.id} value={func.id}>
                          {func.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedFunction && (
              <div className="text-sm text-muted-foreground">
                {selectedFunction.description}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues?.id ? 'Save Changes' : 'Create Node'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
