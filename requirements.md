# Front-end Requirements

This document outlines the requirements to build the Front-end for the application.

## 🔧 General Requirements

- **Framework**: React (Next.js or Create React App)
- **State Management**: Redux Toolkit or React Context
- **Routing**: React Router or Next.js Routing
- **API Communication**: Axios or Fetch with error handling
- **Authentication**: JWT or Session-based authentication
- **Design System**: TailwindCSS, MUI, or a custom component library

## 🌐 API Experience

### API Key Management
- Generate, delete, and regenerate API keys
- Display API usage and limits
- Security notice on key usage

### API Documentation
- Documentation rendered from OpenAPI/Swagger
- Code examples (curl, JS, Python)
- “Try it out” testing interface

### Webhook Setup (Optional)
- Register webhook endpoints
- Test webhooks
- Toggle event subscriptions

## 📱 Screens and Goals


### 2. AI Pipeline Dashboard

- User activity summary (stats, graphs)
- Navigation to features
- Welcome message/onboarding tips

Components:
- `StatCard`, `ActivityFeed`, `NavBar`, `WelcomeBanner`

### 3. API Explorer

- Endpoint list with filter/search
- Expand endpoint details
- Test interface with inputs and response viewer

Components:
- `EndpointList`, `EndpointDetail`, `ApiTester`, `ResponseViewer`

### 4. API Key Management

- List of keys with status
- Generate/revoke keys
- Deletion confirmation modal

Components:
- `KeyCard`, `GenerateKeyModal`, `ConfirmationDialog`

### 5. Billing / Usage

- Usage graphs
- Plan details and upgrade button
- Invoice history

Components:
- `UsageGraph`, `PlanCard`, `InvoiceTable`, `PaymentMethodForm`

### 6. Webhook Configuration (Optional)

- List/add/edit/delete webhooks
- Webhook delivery logs

Components:
- `WebhookForm`, `WebhookList`, `DeliveryLogTable`

### 7. Profile / Settings

- Edit name, email, password
- Notification preferences
- Account deletion

Components:
- `ProfileForm`, `PasswordChangeForm`, `PreferenceToggles`

### 8. Error & System Feedback

- Toast notifications
- Error boundaries

Components:
- `Toast`, `ErrorBoundary`, `LoadingSpinner`

### 9. Navigation & Layout

- Sidebar or top navigation
- Mobile responsiveness

Components:
- `Sidebar`, `TopBar`, `Footer`, `MobileMenu`

## 🔗 API Endpoints & Models Integration

This section maps out the API endpoints grouped by functional module and highlights the expected models for integration.

### 1. Flow Management

- `POST /flows`  
  Create a new Flow  
  **Model(s):** `Flow`, `Node`, `Edge[]`

- `GET /flows/{flow_id}`  
  Get details of a specific Flow  
  **Model(s):** `Flow`, `Node`, `Edge[]`

- `DELETE /flows/{flow_id}`  
  Delete a Flow  
  **Model(s):** `Flow`

- `GET /nodes/catalog`  
  List available nodes  
  **Model(s):** `NodeDefinition`

- `GET /nodes/{node_type}/schema`  
  Get input/output schema for a node type  
  **Model(s):** `NodeIO`

### 2. Pipeline Execution

- `POST /pipeline/trigger`  
  Trigger a pipeline execution  
  **Model(s):** `TriggerPayload`, `ExecutionResult`, `PipelineState`

- `GET /executions/{execution_id}`  
  Check current execution status  
  **Model(s):** `ExecutionStatus`, `ExecutionProgress`

- `GET /executions/history`  
  List historical executions  
  **Model(s):** `ExecutionSummary[]`

- `GET /executions/{execution_id}/snapshot`  
  View full state and path taken  
  **Model(s):** `ExecutionSnapshot`, `PipelineState`, `NodeExecution[]`

### 3. Webhook Management

