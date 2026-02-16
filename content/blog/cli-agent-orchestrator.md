---
title: "CLI Agent Orchestrator:"
excerpt: "markdown
Introducing CLI Agent Orchestrator: Transforming Developer CLI Tools into a Multi-Agent Powerhouse"
publishedAt: "2026-02-16"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

```markdown
# Introducing CLI Agent Orchestrator: Transforming Developer CLI Tools into a Multi-Agent Powerhouse

## Introduction

Welcome to the AWS Open Source Blog! Today, we are excited to introduce **CLI Agent Orchestrator (CAO, pronounced “kay-oh”)**, an open-source, multi-agent orchestration framework that revolutionizes how developers work with AI-powered CLI tools such as Amazon Q CLI and Claude Code. While individual developer CLI tools excel at focused tasks with sophisticated reasoning and autonomous execution, complex enterprise development projects often require coordination across multiple disciplines—such as architecture design, parallel development, security reviews, performance optimization, and integration testing.

CAO addresses these challenges by creating a hierarchical orchestration system where multiple specialized CLI AI agents work together under intelligent supervision. Each agent retains the full reasoning capabilities of their underlying CLI tool while contributing to coordinated workflows that exceed single-agent capacity. This enables users to tackle complex projects through intelligent task delegation, session-based isolation, and adaptive workflow patterns, transforming CLI tools from powerful individual agents into an orchestrated multi-agent powerhouse.

## How CLI Agent Orchestrator Works

### Hierarchical Orchestration

CLI Agent Orchestrator operates as a hierarchical multi-agent system with two primary components:

1. **Supervisor Agent**: Manages overall workflow coordination and task delegation to specialized worker agents.
2. **Specialized Worker Agents**: Handle domain-specific tasks.

### Key Features

#### Hierarchical Orchestration

CAO’s supervisor agent coordinates workflow management and task delegation to specialized worker agents. The supervisor maintains overall project context while agents focus on their domains of expertise.

#### Session-Based Isolation

Each agent operates in isolated tmux sessions, ensuring proper context separation while enabling seamless communication through Model Context Protocol (MCP) servers. This provides both coordination and parallel processing capabilities.

#### Intelligent Task Delegation

CAO automatically routes tasks to appropriate specialists based on project requirements, expertise matching, and workflow dependencies. The system adapts between individual agent work and coordinated team efforts through three orchestration patterns:

- **Handoff**: Synchronous task transfer with wait-for-completion.
- **Assign**: Asynchronous task spawning for parallel execution.
- **Send Message**: Direct communication with existing agents.

#### Flexible Workflow Patterns

CAO supports both sequential coordination for dependent tasks and parallel processing for independent work streams. This allows optimization of both development speed and quality assurance processes. The new beta scheduled runs feature adds crontab-like scheduling, allowing automated execution of workflows at specified intervals.

#### Context Preservation

The supervisor agent provides only necessary context to each worker agent, avoiding context pollution.

#### Direct Worker Interaction and Steering

The user can interact directly with a worker agent to provide additional steering, which distinguishes from the sub-agents feature of Claude Code, which are specialized expert AI assistants within Claude Code that handle specific parts of a larger task.

#### Advanced CLI Integration

CAO supports advanced features of the developer CLI, such as the sub-agents feature of Claude Code, Custom Agent of Amazon Q Developer for CLI, and more.

## Practical Examples

### Modernizing a Mainframe Application

Consider modernizing a mainframe application. Rather than one CLI tool struggling to handle everything, CAO orchestrates four specialized agents working together:

- **Architecture Agent**: Designs the modern cloud structure.
- **Security Agent**: Updates authentication flows.
- **Performance Agent**: Optimizes critical bottlenecks.
- **Test Agent**: Creates and validates test cases.

The orchestrator ensures these agents collaborate effectively, producing a cohesive modernization plan that would be impossible for a single agent to develop.

### Example Workflow

Here’s a simplified example of how CAO might orchestrate a workflow for modernizing a legacy application:

```markdown
1. **Initialize CAO**:
   ```bash
   cao init -p legacy-modernization
   ```

2. **Define Agents**:
   ```yaml
   agents:
     - name: architecture
       type: design
     - name: security
       type: review
     - name: performance
       type: optimize
     - name: test
       type: validate
   ```

3. **Create Workflow**:
   ```yaml
   workflows:
     - name: modernization
       steps:
         - agent: architecture
           task: design-cloud-structure
         - agent: security
           task: update-auth-flows
         - agent: performance
           task: optimize-bottlenecks
         - agent: test
           task: create-validate-tests
   ```

4. **Execute Workflow**:
   ```bash
   cao run -w modernization
   ```
```

## Privacy and Security Considerations

CAO maintains strong privacy and security practices by operating entirely within your local environment. All agent communications occur through local tmux sessions and MCP servers, with no external data transmission beyond standard CLI Tool interactions. Agent contexts and workflow configurations are stored locally, giving you complete control over sensitive project information. The system supports profile-based agent isolation, ensuring that different agents can operate with appropriate access levels and contexts. Conversation tracking and logging provide full transparency into agent interactions while maintaining data locality and security.

## Getting Started with CLI Agent Orchestrator

To begin using CAO, please follow the [README.md](https://github.com/awslabs/cli-agent-orchestrator) from the CLI Agent Orchestrator GitHub Repo. The repository also includes example workflows for you to quickly spin up your projects. CAO also provides a nice User Interface (UI) to easily navigate throughout interactions and orchestration.

### Supported CLI Developer Tools

CAO is available today with support for the following CLI Developer Tools:

- Amazon Q Developer for CLI
- Claude Code

Additional support in Developer CLI tools such as OpenAI Codex CLI, Gemini CLI, Qwen CLI, and Aiden are planned on the future project roadmap.

## Conclusion

CLI Agent Orchestrator (CAO) represents a significant advancement in how developers can leverage AI-powered CLI tools for complex, multi-disciplinary projects. By orchestrating multiple specialized agents, CAO enables coordinated workflows that exceed the capabilities of single-agent tools. Whether you’re modernizing legacy applications, conducting comprehensive research, or ensuring robust quality assurance, CAO provides the framework to streamline your development processes.

Try CAO with your preferred developer CLI tool now, and provide feedback through the respective support channels or the CAO GitHub repository. Happy orchestrating!
```
