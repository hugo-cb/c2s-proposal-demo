# Project Architecture & Analysis Platform

This platform provides comprehensive analysis of software projects by extracting structured and insightful information from source code repositories or build artifacts. It supports multiple analytical perspectives and utilizes LangGraph (RAG++) for intelligent, orchestrated code interpretation using advanced language models.

---

## 🎯 Purpose

Analyze and extract deep, structured insights from any software project under four key perspectives:

- [Engineering](Engeneering.md)
- [Architecture](Architecture.md)
- [Infrastructure](Infra.md)
- [Business](Business.md)

---

## 🚀 Key Features

- Source code ingestion (Git and CI artifacts)
- Static and semantic code analysis powered by LangGraph (RAG++)
- Advanced LLM-driven insights: summaries, classifications, refactoring, and architectural correlation
- Interactive user refinement of accuracy analysis expectations ([Accuracy Analysis](Accuracy-Analysis.md))
- UI and UX designed around actionable insights and user journeys ([UI-UX](UI-UX.md))
- Exportable structured artifacts (JSON, CSV, Markdown)

---

## 🔎 Analytical Perspectives Overview

### 🛠️ [Engineering Perspective](Engineering.md)

Extract and analyze code quality, complexity, test coverage, and semantic insights.

- Static analysis using SonarQube
- Semantic enrichment using LLM
- Code health metrics, smells, refactoring suggestions
- Detailed artifact structures ([Engineering Artifacts](Engineering-artifacts.md))

### 🏗️ [Architecture Perspective](Architecture.md)

Understand system architecture, patterns, layering, and dependencies.

- Detect architectural styles (Monolith, Microservices, Serverless)
- Layer analysis and responsibility mapping
- Design pattern identification
- TOGAF and C4 integration for structured visualization
- Artifacts and analysis techniques ([Architecture Artifacts](Artchitecture-artifacts.md))

### 🌐 [Infrastructure Perspective](Infrastructure.md)

Prepare and evaluate the system for operational readiness and deployment security.

- Infrastructure readiness assessment (Docker, CI/CD, health checks)
- Secrets and risk detection
- Deployment and observability checklists
- Infrastructure analysis artifacts ([Infra Artifacts](Infra-artifacts.md))

### 💼 [Business Perspective](Business.md)

Verify codebase alignment with business capabilities, features, and regulatory requirements.

- Feature and domain coverage mapping
- Capability-to-code traceability
- Sensitive data compliance and audit trails
- Business-related artifacts ([Business Artifacts](Business-artifacts.md))

---

## 📊 [Accuracy Analysis](Accuracy-Analysis.md)

Ensures transparent communication of analytical accuracy across all perspectives, driven by auto-generated expectations and refined user input.

- Objective Engineering accuracy calculation
- User-driven expectations for Architecture, Infrastructure, and Business
- Editable inputs, recalculations, and comparative reporting
- Interactive audit trails and accuracy dashboards

---

## 🎨 [UI & UX](UI-UX.md)

Designed to guide users intuitively through meaningful analytical insights, actionable recommendations, and comprehensive accuracy visualization.

- User personas and interactive user journeys (Gherkin format)
- Detailed screen descriptions and UI element guidelines
- Cross-linked navigation and UX strategy
- Proactive alerting and notification system for continuous user engagement

---

## 🧠 RAG++ with LangGraph (Advanced Analysis)

Our LangGraph-driven orchestration strategy ensures dynamic and context-aware analysis using Retrieval-Augmented Generation (RAG++).

### Pipeline Steps:

1. Code ingestion and chunking
2. Semantic metadata embedding
3. Contextual retrieval and LLM summarization
4. Aggregation and TOGAF alignment
5. Interactive user-refinement loop for accuracy improvement

---

## 📦 Example of Output Structure

```json
{
  "architecture": {
    "style": "Layered Monolith",
    "layers": ["api", "domain", "infra"],
    "modules": [
      {
        "name": "auth",
        "responsibilities": ["login", "token"],
        "design_patterns": ["Factory"]
      }
    ]
  },
  "engineering": {
    "code_smells": 12,
    "coverage_estimate": "high",
    "refactoring_opportunities": ["split login_user"]
  },
  "infrastructure": {
    "artifacts": ["Dockerfile", "CI/CD"],
    "missing": ["Healthcheck"]
  },
  "business": {
    "domains": ["User Management", "Payments"],
    "missing_domains": ["Scheduling"]
  },
  "accuracy_analysis": {
    "engineering": 0.95,
    "architecture": 0.75,
    "infrastructure": 0.66,
    "business": 0.66
  }
}
```

---

## 🚧 Future Enhancements

- ArchiMate model integration and advanced visual exports
- Enhanced time-series analysis of codebase evolution
- Custom organizational rules and governance
- Web-based conversational and graphical user interfaces (LangGraph)

---
