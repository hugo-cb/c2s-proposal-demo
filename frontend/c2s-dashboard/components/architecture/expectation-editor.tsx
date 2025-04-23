"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Edit, 
  Save, 
  Plus, 
  Trash, 
  Check,
  X
} from "lucide-react";

// Types for expectation rules
interface ExpectationRule {
  id: string;
  type: string;
  description: string;
  details?: string;
  isEditing?: boolean;
}

// Rule types
const ruleTypes = [
  { value: "dependency", label: "Dependency Rule" },
  { value: "layer", label: "Layer Rule" },
  { value: "pattern", label: "Design Pattern Rule" },
  { value: "naming", label: "Naming Convention" }
];

// Sample data
const initialRules: ExpectationRule[] = [
  {
    id: "rule-1",
    type: "dependency",
    description: "Services should not directly depend on repositories from other domains",
    details: "Use service interfaces to communicate between domains"
  },
  {
    id: "rule-2",
    type: "layer",
    description: "Domain layer should not depend on external layers",
    details: "Domain entities should be pure and not contain infrastructure concerns"
  },
  {
    id: "rule-3",
    type: "pattern",
    description: "Use Repository Pattern for data access",
    details: "All data access should go through repository interfaces"
  }
];

export function ExpectationEditor() {
  const [rules, setRules] = useState<ExpectationRule[]>(initialRules);
  const [newRule, setNewRule] = useState<ExpectationRule>({
    id: "",
    type: "",
    description: "",
    details: "",
    isEditing: false
  });
  const [isAddingRule, setIsAddingRule] = useState(false);
  
  // Toggle rule editing mode
  const toggleEditRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, isEditing: !rule.isEditing } 
        : rule
    ));
  };
  
  // Update rule being edited
  const updateRule = (id: string, field: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, [field]: value } 
        : rule
    ));
  };
  
  // Save edited rule
  const saveRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, isEditing: false } 
        : rule
    ));
  };
  
  // Delete rule
  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };
  
  // Update new rule form
  const updateNewRule = (field: string, value: string) => {
    setNewRule({ ...newRule, [field]: value });
  };
  
  // Add new rule
  const addRule = () => {
    if (newRule.type && newRule.description) {
      const rule: ExpectationRule = {
        id: `rule-${Date.now()}`,
        type: newRule.type,
        description: newRule.description,
        details: newRule.details
      };
      
      setRules([...rules, rule]);
      setNewRule({
        id: "",
        type: "",
        description: "",
        details: "",
        isEditing: false
      });
      setIsAddingRule(false);
    }
  };
  
  // Cancel adding new rule
  const cancelAddRule = () => {
    setNewRule({
      id: "",
      type: "",
      description: "",
      details: "",
      isEditing: false
    });
    setIsAddingRule(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Architectural Expectations
          </div>
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddingRule(true)}
          disabled={isAddingRule}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* New Rule Form */}
          {isAddingRule && (
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="text-sm font-medium">Add New Expectation Rule</h3>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Rule Type</label>
                <Select 
                  value={newRule.type} 
                  onValueChange={(value) => updateNewRule("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rule type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ruleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input
                  placeholder="Enter rule description"
                  value={newRule.description}
                  onChange={(e) => updateNewRule("description", e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Details (Optional)</label>
                <Textarea
                  placeholder="Enter additional details or examples"
                  value={newRule.details}
                  onChange={(e) => updateNewRule("details", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={cancelAddRule}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={addRule} disabled={!newRule.type || !newRule.description}>
                  <Check className="h-4 w-4 mr-1" />
                  Add Rule
                </Button>
              </div>
            </div>
          )}
          
          {/* Rules List */}
          <div className="space-y-3">
            {rules.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No expectation rules defined. Add your first rule to get started.
              </div>
            ) : (
              rules.map((rule) => (
                <div key={rule.id} className="rounded-lg border p-4">
                  {rule.isEditing ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Rule Type</label>
                        <Select 
                          value={rule.type} 
                          onValueChange={(value) => updateRule(rule.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rule type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ruleTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Description</label>
                        <Input
                          value={rule.description}
                          onChange={(e) => updateRule(rule.id, "description", e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Details (Optional)</label>
                        <Textarea
                          value={rule.details || ""}
                          onChange={(e) => updateRule(rule.id, "details", e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleEditRule(rule.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => saveRule(rule.id)}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {ruleTypes.find(t => t.value === rule.type)?.label || rule.type}
                          </span>
                          <h3 className="text-sm font-medium">{rule.description}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => toggleEditRule(rule.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {rule.details && (
                        <p className="text-sm text-muted-foreground mt-1">{rule.details}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Help Text */}
          <div className="text-sm text-muted-foreground">
            <p>Define architectural expectations to validate your codebase against. These rules will be used to check for compliance in the system.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
