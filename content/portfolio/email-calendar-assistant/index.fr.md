---
title: "Assistant email & agenda"
tagline: "Un agent de boîte mail qui classe, rédige et planifie — et demande avant d'agir."
categories: ["ai-engineering"]
project_type: "personal"
weight: 30
screenshot: "poster.png"
screenshot_alt: "La boîte de réception Streamlit de l'assistant, avec les emails classés et un brouillon de réponse en attente de validation."
tech:
  - group: "IA"
    items: ["LangChain", "LLM HuggingFace"]
  - group: "Intégration"
    items: ["API Gmail", "API Google Calendar", "OAuth 2.0"]
  - group: "Application"
    items: ["Python", "Streamlit", "SQLAlchemy"]
specs:
  - "Validation humaine explicite avant tout envoi ou événement d'agenda"
  - "Signalement des expéditeurs inconnus et des classifications peu sûres"
  - "Repli sur règles et gabarits quand le LLM est indisponible"
  - "Flux OAuth 2.0 complet ; chaque décision auditée dans SQLite"
links:
  - kind: "code"
    url: "https://github.com/PierreExeter/gmail-agent"
  - kind: "writeup"
    url: "https://pierreaumjaud.com/blog/email-calendar-ai-assistant/"
---
Le tri d'une boîte mail suit des schémas prévisibles — mais personne ne veut
d'une IA qui envoie des messages sans supervision. Cet agent classe les emails
entrants avec un score de confiance, rédige des brouillons de réponse avec
contrôle du ton, et propose des créneaux de réunion selon les disponibilités
de l'agenda ; chaque action sortante exige une validation explicite, les cas
sensibles sont signalés, et chaque décision est enregistrée pour audit. Si le
modèle est indisponible, l'agent se replie sur des règles par mots-clés et des
gabarits au lieu d'échouer. Ce schéma — l'automatisation avec validation
humaine — convient à tout processus où l'erreur coûte cher.
