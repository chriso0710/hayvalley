---
layout: ai-detail
lang: de
slug: mcp
title: "Model Context Protocol (MCP)"
description: "Offener Standard zur Anbindung von AI-Anwendungen an externe Tools und Daten"
permalink: /de/ai/mcp/
alternate_url: /ai/mcp/
---

Das Model Context Protocol (MCP) ist ein offener Standard, der nahtlose Integration zwischen LLM-Anwendungen und externen Datenquellen, Tools und Workflows ermöglicht — vergleichbar mit dem, was das Language Server Protocol (LSP) für Programmiersprachen-Support geleistet hat.

## Vorteile

- **Standardisierte Integration** — Ein Protokoll, um AI-Modelle mit Datenbanken, APIs, Dateisystemen und beliebigen externen Services zu verbinden
- **Composable Architektur** — Jeder MCP-Server bietet fokussierte Funktionalität, mehrere Server lassen sich nahtlos kombinieren
- **Security by Design** — Server erhalten nur den nötigen Kontext, Gesprächsverlauf bleibt beim Host, Human-in-the-Loop bei Tool-Aufrufen
- **Data Gatekeeper** — Der MCP-Server fungiert als kontrolliertes Gateway zu internen Systemen. Das Unternehmen bestimmt exakt, welche Daten die AI sehen darf, in welcher Granularität und mit welchen Berechtigungen. Kein unkontrollierter Zugriff auf Datenbanken, Dateisysteme oder APIs
- **Einfach zu bauen** — Server fokussieren sich auf spezifische Fähigkeiten mit einfachen Interfaces, Hosts übernehmen die Orchestrierung
- **Progressiv erweiterbar** — Kernprotokoll liefert minimale Grundfunktionalität, zusätzliche Capabilities werden bei Bedarf ausgehandelt

## Im Einsatz

Hands-on beim Bau MCP-basierter Anwendungen, darunter Event-Navigator-AI Assistants und AI-gestützte Mediatheken. Vom Design der MCP-Server-Architektur bis zur Integration in produktive Rails-Anwendungen.
