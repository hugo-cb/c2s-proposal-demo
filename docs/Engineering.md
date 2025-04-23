# Engineering Perspective Documentation

## 📘 Introduction

The engineering perspective of this project focuses on extracting tangible, structured,
and actionable information from source code to assess and communicate the quality,
maintainability, and reliability of a software system. This component works as part of a
broader architecture analysis platform that supports developers, architects, and
business stakeholders.

---

## 📋 Summary

This module ingests source code either directly from Git repositories or from CI/CD
pipelines via packaged artifacts. It analyzes the code using static analysis tools such
as SonarQube and enriches results with semantic understanding powered by LLMs. The
results are organized and surfaced in a structured, user-friendly way to facilitate
refactoring, risk management, and planning.

---

## 🧑‍💻 Key Personas to Use It

- **Developers**: To receive refactoring suggestions, quality reports, and
  maintainability insights.
- **Tech Leads / Architects**: To evaluate code health, detect architectural drift, and
  guide technical decisions.
- **Engineering Managers**: To track quality metrics and coverage confidence for
  planning and prioritization.
- **QA/DevOps**: To validate test presence and assess the impact of code changes.

---

## 🌟 Key Features to Be Implemented

- Code ingestion from Git and artifact-based pipelines
- Integration with SonarQube to gather static code analysis data
- Detection of test presence and estimation of coverage likelihood
- LLM-powered summarization of modules and refactoring suggestions
- Detection of design patterns and principle violations (e.g., SRP, DRY)
- Highlighting high-complexity files and hotspots
- Metadata tagging for files (e.g., role, responsibility, language)
- Confidence score for test coverage when coverage report is absent
- API and CLI access to engineering results

---

## 🧰 Technology Stack

- **Python** for core analysis and LLM orchestration
- **TreeSitter** for parsing and analyzing code syntax trees
- **GitPython** for Git repository interaction 
- **SonarQube** for static analysis of code quality
- **LangGraph** for orchestrating multi-step analysis pipelines
- **FAISS / Chroma** for embedding-based chunk retrieval
- **LLMs** (OpenAI GPT, Claude, etc.) for enrichment and summaries
- **CLI tool** (`my-analyzer-cli`) to trigger code analysis from CI pipelines
- **MongoDB / JSON** for storing artifacts and output
- **FastAPI / WebSocket** for API and async updates

---

## 🎯 Key Main Value Deliveries

- Human-readable explanations for technical quality metrics
- Visibility into test strategy with or without explicit coverage
- Guidance on maintainability and technical debt
- Identification of files and modules that require attention
- Refactor suggestions that go beyond rules — contextual and semantic
- Predictability and traceability for engineering decision-making

---

## 🧾 Artifacts to Be Generated

- Engineering report (JSON) with:
    - Code smells, bugs, complexity scores
    - LLM-based summaries and suggestions
    - Test coverage estimate and confidence explanation
- Markdown or HTML visual summary for users
- Embeddings with metadata per chunk
- Interactive graphs or lists of hotspots and code risks
- Dependency Code Graph

---

## 🕸️ Strategies to Deliver Value via Web App Platform

- **Engineering Dashboard**:
    - Quality score, coverage estimate, code health indicators
- **File/Module Explorer**:
    - Complexity, role, responsibility, documentation level
- **Suggestions Panel**:
    - LLM-generated refactoring and test coverage insights
- **Insights Timeline**:
    - Evolution of metrics across commits/releases
- **Deep Dive Views**:
    - Each file/module shows SonarQube data + LLM commentary
- **Filtering & Export**:
    - Export engineering reports; filter by module/language/risk
- **Live CI Feedback**:
    - Show results for most recent build via WebSocket/polling

# Supported Languages

## Modern Languages (Widely Used & Actively Evolving)

- Python
- JavaScript
- TypeScript
- Go (Golang)
- Rust
- Kotlin
- Swift
- Dart
- C# (.NET 5+)
- Java (modern versions: 8+)
- Ruby
- Scala
- Elixir
- PHP (5+)
- ia
- kell

## Older but Still Used in Production

- C
- C++
- Perl
- Shell (Bash)
- Objective-C
- Visual Basic .NET
- R
- Erlang
- COBOL (esp. in financial systems)
- Fortran (in scientific/engineering contexts)
