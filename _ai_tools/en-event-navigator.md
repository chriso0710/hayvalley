---
layout: ai-detail
lang: en
slug: event-navigator
title: "AI Event Navigator"
description: "MCP-based AI assistant for event navigation and attendee support"
permalink: /ai/event-navigator/
alternate_url: /de/ai/event-navigator/
---

An intelligent event concierge that answers attendee questions in real time. Knows the full program, all exhibitors, venue layout, and guides visitors through their day like a personal assistant.

## Features

- **Smart exhibitor search** — Finds exhibitors even with typos and name variations. Suggests alternatives on no match ("Did you mean...?")
- **Program search with filters** — Search talks by topic, room, category, or speaker. Natural language queries like "What sessions are about security?" return instant results with times and rooms
- **Live program** — Shows what's running right now and what starts in the next 30 minutes
- **Personal agenda** — Visitors describe their interests and the assistant builds a complete, personalized day plan. Detects time conflicts, suggests alternatives, identifies breaks for networking, and links exhibitor booths to their talks. Exportable as iCal for calendar integration
- **Thematic exhibitor matching** — Combines general company knowledge with event data. "Who does cloud backup?" finds the right exhibitors even without product descriptions in the data
- **Automatic fair guide** — Loads a complete event overview on start: rooms, categories, statistics, travel info, tickets
- **Summarizer integration** — Talk transcripts and AI summaries available directly in the conversation

## Technical

- Runs as an MCP server, connectable to any AI that supports the MCP standard
- Data from any source: API, Excel, database, Google Sheets — auto-updates on program changes
- Multilingual — responds in the visitor's language automatically
- Runs as chat bubble on websites or fullscreen on tablets
- Scales to hundreds of concurrent users, hosted on Hetzner in Germany
- Transferable to any event: trade fairs, conferences, company events — wherever program and exhibitor data is available digitally
