"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Example projects data
const projects = [
  {
    value: "ecommerce",
    label: "E-commerce Platform",
  },
  {
    value: "banking",
    label: "Banking System",
  },
  {
    value: "crm",
    label: "CRM System",
  },
  {
    value: "mobile",
    label: "Mobile Banking App",
  },
  {
    value: "healthcare",
    label: "Healthcare Portal",
  },
];

export function ProjectSelector() {
  const [open, setOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<string>(
    projects[0].value
  );

  const selectedProjectLabel = React.useMemo(() => {
    return projects.find((project) => project.value === selectedProject)?.label;
  }, [selectedProject]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a project"
          className="w-full justify-between"
        >
          {selectedProjectLabel || "Select a project..."}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={(currentValue: string) => {
                    setSelectedProject(currentValue);
                    setOpen(false);
                  }}
                >
                  {project.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedProject === project.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  // Handle new project creation
                  console.log("Create new project");
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
