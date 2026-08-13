---
title: "FootCheck"
tagline: "Match sheets checked against suspension lists — automatically."
categories: ["ai-engineering", "web-development"]
project_type: "client"
client: "Helicon IA"
featured: true
weight: 10
screenshot: "footcheck.png"
screenshot_alt: "The FootCheck web interface: upload panels for match sheet and suspended-player PDFs, and actions to run the identification and download the flagged players."
tech:
  - group: "AI"
    items: ["Vision models", "OpenRouter"]
  - group: "Frontend"
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"]
  - group: "Backend"
    items: ["FastAPI", "SQLAlchemy", "JWT auth (httpOnly)"]
metrics:
  - figure: "5"
    symbol: "×"
    label: "faster than manual round processing"
  - figure: "97"
    symbol: "%"
    label: "accuracy identifying suspended players"
testimonial: ""
testimonial_author: ""
links:
  - kind: "site"
    url: "https://footcheck.helicon-ia.fr/"
---
Football officials must check every match sheet against the week's suspension
list — a slow, error-prone manual task repeated across a whole round of
matches. For **Helicon IA**, I built FootCheck: a full-stack web application
where match sheets are uploaded as photos or scans, a vision-model pipeline
extracts the players' names, and suspended players are flagged automatically.
A round is now processed about five times faster than by hand, with 97%
accuracy in identifying suspended players.
