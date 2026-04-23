---
layout: ai-detail
lang: en
slug: mcp
title: "Model Context Protocol (MCP)"
description: "Open standard for connecting AI applications with external tools and data"
permalink: /ai/mcp/
alternate_url: /de/ai/mcp/
---

The Model Context Protocol (MCP) is an open standard that enables seamless integration between LLM applications and external data sources, tools, and workflows — similar to what the Language Server Protocol (LSP) did for programming language support.

## Key Benefits

- **Standardized integration** — One protocol to connect AI models with databases, APIs, file systems, and any external service
- **Composable architecture** — Each MCP server provides focused functionality, multiple servers can be combined seamlessly
- **Security by design** — Servers only receive necessary context, full conversation history stays with the host, human-in-the-loop for tool invocations
- **Data gatekeeper** — The MCP server acts as a controlled gateway to internal systems. The organization decides exactly which data the AI can access, at what granularity, and with which permissions. No uncontrolled access to databases, file systems, or APIs
- **Easy to build** — Servers focus on specific capabilities with simple interfaces, hosts handle orchestration
- **Progressive extensibility** — Core protocol provides minimal required functionality, additional capabilities are negotiated as needed

## In Production

Hands-on building MCP-based applications including event navigation AI assistants and AI-powered media libraries. From designing MCP server architectures to integrating them into production Rails applications.
