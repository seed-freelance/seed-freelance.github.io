---
title: "Email & Calendar Assistant"
tagline: "An inbox agent that classifies, drafts, and schedules — and asks before it acts."
categories: ["ai-engineering"]
project_type: "personal"
weight: 30
screenshot: "poster.png"
screenshot_alt: "The assistant's inbox showing an email classified as a meeting request with a confidence score, and actions to classify, schedule the meeting, or trust the sender."
tech:
  - group: "AI"
    items: ["LangChain", "HuggingFace LLMs"]
  - group: "Integration"
    items: ["Gmail API", "Google Calendar API", "OAuth 2.0"]
  - group: "App"
    items: ["Python", "Streamlit", "SQLAlchemy"]
specs:
  - "Human-in-the-loop: explicit approval before any send or calendar event"
  - "Risk flagging for unknown senders and low-confidence classifications"
  - "Keyword and template fallbacks when the LLM is unavailable"
  - "Full OAuth 2.0 flow; every decision audited in SQLite"
links:
  - kind: "code"
    url: "https://github.com/PierreExeter/gmail-agent"
  - kind: "writeup"
    url: "https://pierreaumjaud.com/blog/email-calendar-ai-assistant/"
---
Inbox triage follows predictable patterns — but nobody wants an AI sending
mail unsupervised. This agent classifies incoming email with confidence
scores, drafts replies with tone control, and proposes meeting slots from
calendar availability; every outgoing action requires explicit approval,
risky items are flagged for review, and each decision is stored for audit.
When the model is unavailable, it degrades to keyword rules and templates
instead of failing. The pattern — automation with human sign-off — fits any
workflow where mistakes are expensive.
