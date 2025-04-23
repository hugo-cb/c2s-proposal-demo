# Architecture Artifacts & Analysis Techniques

This document outlines the artifacts generated from the Architecture Perspective and the strategies used to extract architectural insights from codebases.

---

## 📦 1. Architecture Summary Report (JSON)

### Purpose:
Provide a high-level overview of the system’s architectural structure, styles, layers, and components.

### Structure:
```json
{
  "architecture_style": "Layered Monolith",
  "entrypoints": ["main.py", "app.js"],
  "layers": ["api", "domain", "infra"],
  "modules": [
    {
      "name": "auth",
      "layer": "domain",
      "patterns": ["Factory", "Repository"],
      "entry": false
    }
  ],
  "design_patterns": ["Repository", "Adapter"],
  "communication": {
    "internal": "sync calls",
    "external": ["REST", "WebSocket"]
  }
}
```

### Techniques:
- Folder structure and file name heuristics
- Static import analysis and entrypoint detection
- LangGraph-powered LLM summarization
- Pattern recognition via semantic analysis

---

## 🧾 2. Layer & Module Mapping

### Purpose:
Map source files to their logical architectural layer.

### Format:
| File | Layer | Inferred Role |
|------|-------|---------------|
| `auth/user_service.py` | domain | business logic |
| `api/routes.py` | api | controller |
| `infra/repo.py` | infrastructure | DB adapter |

### Techniques:
- Directory conventions (e.g., `api/`, `infra/`)
- LLM role inference per file/module
- AST inspection of imports and structure

---

## 🔁 3. Dependency Graph

### Purpose:
Visualize and analyze module or package-level dependencies.

### Format:
Graph representation (adjacency list or matrix)

```json
{
  "nodes": ["auth", "user", "db", "token"],
  "edges": [
    {"from": "auth", "to": "user"},
    {"from": "user", "to": "db"},
    {"from": "token", "to": "db"}
  ]
}
```

### Techniques:
- Static import tracing
- Cross-module function call resolution
- Optional use of `tree-sitter`, `pyan3`, or similar parsers

---

## 🧩 4. Design Pattern Map

### Purpose:
Identify architectural and structural design patterns across the codebase.

### Format:
```json
{
  "patterns": [
    {
      "name": "Factory",
      "location": "user_factory.py",
      "detected_by": "LLM pattern recognition"
    }
  ]
}
```

### Techniques:
- LLM prompt evaluation
- Heuristic class + function name matching
- Interface detection and relationship analysis

---

## 🧠 5. Module Responsibility Summary (LLM-generated)

### Purpose:
Explain what each module does in architectural terms.

### Format:
```json
{
  "file": "scheduler.py",
  "summary": "Implements coordination logic between the event queue and job processor. Part of the domain layer."
}
```

### Techniques:
- File chunk retrieval
- LangGraph LLM node with architecture-focused prompt
- Optional reinforcement with import graph

---

## 🏛️ 6. TOGAF-Aligned Domain Map

### Purpose:
Categorize architectural elements into TOGAF domains: Application, Data, Technology, and Business.

### Structure:
```json
{
  "application": ["auth", "scheduler", "routes"],
  "data": ["models", "repository"],
  "technology": ["redis", "postgres"],
  "business": ["checkout", "onboarding"]
}
```

### Techniques:
- File categorization heuristics
- Entity detection and purpose classification
- TOGAF-specific LLM prompt orchestration

---

## 🗂️ 7. C4 Diagram Source Files (`.likec4`)

### Purpose:
Generate visual diagrams using the LikeC4 model for C4 views.

### Files:
- `system.likec4`
- `container.likec4`
- `component.likec4`

### Techniques:
- LangGraph output → C4 DSL via converter
- Files structured to reflect extracted layers and modules
- External systems and communication modeled

---

## 🔄 8. Lifecycle Flow Report

### Purpose:
Trace application behavior from entrypoint to core processes.

### Format:
```json
{
  "entrypoint": "main.py",
  "flow": [
    "Load config",
    "Start FastAPI server",
    "Register routes",
    "Serve HTTP traffic"
  ]
}
```

### Techniques:
- Entrypoint and init function tracing
- AST parsing and function call analysis
- LLM sequence summarization

---

## 🧪 Summary of Analysis Techniques

| Artifact | Technique |
|---------|-----------|
| Summary Report | Heuristics + LLM |
| Layer Mapping | Path + import + prompt |
| Dependency Graph | Static imports |
| Design Patterns | Class/factory/interface detection + LLM |
| Responsibilities | LangGraph LLM summary node |
| TOGAF Mapping | Domain-based file classification |
| LikeC4 Exports | Structured .likec4 generation |
| Lifecycle Flow | Entrypoint + AST traversal + summarization |
