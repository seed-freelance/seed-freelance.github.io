---
title: "FootCheck"
tagline: "Les feuilles de match vérifiées contre les listes de suspension — automatiquement."
categories: ["ai-engineering", "web-development"]
project_type: "client"
client: "Helicon IA"
featured: true
weight: 10
screenshot: "footcheck.png"
screenshot_alt: "L'interface web de FootCheck : dépôt des feuilles de match et des joueurs suspendus en PDF, puis lancement de l'identification et téléchargement des joueurs signalés."
tech:
  - group: "IA"
    items: ["Modèles de vision", "OpenRouter"]
  - group: "Frontend"
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"]
  - group: "Backend"
    items: ["FastAPI", "SQLAlchemy", "Auth JWT (httpOnly)"]
metrics:
  - figure: "5"
    symbol: "×"
    label: "plus rapide que le traitement manuel d'une journée"
  - figure: "97"
    symbol: " %"
    label: "de précision dans l'identification des joueurs suspendus"
testimonial: ""
testimonial_author: ""
links:
  - kind: "site"
    url: "https://footcheck.helicon-ia.fr/"
---
Produit en français, développé pour **Helicon IA**, société française
d'intelligence artificielle. Dans les championnats de football, chaque feuille
de match doit être vérifiée à la main contre la liste des joueurs suspendus de
la semaine — une tâche lente et source d'erreurs, répétée sur toute une
journée de championnat. FootCheck est une application web complète : les
feuilles de match sont déposées en photo ou en scan, un pipeline de modèles de
vision extrait les noms des joueurs, et les joueurs suspendus sont signalés
automatiquement. Une journée est désormais traitée environ cinq fois plus vite
qu'à la main, avec 97 % de précision dans l'identification des joueurs
suspendus.
