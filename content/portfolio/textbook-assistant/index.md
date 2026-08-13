---
title: "RAG Textbook Assistant"
tagline: "Ask a textbook questions; get answers with cited sources."
categories: ["ai-engineering"]
project_type: "personal"
weight: 20
screenshot: "chainlit.png"
screenshot_alt: "The Chainlit chat interface of the textbook assistant answering a question with cited source passages and relevance scores."
tech:
  - group: "AI"
    items: ["LlamaIndex", "ChromaDB", "Ollama", "HuggingFace embeddings", "Docling"]
  - group: "App"
    items: ["Python", "Chainlit", "pytest"]
specs:
  - "MMR retrieval balances relevance and diversity"
  - "Every answer cites its sources with relevance scores"
  - "OCR and table extraction at ingestion (Docling)"
  - "Runs fully local via Ollama — no API keys, no data leaves the machine"
links:
  - kind: "code"
    url: "https://github.com/PierreExeter/textbook-AI-assistant"
  - kind: "writeup"
    url: "https://pierreaumjaud.com/blog/textbook-ai-tutor/"
---
Finding the right passage in a dense reference document takes longer than
understanding it. This assistant ingests PDFs — with OCR and table extraction
— into a persistent ChromaDB vector index and answers questions grounded in
the source, citing the exact passages it used. Retrieval uses maximal marginal
relevance to avoid redundant context, and providers are swappable through
configuration (Ollama, OpenAI-compatible APIs, vLLM). The same architecture
applies wherever a team needs reliable answers from its own documents:
manuals, procedures, contracts.
