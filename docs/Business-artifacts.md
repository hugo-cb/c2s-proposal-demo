# Business Artifacts & Analysis Techniques

This document defines the artifacts produced under the Business Perspective and the techniques used to extract meaningful business insights from codebases.

---

## 📦 1. Business Capability Map (JSON)

### Purpose:
Map source code modules and files to high-level business capabilities.

### Structure:
```json
{
  "capabilities": [
    {
      "name": "User Management",
      "modules": ["auth", "users", "profile"],
      "description": "Handles user registration, login, profile updates"
    },
    {
      "name": "Scheduling",
      "modules": ["appointments", "calendar"],
      "description": "Supports scheduling and calendar availability"
    }
  ]
}
```

### Techniques:
- Folder name and file name heuristics
- LLM inference from comments and naming
- Embedding clustering across semantically similar modules

---

## 🧾 2. Feature Traceability Matrix

### Purpose:
Identify which features are implemented in which code units.

### Format:
| Feature | Modules | Key Functions/Files |
|---------|---------|---------------------|
| Login   | `auth.py` | `authenticate_user()` |
| Payment | `checkout/` | `process_payment()`, `invoice.py` |

### Techniques:
- Match test case descriptions and docstrings
- LLM-assisted feature classification
- Static scanning of use-case patterns

---

## 🧩 3. Domain Model Diagram (JSON or Graph)

### Purpose:
Outline key business entities and their relationships.

### Format:
```json
{
  "entities": [
    {"name": "User", "fields": ["id", "email", "role"]},
    {"name": "Appointment", "fields": ["user_id", "date", "status"]}
  ],
  "relationships": [
    {"from": "User", "to": "Appointment", "type": "1:N"}
  ]
}
```

### Techniques:
- ORM model parsing (SQLAlchemy, Prisma, ActiveRecord, etc.)
- LLM-based entity extraction
- Folder structure as bounded context signal

---

## 📜 4. Regulation & Sensitive Zone Report

### Purpose:
Highlight code that handles regulated data (PII, payment, health).

### Format:
```json
{
  "sensitive_modules": [
    {
      "path": "billing/stripe.py",
      "tags": ["PCI", "payment"],
      "reason": "Handles card data and transaction tokens"
    },
    {
      "path": "users/profile.py",
      "tags": ["PII"],
      "reason": "Contains user names, addresses, and identifiers"
    }
  ]
}
```

### Techniques:
- Regex for data terms and field names
- LLM contextual classification
- Matching config keys like `DB_PASSWORD`, `TOKEN`, `EMAIL`, etc.

---

## 🧠 5. LLM-Generated Business Logic Summaries

### Purpose:
Describe the business purpose of a file or module in natural language.

### Format:
```json
{
  "file": "scheduler/calendar.py",
  "summary": "Handles calendar logic including availability slots, blocking, and rendering weekly views."
}
```

### Techniques:
- Chunk retrieval by module
- Prompted summarization using LangGraph orchestration

---

## 🔥 6. Critical Business Path Map (Optional)

### Purpose:
Highlight paths in the code that are business-critical (e.g., revenue-generating, customer-facing).

### Output:
- Annotated call graph with priorities
- Ranking of most critical components

### Techniques:
- LLM reasoning over service usage frequency
- API-to-domain usage tracing
- Tagging of customer-impacting flows (e.g., checkout, signup)

---

## 🧪 Summary of Analysis Techniques

| Artifact | Technique |
|---------|-----------|
| Capability Map | Folder grouping + LLM |
| Feature Matrix | Test case trace + LLM |
| Domain Model | ORM/AST parsing + entity resolution |
| Regulation Zones | Pattern match + semantic labels |
| Logic Summaries | LangGraph prompt orchestration |
| Critical Path | Call flow + impact reasoning |
