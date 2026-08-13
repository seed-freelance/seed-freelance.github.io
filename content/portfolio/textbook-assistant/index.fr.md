---
title: "Assistant RAG pour manuels"
tagline: "Posez vos questions à un document ; obtenez des réponses avec sources citées."
categories: ["ai-engineering"]
project_type: "personal"
weight: 20
screenshot: "chainlit.png"
screenshot_alt: "L'interface de chat Chainlit de l'assistant, répondant à une question avec les passages sources cités et leurs scores de pertinence."
tech:
  - group: "IA"
    items: ["LlamaIndex", "ChromaDB", "Ollama", "Embeddings HuggingFace", "Docling"]
  - group: "Application"
    items: ["Python", "Chainlit", "pytest"]
specs:
  - "Récupération MMR : équilibre entre pertinence et diversité"
  - "Chaque réponse cite ses sources avec scores de pertinence"
  - "OCR et extraction de tableaux à l'ingestion (Docling)"
  - "Fonctionne entièrement en local via Ollama — aucune clé API, aucune donnée ne sort de la machine"
links:
  - kind: "code"
    url: "https://github.com/PierreExeter/textbook-AI-assistant"
  - kind: "writeup"
    url: "https://pierreaumjaud.com/blog/textbook-ai-tutor/"
---
Trouver le bon passage dans un document de référence dense prend plus de temps
que le comprendre. Cet assistant ingère des PDF — avec OCR et extraction de
tableaux — dans un index vectoriel ChromaDB persistant et répond aux questions
en s'ancrant dans la source, en citant les passages exacts utilisés. La
récupération utilise le MMR (maximal marginal relevance) pour éviter les
contextes redondants, et le fournisseur de modèle se change par simple
configuration (Ollama, API compatibles OpenAI, vLLM). La même architecture
s'applique partout où une équipe a besoin de réponses fiables tirées de ses
propres documents : manuels, procédures, contrats.
