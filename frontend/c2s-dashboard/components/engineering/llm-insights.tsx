"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Code, 
  GitBranch, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark
} from "lucide-react";

// Example data for LLM insights
const insightsData = {
  codeQuality: [
    {
      id: "cq1",
      title: "Excessive method complexity in PaymentController",
      description: "The processPayment method has a cyclomatic complexity of 15, which is significantly above the recommended threshold of 10. This makes the code harder to understand, test, and maintain.",
      recommendation: "Consider refactoring this method by extracting smaller, more focused methods for each payment processing step. This will improve readability and testability.",
      codeSnippet: `
public boolean processPayment(Payment payment) {
  // Complex payment processing logic with many branches
  if (payment.getAmount() <= 0) {
    return false;
  }
  
  if (payment.getType() == PaymentType.CREDIT_CARD) {
    // Credit card validation and processing
    if (!validateCreditCard(payment)) {
      return false;
    }
    // More complex logic...
  } else if (payment.getType() == PaymentType.BANK_TRANSFER) {
    // Bank transfer validation and processing
    // More complex logic...
  } else if (payment.getType() == PaymentType.CRYPTO) {
    // Cryptocurrency validation and processing
    // More complex logic...
  }
  
  // Additional complex logic with many conditions
  // ...
  
  return true;
}`,
      suggestedFix: `
// Main method with reduced complexity
public boolean processPayment(Payment payment) {
  if (payment.getAmount() <= 0) {
    return false;
  }
  
  switch (payment.getType()) {
    case PaymentType.CREDIT_CARD:
      return processCreditCardPayment(payment);
    case PaymentType.BANK_TRANSFER:
      return processBankTransferPayment(payment);
    case PaymentType.CRYPTO:
      return processCryptoPayment(payment);
    default:
      return processOtherPaymentTypes(payment);
  }
}

// Extracted methods for each payment type
private boolean processCreditCardPayment(Payment payment) {
  if (!validateCreditCard(payment)) {
    return false;
  }
  // Credit card specific logic...
  return true;
}

private boolean processBankTransferPayment(Payment payment) {
  // Bank transfer specific logic...
  return true;
}

private boolean processCryptoPayment(Payment payment) {
  // Cryptocurrency specific logic...
  return true;
}`,
      severity: "high",
      impact: "high",
      effort: "medium",
      tags: ["complexity", "maintainability", "refactoring"]
    },
    {
      id: "cq2",
      title: "Duplicated validation logic across controllers",
      description: "The same input validation logic is duplicated across UserController, ProductController, and OrderController. This violates the DRY principle and increases maintenance burden.",
      recommendation: "Extract the common validation logic into a shared ValidationService that can be reused across all controllers.",
      codeSnippet: `
// In UserController.java
private boolean validateInput(UserDTO user) {
  if (user.getName() == null || user.getName().isEmpty()) {
    return false;
  }
  if (user.getEmail() == null || !user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
    return false;
  }
  // More validation...
  return true;
}

// In ProductController.java (similar duplicated code)
private boolean validateInput(ProductDTO product) {
  if (product.getName() == null || product.getName().isEmpty()) {
    return false;
  }
  // More validation...
  return true;
}`,
      suggestedFix: `
// Create a ValidationService.java
public class ValidationService {
  public boolean validateRequiredString(String value, String fieldName) {
    if (value == null || value.isEmpty()) {
      logger.warn("Validation failed: {} is required", fieldName);
      return false;
    }
    return true;
  }
  
  public boolean validateEmail(String email) {
    if (email == null || !email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
      logger.warn("Validation failed: invalid email format");
      return false;
    }
    return true;
  }
  
  // More validation methods...
}

// In controllers, inject and use the service
@Autowired
private ValidationService validationService;

private boolean validateUser(UserDTO user) {
  return validationService.validateRequiredString(user.getName(), "name") &&
         validationService.validateEmail(user.getEmail());
}`,
      severity: "medium",
      impact: "medium",
      effort: "low",
      tags: ["duplication", "maintainability", "refactoring"]
    }
  ],
  architecture: [
    {
      id: "ar1",
      title: "Violation of Single Responsibility Principle",
      description: "The UserService class is handling too many responsibilities including user management, authentication, email notifications, and report generation. This makes the class difficult to maintain and test.",
      recommendation: "Split the UserService into multiple focused services: UserManagementService, AuthenticationService, NotificationService, and ReportingService.",
      codeSnippet: `
@Service
public class UserService {
  // User management methods
  public User createUser(UserDTO userDTO) { /* ... */ }
  public User updateUser(Long id, UserDTO userDTO) { /* ... */ }
  
  // Authentication methods
  public boolean authenticate(String username, String password) { /* ... */ }
  public String generateToken(User user) { /* ... */ }
  
  // Email notification methods
  public void sendWelcomeEmail(User user) { /* ... */ }
  public void sendPasswordResetEmail(User user) { /* ... */ }
  
  // Report generation methods
  public byte[] generateUserActivityReport(Long userId) { /* ... */ }
  public List<UserStatistics> generateUserStatistics() { /* ... */ }
}`,
      suggestedFix: `
// Split into multiple focused services
@Service
public class UserManagementService {
  public User createUser(UserDTO userDTO) { /* ... */ }
  public User updateUser(Long id, UserDTO userDTO) { /* ... */ }
}

@Service
public class AuthenticationService {
  public boolean authenticate(String username, String password) { /* ... */ }
  public String generateToken(User user) { /* ... */ }
}

@Service
public class NotificationService {
  public void sendWelcomeEmail(User user) { /* ... */ }
  public void sendPasswordResetEmail(User user) { /* ... */ }
}

@Service
public class ReportingService {
  public byte[] generateUserActivityReport(Long userId) { /* ... */ }
  public List<UserStatistics> generateUserStatistics() { /* ... */ }
}`,
      severity: "high",
      impact: "high",
      effort: "high",
      tags: ["architecture", "SOLID", "refactoring"]
    }
  ],
  security: [
    {
      id: "sec1",
      title: "SQL Injection vulnerability in query construction",
      description: "Direct string concatenation is used to build SQL queries in the ProductRepository, creating a potential SQL injection vulnerability.",
      recommendation: "Use parameterized queries or JPA repository methods instead of building SQL strings through concatenation.",
      codeSnippet: `
@Repository
public class ProductRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;
  
  public List<Product> findProductsByCategory(String category) {
    // Vulnerable to SQL injection
    String sql = "SELECT * FROM products WHERE category = '" + category + "'";
    return jdbcTemplate.query(sql, new ProductRowMapper());
  }
}`,
      suggestedFix: `
@Repository
public class ProductRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;
  
  public List<Product> findProductsByCategory(String category) {
    // Safe from SQL injection
    String sql = "SELECT * FROM products WHERE category = ?";
    return jdbcTemplate.query(sql, new ProductRowMapper(), category);
  }
}`,
      severity: "critical",
      impact: "high",
      effort: "low",
      tags: ["security", "sql-injection", "vulnerability"]
    }
  ],
  performance: [
    {
      id: "perf1",
      title: "Inefficient database query pattern",
      description: "The OrderService is making N+1 database queries when fetching orders with their items, causing performance issues with larger datasets.",
      recommendation: "Use eager loading or batch fetching to reduce the number of database queries.",
      codeSnippet: `
@Service
public class OrderService {
  @Autowired
  private OrderRepository orderRepository;
  
  @Autowired
  private OrderItemRepository orderItemRepository;
  
  public List<OrderDTO> getAllOrders() {
    List<Order> orders = orderRepository.findAll();
    List<OrderDTO> orderDTOs = new ArrayList<>();
    
    for (Order order : orders) {
      OrderDTO dto = convertToDTO(order);
      // N+1 query problem: one query for each order
      List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
      dto.setItems(convertItemsToDTO(items));
      orderDTOs.add(dto);
    }
    
    return orderDTOs;
  }
}`,
      suggestedFix: `
@Service
public class OrderService {
  @Autowired
  private OrderRepository orderRepository;
  
  public List<OrderDTO> getAllOrders() {
    // Single query with join fetch to load orders and items together
    List<Order> orders = orderRepository.findAllWithItems();
    List<OrderDTO> orderDTOs = new ArrayList<>();
    
    for (Order order : orders) {
      OrderDTO dto = convertToDTO(order);
      // Items are already loaded, no additional queries needed
      dto.setItems(convertItemsToDTO(order.getItems()));
      orderDTOs.add(dto);
    }
    
    return orderDTOs;
  }
}

// In OrderRepository
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items")
  List<Order> findAllWithItems();
}`,
      severity: "high",
      impact: "high",
      effort: "medium",
      tags: ["performance", "database", "n+1-problem"]
    }
  ]
};

