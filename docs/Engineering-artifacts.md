# Engineering Artifacts Specification

This document defines the structure of the engineering artifacts produced by the system, as well as the processes, technologies, and dependencies required to generate them.

---

## 📦 1. Engineering Report (JSON)

### Purpose:
Provide a machine-readable summary of engineering quality and insights extracted from the codebase.

### Structure:
```json
{
  "project": "my-project",
  "commit": "abc123",
  "code_smells": 22,
  "bugs": 3,
  "complexity": {
    "avg": 4.3,
    "high_complexity_files": ["auth.py", "parser.js"]
  },
  "coverage_estimate": {
    "confidence": "high",
    "test_files_detected": 17,
    "frameworks": ["pytest"]
  },
  "refactor_suggestions": [
    {
      "file": "user_service.py",
      "line": 89,
      "issue": "Too many responsibilities",
      "recommendation": "Split into multiple services based on domain boundaries"
    }
  ],
  "design_patterns_detected": ["Repository", "Factory"]
}
```

### Dependencies:
- **SonarQube** to extract bugs, code smells, and complexity metrics
- **LLMs (OpenAI, Claude)** to generate semantic explanations and suggestions
- **LangGraph** to orchestrate the analysis pipeline
- **Embedding Store (FAISS/Chroma)** to enable contextual retrieval per file/module

---

## 🧾 2. Markdown / HTML Summary

### Purpose:
Deliver a user-facing, human-readable version of the JSON report.

### Includes:
- Summary tables for bugs, smells, coverage
- Lists of files with issues
- LLM-generated module summaries and refactor suggestions
- Visual indicators (badges, scores, heatmaps)

### Process:
- Markdown rendered from JSON report using Jinja2 templates or Markdown-to-HTML converters
- Optionally served via Web UI

---

## 📚 3. Embeddings with Metadata (Vector Store)

### Purpose:
Enable contextual chunk retrieval for LLMs and user-driven exploration.

### Structure per chunk:
```json
{
  "chunk_id": "services/auth.py#2",
  "content": "...",
  "metadata": {
    "file_path": "services/auth.py",
    "language": "python",
    "estimated_role": "service",
    "loc": 45,
    "related_entities": ["Token", "User"]
  }
}
```

### Dependencies:
- **LangGraph Chunking Node**
- **LLM Classifier Node** (to estimate role, responsibilities)
- **FAISS / Chroma** vector store for embedding and retrieval

---

## 🔥 4. Hotspots & Risk Insights

### Purpose:
Identify areas of the codebase with high risk or complexity that require attention.

### Format:
```json
{
  "hotspots": [
    {
      "file": "core/token.py",
      "loc": 150,
      "complexity_score": 12.1,
      "smells": 4,
      "coverage_confidence": "low",
      "reason": "Complex logic + no tests + security-sensitive"
    }
  ]
}
```

### Dependencies:
- SonarQube output
- Heuristic rule engine + LLM reasoning
- Embedding metadata for cross-linking

---

## 🔗 5. Dependency Code Graph (Optional)

### Purpose:
Represent module-level dependencies across files for visual analysis.

### Format:
```json
{
  "nodes": ["auth", "user", "token", "db"],
  "edges": [
    {"from": "auth", "to": "user"},
    {"from": "auth", "to": "token"},
    {"from": "token", "to": "db"}
  ]
}
```

### Dependencies:
- Static import analysis (`ast` for Python, `esprima` for JS, etc.)
- LangGraph or pre-step to generate adjacency maps

---

## 🧪 Implementation Summary

| Artifact | Dependencies | Technologies |
|---------|---------------|--------------|
| JSON Report | SonarQube, LLM | Python, LangGraph, OpenAI API |
| Markdown/HTML | JSON + Template Engine | Jinja2, Markdown, HTML/CSS |
| Embeddings | Chunking, LangGraph | FAISS, LangChain, LangGraph |
| Hotspots | Sonar + Heuristics | Python, LLM |
| Dependency Graph | Static analysis | tree-sitter, AST parsers |
