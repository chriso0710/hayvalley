---
layout: ai-detail
lang: de
slug: event-navigator
title: "AI Event Navigator"
description: "MCP-basierter AI Assistant für Event-Navigation und Teilnehmer-Support"
permalink: /de/ai/event-navigator/
alternate_url: /ai/event-navigator/
---

Ein intelligenter Event-Concierge, der Besucherfragen in Echtzeit beantwortet. Kennt das komplette Programm, alle Aussteller, die Raumstruktur und führt wie ein persönlicher Assistent durch den Veranstaltungstag.

## Features

- **Smarte Aussteller-Suche** — Findet Aussteller auch bei Tippfehlern und Namensvarianten. Schlägt bei Nicht-Treffern eigenständig Alternativen vor ("Meinten Sie...?")
- **Programmsuche mit Filtern** — Vorträge nach Thema, Raum, Kategorie oder Referent durchsuchen. Natürliche Sprache wie "Welche Vorträge gibt es zum Thema Security?" liefert sofort Ergebnisse mit Uhrzeiten und Räumen
- **Live-Programm** — Zeigt was gerade läuft und was in den nächsten 30 Minuten beginnt
- **Persönliche Tagesagenda** — Besucher beschreiben ihre Interessen, der Assistent erstellt einen kompletten, personalisierten Tagesplan. Erkennt Zeitkonflikte, schlägt Alternativen vor, identifiziert Pausen für Networking und verknüpft Aussteller-Stände mit ihren Vorträgen. Export als iCal für die Kalender-Integration
- **Thematische Aussteller-Zuordnung** — Kombiniert allgemeines Firmenwissen mit Event-Daten. "Wer macht Cloud-Backup?" findet die richtigen Aussteller, auch ohne Produktbeschreibungen in den Daten
- **Automatischer Fair Guide** — Lädt beim Start eine komplette Veranstaltungsübersicht: Räume, Kategorien, Statistiken, Anreise-Infos, Tickets- **Summarizer-Integration** — Vortrags-Transkripte und AI-Zusammenfassungen direkt im Gespräch verfügbar

## Technik

- Läuft als MCP-Server, anbindbar an jede AI, die den MCP-Standard unterstützt
- Daten aus beliebigen Quellen: API, Excel, Datenbank, Google Sheets — bei Programmänderungen automatisch aktualisiert
- Mehrsprachig — antwortet automatisch in der Sprache des Besuchers
- Läuft als Chat-Bubble auf Websites oder als Fullscreen auf Tablets
- Skaliert auf hunderte gleichzeitige Nutzer, gehostet bei Hetzner in Deutschland
- Übertragbar auf jede Veranstaltung: Kongresse, Konferenzen, Hausmessen, Firmen-Events — überall wo Programm- und Ausstellerdaten digital vorliegen