export function LLMInsights() {
  const [activeTab, setActiveTab] = useState("codeQuality");
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  const toggleInsight = (id: string) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const giveFeedback = (id: string, positive: boolean) => {
    setFeedbackGiven({ ...feedbackGiven, [id]: true });
    // In a real application, you would send this feedback to your backend
    console.log(`Feedback for insight ${id}: ${positive ? 'helpful' : 'not helpful'}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const renderInsights = (insights: any[]) => {
    return insights.map((insight) => (
      <div key={insight.id} className="mb-4 rounded-lg border overflow-hidden">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
          onClick={() => toggleInsight(insight.id)}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <div>
              <h3 className="font-medium">{insight.title}</h3>
              {expandedInsight !== insight.id && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {insight.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getSeverityColor(insight.severity)}>
              {insight.severity}
            </Badge>
          </div>
        </div>
        
        {expandedInsight === insight.id && (
          <div className="p-4 border-t bg-muted/30">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Recommendation</h4>
              <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Current Code</h4>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted overflow-x-auto text-xs">
                  <code>{insight.codeSnippet}</code>
                </pre>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Suggested Fix</h4>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted overflow-x-auto text-xs">
                  <code>{insight.suggestedFix}</code>
                </pre>
              </div>
            </div>
            
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div>
                <h4 className="text-xs font-medium mb-1">Severity</h4>
                <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                  {insight.severity}
                </Badge>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1">Impact</h4>
                <Badge variant="outline" className={getSeverityColor(insight.impact)}>
                  {insight.impact}
                </Badge>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1">Effort</h4>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {insight.effort}
                </Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs font-medium mb-1">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {insight.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!feedbackGiven[insight.id] ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        giveFeedback(insight.id, true);
                      }}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        giveFeedback(insight.id, false);
                      }}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Not Helpful
                    </Button>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Thanks for your feedback!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Comment
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            LLM-Powered Code Insights
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Refresh Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="codeQuality" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="codeQuality" className="gap-1">
              <Code className="h-4 w-4" />
              Code Quality
            </TabsTrigger>
            <TabsTrigger value="architecture" className="gap-1">
              <GitBranch className="h-4 w-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-1">
              <AlertTriangle className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-1">
              <Lightbulb className="h-4 w-4" />
              Performance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="codeQuality">
            {renderInsights(insightsData.codeQuality)}
          </TabsContent>
          
          <TabsContent value="architecture">
            {renderInsights(insightsData.architecture)}
          </TabsContent>
          
          <TabsContent value="security">
            {renderInsights(insightsData.security)}
          </TabsContent>
          
          <TabsContent value="performance">
            {renderInsights(insightsData.performance)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
