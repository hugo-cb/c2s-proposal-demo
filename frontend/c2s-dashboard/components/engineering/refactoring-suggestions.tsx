"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Code, 
  Lightbulb, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example data for refactoring suggestions
const refactoringSuggestions = [
  {
    id: "1",
    file: "src/controllers/PaymentController.ts",
    title: "Extract method from complex payment processing",
    description:
      "The processPayment method is too complex (cyclomatic complexity: 25). Extract the validation logic into a separate method to improve readability and testability.",
    impact: "high",
    effort: "medium",
    code: `// Current code
public async processPayment(req: Request, res: Response) {
  const { amount, cardNumber, cvv, expiryDate, name } = req.body;
  
  // Validation logic that should be extracted
  if (!amount || !cardNumber || !cvv || !expiryDate || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (amount <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0' });
  }
  
  if (cardNumber.length !== 16) {
    return res.status(400).json({ error: 'Invalid card number' });
  }
  
  if (cvv.length !== 3) {
    return res.status(400).json({ error: 'Invalid CVV' });
  }
  
  // More validation...
  
  // Payment processing logic
  try {
    const paymentResult = await this.paymentService.processPayment({
      amount,
      cardNumber,
      cvv,
      expiryDate,
      name
    });
    
    return res.status(200).json(paymentResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}`,
    suggestedCode: `// Suggested refactoring
private validatePaymentRequest(req: Request): { valid: boolean; error?: string } {
  const { amount, cardNumber, cvv, expiryDate, name } = req.body;
  
  if (!amount || !cardNumber || !cvv || !expiryDate || !name) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  
  if (cardNumber.length !== 16) {
    return { valid: false, error: 'Invalid card number' };
  }
  
  if (cvv.length !== 3) {
    return { valid: false, error: 'Invalid CVV' };
  }
  
  // More validation...
  
  return { valid: true };
}

public async processPayment(req: Request, res: Response) {
  const validation = this.validatePaymentRequest(req);
  
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  
  const { amount, cardNumber, cvv, expiryDate, name } = req.body;
  
  // Payment processing logic
  try {
    const paymentResult = await this.paymentService.processPayment({
      amount,
      cardNumber,
      cvv,
      expiryDate,
      name
    });
    
    return res.status(200).json(paymentResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}`,
  },
  {
    id: "2",
    file: "src/services/NotificationService.ts",
    title: "Replace conditional with polymorphism",
    description:
      "The sendNotification method uses a large switch statement to handle different notification types. Consider using the Strategy pattern to make the code more maintainable.",
    impact: "medium",
    effort: "high",
    code: `// Current code
public async sendNotification(type: string, user: User, data: any): Promise<void> {
  switch (type) {
    case 'email':
      await this.sendEmail(user.email, data.subject, data.body);
      break;
    case 'sms':
      await this.sendSMS(user.phone, data.message);
      break;
    case 'push':
      await this.sendPushNotification(user.deviceToken, data.title, data.body);
      break;
    case 'in-app':
      await this.createInAppNotification(user.id, data.title, data.body);
      break;
    default:
      throw new Error(\`Unsupported notification type: \${type}\`);
  }
  
  await this.logNotification(user.id, type, data);
}`,
    suggestedCode: `// Suggested refactoring using Strategy pattern
interface NotificationStrategy {
  send(user: User, data: any): Promise<void>;
}

class EmailNotificationStrategy implements NotificationStrategy {
  async send(user: User, data: any): Promise<void> {
    // Implementation of email sending
    await this.sendEmail(user.email, data.subject, data.body);
  }
}

class SMSNotificationStrategy implements NotificationStrategy {
  async send(user: User, data: any): Promise<void> {
    // Implementation of SMS sending
    await this.sendSMS(user.phone, data.message);
  }
}

// More strategy implementations...

class NotificationService {
  private strategies: Map<string, NotificationStrategy> = new Map();
  
  constructor() {
    this.strategies.set('email', new EmailNotificationStrategy());
    this.strategies.set('sms', new SMSNotificationStrategy());
    // Register other strategies...
  }
  
  public async sendNotification(type: string, user: User, data: any): Promise<void> {
    const strategy = this.strategies.get(type);
    
    if (!strategy) {
      throw new Error(\`Unsupported notification type: \${type}\`);
    }
    
    await strategy.send(user, data);
    await this.logNotification(user.id, type, data);
  }
}`,
  },
  {
    id: "3",
    file: "src/utils/Validator.ts",
    title: "Use guard clauses to reduce nesting",
    description:
      "The validateUserInput method has excessive nesting which makes it hard to read. Use guard clauses to reduce nesting and improve readability.",
    impact: "medium",
    effort: "low",
    code: `// Current code
public validateUserInput(input: UserInput): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [] };
  
  if (input) {
    if (input.name) {
      if (input.name.length < 2) {
        result.valid = false;
        result.errors.push('Name must be at least 2 characters long');
      }
    } else {
      result.valid = false;
      result.errors.push('Name is required');
    }
    
    if (input.email) {
      if (!this.isValidEmail(input.email)) {
        result.valid = false;
        result.errors.push('Email is invalid');
      }
    } else {
      result.valid = false;
      result.errors.push('Email is required');
    }
    
    // More validation...
  } else {
    result.valid = false;
    result.errors.push('Input is required');
  }
  
  return result;
}`,
    suggestedCode: `// Suggested refactoring with guard clauses
public validateUserInput(input: UserInput): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [] };
  
  if (!input) {
    result.valid = false;
    result.errors.push('Input is required');
    return result;
  }
  
  if (!input.name) {
    result.valid = false;
    result.errors.push('Name is required');
  } else if (input.name.length < 2) {
    result.valid = false;
    result.errors.push('Name must be at least 2 characters long');
  }
  
  if (!input.email) {
    result.valid = false;
    result.errors.push('Email is required');
  } else if (!this.isValidEmail(input.email)) {
    result.valid = false;
    result.errors.push('Email is invalid');
  }
  
  // More validation...
  
  return result;
}`,
  },
];

export function RefactoringSuggestions() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedSuggestion === id) {
      setExpandedSuggestion(null);
    } else {
      setExpandedSuggestion(id);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "";
    }
  };

  const filteredSuggestions = activeTab === "all" 
    ? refactoringSuggestions 
    : refactoringSuggestions.filter(s => s.impact === activeTab);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Refactoring Suggestions
        </CardTitle>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-[300px] grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="high">High Impact</TabsTrigger>
            <TabsTrigger value="medium">Medium Impact</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="rounded-lg border bg-card p-4 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <h4 className="font-medium">{suggestion.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.file}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getImpactColor(suggestion.impact)}`}
                  >
                    Impact: {suggestion.impact}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getEffortColor(suggestion.effort)}`}
                  >
                    Effort: {suggestion.effort}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-sm">{suggestion.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => toggleExpand(suggestion.id)}
                >
                  <Code className="h-4 w-4" />
                  {expandedSuggestion === suggestion.id
                    ? "Hide Code"
                    : "View Code"}
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {expandedSuggestion === suggestion.id && (
                <div className="mt-4 space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <h5 className="mb-2 text-sm font-medium">Current Code</h5>
                    <pre className="overflow-x-auto text-xs">
                      <code>{suggestion.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <h5 className="mb-2 text-sm font-medium">Suggested Code</h5>
                    <pre className="overflow-x-auto text-xs">
                      <code>{suggestion.suggestedCode}</code>
                    </pre>
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm">Apply Suggestion</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