- `POST /webhooks`  
  Register a new webhook  
  **Model(s):** `WebhookRegistration`

- `GET /webhooks`  
  List registered webhooks  
  **Model(s):** `Webhook[]`

- `DELETE /webhooks/{webhook_id}`  
  Remove a webhook  
  **Model(s):** `Webhook`

- `GET /webhooks/{webhook_id}/logs`  
  View delivery logs for a webhook  
  **Model(s):** `WebHookDeliveryLog[]`

- `POST /webhooks/{webhook_id}/replay`  
  Replay specific webhook events  
  **Model(s):** `WebHookReplayRequest`, `WebHookReplayResponse`

### 4. Functions & Types

- `POST /functions`  
  Register a custom function  
  **Model(s):** `CustomFunctionDefinition`

- `GET /functions/{function_id}`  
  View function details  
  **Model(s):** `FunctionDefinition`

- `GET /functions/catalog`  
  List all functions (default + custom)  
  **Model(s):** `FunctionDefinition[]`

- `GET /types/catalog`  
  Get available data types  
  **Model(s):** `TypeDefinition[]`

### Notes for Integration

- Most endpoints return or accept JSON with explicit models described above.
- Authentication is required for all endpoints.
- Use response metadata for status, pagination, and error handling.

## 🔗 API Endpoints & Models Integration

This section maps out the API endpoints grouped by functional module and highlights the expected models for integration.

### 1. Flow Management

- `POST /flows`  
  Create a new Flow  
  **Model(s):** `Flow`, `Node`, `Edge[]`

- `GET /flows/{flow_id}`  
  Get details of a specific Flow  
  **Model(s):** `Flow`, `Node`, `Edge[]`

- `DELETE /flows/{flow_id}`  
  Delete a Flow  
  **Model(s):** `Flow`

- `GET /nodes/catalog`  
  List available nodes  
  **Model(s):** `NodeDefinition`

- `GET /nodes/{node_type}/schema`  
  Get input/output schema for a node type  
  **Model(s):** `NodeIO`

### 2. Pipeline Execution

- `POST /pipeline/trigger`  
  Trigger a pipeline execution  
  **Model(s):** `TriggerPayload`, `ExecutionResult`, `PipelineState`

- `GET /executions/{execution_id}`  
  Check current execution status  
  **Model(s):** `ExecutionStatus`, `ExecutionProgress`

- `GET /executions/history`  
  List historical executions  
  **Model(s):** `ExecutionSummary[]`

- `GET /executions/{execution_id}/snapshot`  
  View full state and path taken  
  **Model(s):** `ExecutionSnapshot`, `PipelineState`, `NodeExecution[]`

### 3. Webhook Management

- `POST /webhooks`  
  Register a new webhook  
  **Model(s):** `WebhookRegistration`

- `GET /webhooks`  
  List registered webhooks  
  **Model(s):** `Webhook[]`

- `DELETE /webhooks/{webhook_id}`  
  Remove a webhook  
  **Model(s):** `Webhook`

- `GET /webhooks/{webhook_id}/logs`  
  View delivery logs for a webhook  
  **Model(s):** `WebHookDeliveryLog[]`

- `POST /webhooks/{webhook_id}/replay`  
  Replay specific webhook events  
  **Model(s):** `WebHookReplayRequest`, `WebHookReplayResponse`

### 4. Functions & Types

- `POST /functions`  
  Register a custom function  
  **Model(s):** `CustomFunctionDefinition`

- `GET /functions/{function_id}`  
  View function details  
  **Model(s):** `FunctionDefinition`

- `GET /functions/catalog`  
  List all functions (default + custom)  
  **Model(s):** `FunctionDefinition[]`

- `GET /types/catalog`  
  Get available data types  
  **Model(s):** `TypeDefinition[]`

### Notes for Integration

- Most endpoints return or accept JSON with explicit models described above.
- Authentication is required for all endpoints.
- Use response metadata for status, pagination, and error handling.
