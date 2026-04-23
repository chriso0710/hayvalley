---
layout: ai-detail
lang: de
slug: spec-driven-development
title: "Spec-Driven Development"
description: "Strukturierter Ansatz für Software-Entwicklung mit AI-Unterstützung"
permalink: /de/ai/spec-driven-development/
alternate_url: /ai/spec-driven-development/
---

Eine Methodik, bei der detaillierte Spezifikationen als Grundlage für AI-gestützte Entwicklung dienen. Statt vage Prompts zu schreiben, werden präzise Specs erstellt, die sowohl Mensch als auch AI als Arbeitsgrundlage nutzen.

## Warum Specs vor Code

Klassische Entwicklung behandelt Code als primär und Dokumentation als Beiwerk. SDD dreht das um — Spezifikationen werden zur Single Source of Truth, die die Implementierung steuert. Code dient der Spec, nicht umgekehrt.

## Was es löst

- **Lücke zwischen Absicht und Umsetzung** — Specs generieren Code, es gibt keinen Bruch zwischen dem was gemeint war und dem was gebaut wurde
- **Schnellere Pivots** — Spec ändern, Implementierung neu generieren. Minuten statt manuellem Umbau
- **Keine Mehrdeutigkeit** — Erzwungene Klarheit vor dem Coding. Unbekanntes wird explizit markiert, nicht geraten
- **Kein Over-Engineering** — Simplicity-Constraints verhindern voreilige Abstraktion

## Warum es mit AI funktioniert

Specs begrenzen LLM-Output produktiv: keine Implementierungsdetails in Anforderungen, Test-first-Denken vor der Code-Generierung, explizite Unsicherheits-Marker statt plausibler Vermutungen. Die AI wird zum disziplinierten Engineer, nicht zur kreativen Ratemaschine.

Kombiniert klassisches TDD-Denken mit modernen LLM-Workflows. Ergebnis: konsistentere Codebasis, bessere AI-Outputs, nachvollziehbare Entscheidungen.
