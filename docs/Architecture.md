# Architecture Perspective Documentation

## 📘 Introduction

The architecture perspective focuses on identifying the structural design of a software system — including how components are organized, how they interact, and what architectural patterns or decisions shape the system’s behavior. It reveals how code is structured across layers, modules, boundaries, and responsibilities, aligning technical design with maintainability, scalability, and clarity.

---

## 📋 Summary

This module extracts architectural signals from source code, folders, import graphs, and naming conventions. It combines heuristics, static analysis, and LLM-powered interpretation to identify system types (monolith, microservice, serverless), layer separations (API, domain, infra), entry points, communication patterns, and design patterns. It also classifies architectural findings into TOGAF-inspired domains.

---

## 🧑‍💼 Key Personas to Use It

- **Software Architects**: To understand and validate architecture style and patterns
- **Tech Leads**: To ensure system modularity and maintainability
- **Developers**: To gain clarity on system boundaries, dependencies, and design decisions
- **Auditors / Consultants**: To assess technical debt and architectural fitness

---

## 🌟 Key Features to Be Implemented

- System type detection (monolith, modular, microservice, serverless)
- Layer detection: API, domain, service, infra, adapters
- Entry point and lifecycle mapping
- Intra-system communication detection (sync/async)
- External interface analysis (REST, gRPC, events, etc.)
- Import dependency graph extraction
- Detection of design patterns (e.g., Repository, Factory, Adapter)
- Inversion of control and dependency inversion analysis
- TOGAF domain classification (Application, Data, Technology, Business)
- C4 model generation support (via LikeC4)

---

## 🧰 Technology Stack

- **LangGraph** for orchestrated pipeline analysis (RAG++)
- **LLMs** (e.g., GPT, Claude) for architectural reasoning and explanation
- **AST + Import graph analyzers** for structural mapping
- **Tree-sitter** for multi-language parsing support
- **Embeddings + Vector Store (FAISS/Chroma)** for contextual retrieval
- **LikeC4** for C4 diagram generation and structured export
- **ArchiMate (future)** for enterprise modeling compatibility

---

## 🎯 Key Main Value Deliveries

- Clear identification of architecture style and layering
- Detection of coupling, complexity, and system boundaries
- Explanation of architectural decisions, patterns, and principles
- Structured outputs aligned with enterprise views (TOGAF)
- Visualization-ready structure for diagrams and models (C4, ArchiMate)
- Explainable architecture for all technical stakeholders

---

## 🧾 Artifacts to Be Generated

- Architecture summary report (JSON)
  - style, layers, modules, patterns, entrypoints
- Module responsibility map with LLM summaries
- Dependency graph (module → module)
- Design pattern report (per file or module)
- TOGAF-aligned structure map
- LikeC4 export files (`.likec4`) for rendering diagrams
- Lifecycle diagram or step-by-step architectural flow

---

## 🕸️ Strategies to Deliver Value via Web App Platform

- **Architecture Dashboard**:
  - Style, patterns, entrypoints, system scorecards
- **Layered Code Explorer**:
  - View modules by detected layer with details
- **Interactive C4 Viewer**:
  - Rendered from `.likec4` definitions, supports drill-down
- **Module Details Panel**:
  - Complexity, imports, patterns, and LLM commentary
- **Dependency Graph UI**:
  - Click-through graph of how components connect
- **TOGAF Perspective Switcher**:
  - View architecture filtered by Application/Data/Tech domains
- **Lifecycle Flow Panel**:
  - Summarized “how it runs” from entry to shutdown