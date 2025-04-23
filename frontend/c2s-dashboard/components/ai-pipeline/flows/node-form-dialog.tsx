'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Node } from 'reactflow';
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

interface Parameter {
  name: string;
  type: string;
}

interface NodeData {
  name: string;
  description?: string;
  inputs: Parameter[];
  outputs: Parameter[];
}

const parameterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['string', 'number', 'boolean', 'array', 'object', 'any']),
});

const nodeFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  inputs: z.array(parameterSchema),
  outputs: z.array(parameterSchema),
});

type NodeFormValues = z.infer<typeof nodeFormSchema>;

interface NodeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NodeFormValues) => void;
  initialValues?: NodeFormValues;
}

export function NodeFormDialog({ open, onClose, onSubmit, initialValues }: NodeFormDialogProps) {
  const form = useForm<NodeFormValues>({
    resolver: zodResolver(nodeFormSchema),
    defaultValues: initialValues || {
      name: '',
      description: '',
      inputs: [{ name: '', type: 'string' }],
      outputs: [{ name: '', type: 'string' }],
    },
  });

  const handleSubmit = (values: NodeFormValues) => {
    onSubmit(values);
    form.reset();
  };

  const addParameter = (type: 'inputs' | 'outputs') => {
    const current = form.getValues(type);
    form.setValue(type, [...current, { name: '', type: 'string' }]);
  };

  const removeParameter = (type: 'inputs' | 'outputs', index: number) => {
    const current = form.getValues(type);
    form.setValue(
      type,
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialValues ? 'Edit Node' : 'Create Node'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Inputs</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addParameter('inputs')}
                  >
                    Add Input
                  </Button>
                </div>
                {form.watch('inputs').map((_, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`inputs.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Parameter name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`inputs.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">string</SelectItem>
                                <SelectItem value="number">number</SelectItem>
                                <SelectItem value="boolean">boolean</SelectItem>
                                <SelectItem value="array">array</SelectItem>
                                <SelectItem value="object">object</SelectItem>
                                <SelectItem value="any">any</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeParameter('inputs', index)}
                      className="shrink-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Outputs</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addParameter('outputs')}
                  >
                    Add Output
                  </Button>
                </div>
                {form.watch('outputs').map((_, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <FormField
                      control={form.control}
                      name={`outputs.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="Parameter name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`outputs.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="string">string</SelectItem>
                                <SelectItem value="number">number</SelectItem>
                                <SelectItem value="boolean">boolean</SelectItem>
                                <SelectItem value="array">array</SelectItem>
                                <SelectItem value="object">object</SelectItem>
                                <SelectItem value="any">any</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeParameter('outputs', index)}
                      className="shrink-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {initialValues ? 'Update Node' : 'Create Node'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
