'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edge } from 'reactflow';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonacoEditor } from '@/components/ui/monaco-editor';

interface EdgeData {
  condition?: {
    type: 'state' | 'value' | 'status';
    value: string;
  };
  transformation?: {
    type: 'default' | 'custom';
    language?: string;
    code?: string;
  };
}

const edgeFormSchema = z.object({
  condition: z
    .object({
      type: z.enum(['state', 'value', 'status']),
      value: z.string().min(1, 'Condition value is required'),
    })
    .optional(),
  transformation: z
    .object({
      type: z.enum(['default', 'custom']),
      language: z.enum(['python', 'javascript', 'go']).optional(),
      code: z.string().optional(),
    })
    .optional(),
});

type EdgeFormValues = z.infer<typeof edgeFormSchema>;

interface EdgeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: EdgeFormValues) => void;
  initialValues?: EdgeFormValues;
}

export function EdgeFormDialog({ open, onClose, onSubmit, initialValues }: EdgeFormDialogProps) {
  const form = useForm<EdgeFormValues>({
    resolver: zodResolver(edgeFormSchema),
    defaultValues: initialValues || {},
  });

  const handleSubmit = (values: EdgeFormValues) => {
    onSubmit(values);
    form.reset();
  };

  const transformationType = form.watch('transformation.type');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialValues ? 'Edit Edge' : 'Create Edge'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Condition</h4>
                <FormField
                  control={form.control}
                  name="condition.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="state">State</SelectItem>
                            <SelectItem value="value">Value</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition.value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., state === 'ready' or value > 0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Transformation</h4>
                <FormField
                  control={form.control}
                  name="transformation.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select transformation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {transformationType === 'custom' && (
                  <>
                    <FormField
                      control={form.control}
                      name="transformation.language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transformation.code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code</FormLabel>
                          <FormControl>
                            <div className="h-[200px] rounded-md border">
                              <MonacoEditor
                                value={field.value || ''}
                                onChange={field.onChange}
                                language={form.watch('transformation.language') || 'python'}
                                options={{
                                  minimap: { enabled: false },
                                  scrollBeyondLastLine: false,
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues ? 'Update Edge' : 'Create Edge'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
