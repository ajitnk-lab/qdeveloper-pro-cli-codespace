---
title: "Strands Agents 1.0"
excerpt: "Introducing Strands Agents 1.0: Production-Ready Multi-Agent Orchestration Made Simple"
publishedAt: "2026-02-16"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# Introducing Strands Agents 1.0: Production-Ready Multi-Agent Orchestration Made Simple

Today, we are excited to announce version 1.0 of the Strands Agents SDK, marking a significant milestone in our journey to make building AI agents simple, reliable, and production-ready. Strands Agents is an open-source SDK that takes a model-driven approach to building and running AI agents in just a few lines of code. Strands scales from simple to complex agent use cases and from local development to deployment in production. 

Since launching as a preview in May 2025, we’ve seen over 2,000 stars on GitHub and over 150,000 downloads on PyPI. Strands 1.0 brings the same level of simplicity to multi-agent applications that Strands has provided for single agents, with the addition of four new primitives and support for the Agent to Agent (A2A) protocol. 

To take multi-agent architectures into production, 1.0 also includes a new session manager for retrieving agent state from a remote datastore and improved async support throughout the SDK. For flexibility to build your agents with any model, support for five additional model provider APIs was contributed by partners like Anthropic, Meta, OpenAI, Cohere, Mistral, Stability, Writer, and Baseten (see the [pull request](https://github.com/strands-ai/strands-agents/pull/123)).

Let’s dive into these updates in detail. Complete code samples are available on [strandsagents.com](https://strandsagents.com).

## Simplifying Multi-Agent Patterns

Multi-agent patterns enable specialized AI agents to work together—delegating tasks, sharing knowledge, and coordinating actions—to solve complex problems that single agents cannot handle alone. Strands 1.0 introduces four intuitive primitives that make orchestrating multiple agents a simple extension of the model/tool/prompt combination that you use to create single agents.

### Agents-as-Tools: Hierarchical Delegation Made Simple

The agents-as-tools pattern transforms specialized agents into intelligent tools that other agents can call, enabling hierarchical delegation where agents acting as the orchestrator dynamically consult domain experts without giving up control of the request. This mirrors how human teams work—a project manager doesn’t need to know everything, they just need to know which specialist to consult for each task.

Here’s an example:

```python
from strands import Agent, tool
from strands_tools import calculator, file_write, python_repl, journal

@tool
def web_search(query: str) -> str:
    return "Dummy web search results here!"

# Create specialized agents
research_analyst_agent = Agent(
    system_prompt="You are a research specialist who gathers and analyzes information about local startup markets",
    tools=[web_search, calculator, file_write, python_repl]
)

travel_advisor_agent = Agent(
    system_prompt="You are a travel expert who helps with trip planning and destination advice",
    tools=[web_search, journal]
)

# Convert the agents into tools
@tool
def research_analyst(query: str) -> str:
    response = research_analyst_agent(query)
    return str(response)

@tool
def travel_advisor(query: str) -> str:
    response = travel_advisor_agent(query)
    return str(response)

# Orchestrator naturally delegates to specialists
executive_assistant = Agent(tools=[research_analyst, travel_advisor])
result = executive_assistant("I have a business meeting in Portland next week. Suggest a nice place to stay near the local startup scene, and suggest a few startups to visit")
```

In this abridged example, we define travel and research agents who have specialized prompts and tools for their areas of focus, which the executive assistant agent can call upon for input on the user’s request. The executive assistant agent is responsible for synthesizing input from other agents into the response back to the user.

Learn more about Agents-as-Tools in the [Strands documentation](https://docs.strands.ai/agents-as-tools).

### Handoffs: Explicit Transfer of Control

Handoffs enable agents to explicitly pass responsibility to humans when they encounter tasks outside their expertise, preserving full conversation context during the transfer. Strands provides a built-in `handoff_to_user` tool that agents can use to seamlessly transfer control while maintaining conversation history and context—like a customer service representative asking the customer for more information about their case.

Here’s an example:

```python
from strands import Agent
from strands_tools import handoff_to_user

SYSTEM_PROMPT="""
Answer the user's support query. Ask them questions with the handoff_to_user tool when you need more information
"""

# Include the handoff_to_user tool in our agent's tool list
agent = Agent(
    system_prompt=SYSTEM_PROMPT,
    tools=[handoff_to_user]
)

# The agent calls the handoff_to_user tool which includes the question for the customer
agent("I have a question about my order.")
```

Agents can also ask questions directly to humans when prompted to do so.

```python
from strands import Agent

SYSTEM_PROMPT="""
Answer the user's support query. Ask them questions when you need more information
"""

agent = Agent(
    system_prompt=SYSTEM_PROMPT,
)

# The agent asks questions by streaming them back as text
agent("I have a question about my order.")
```

### Swarms: Self-Organizing Collaborative Teams

A Swarm creates autonomous agent teams that dynamically coordinate through shared memory, allowing multiple specialists to collaborate on complex tasks. Think of it as a brainstorming session where experts build on each other’s ideas, with the team self-organizing to deliver the best collective result.

Here’s an example:

```python
import logging
from strands import Agent
from strands.multiagent import Swarm
from strands_tools import memory, calculator, file_write

# Enables Strands debug logs level, and prints to stderr
logging.getLogger("strands.multiagent").setLevel(logging.DEBUG)
logging.basicConfig(
    format="%(levelname)s | %(name)s | %(message)s",
    handlers=[logging.StreamHandler()]
)

researcher = Agent(
    name="researcher",
    system_prompt="You research topics thoroughly using your memory and built-in knowledge",
    tools=[memory]
)

analyst = Agent(
    name="analyst",
    system_prompt="You analyze data and create insights",
    tools=[calculator, memory]
)

writer = Agent(
    name="writer",
    system_prompt="You write comprehensive reports based on research and analysis",
    tools=[file_write, memory]
)

# Swarm automatically coordinates agents
market_research_team = Swarm([researcher, analyst, writer])
result = market_research_team(
    "What is the history of AI since 1950? Create a comprehensive report"
)
```

Learn more about Swarms in the [Strands documentation](https://docs.strands.ai/swarms).

### Graphs: Deterministic Workflow Control

Graphs let you define explicit agent workflows with conditional routing and decision points, helpful for processes that require specific steps, approvals, or quality gates. Like a well-designed assembly line or approval chain, graphs ensure agents work through predefined business rules in the correct order every time.

Here’s an example:

```python
from strands import Agent
from strands.multiagent import GraphBuilder

analyzer_agent = Agent(
    name="analyzer",
    system_prompt="Analyze customer requests and categorize them",
    tools=[text_classifier, sentiment_analyzer]
)

normal_processor = Agent(
    name="normal_processor",
    system_prompt="Handle routine requests automatically",
    tools=[knowledge_base, auto_responder]
)

critical_processor = Agent(
    name="critical_processor",
    system_prompt="Handle critical requests quickly",
    tools=[knowledge_base, escalate_to_support_agent]
)

# Build deterministic workflow
builder = GraphBuilder()
builder.add_node(analyzer_agent, "analyze")
builder.add_node(normal_processor, "normal_processor")
builder.add_node(critical_processor, "critical_processor")

# Define conditional routing
def is_approved(state):
    return True

def is_critical(state):
    return False

builder.add_edge("analyze", "normal_processor", condition=is_approved)
builder.add_edge("analyze", "critical_processor", condition=is_critical)
builder.set_entry_point("analyze")

customer_support_graph = builder.build()

# Execute the graph with
```

## Real-World Use Cases and Best Practices

### Use Case: Customer Support Automation

One of the most compelling use cases for multi-agent systems is automating customer support. By leveraging the Strands Agents SDK, companies can build a sophisticated customer support system that handles a variety of queries, escalates critical issues, and maintains context throughout the interaction.

#### Step-by-Step Implementation

1. **Define Agents**: Create specialized agents for different aspects of customer support, such as query analysis, routine processing, and critical issue handling.

    ```python
    analyzer_agent = Agent(
        name="analyzer",
        system_prompt="Analyze customer requests and categorize them",
        tools=[text_classifier, sentiment_analyzer]
    )

    normal_processor = Agent(
        name="normal_processor",
        system_prompt="Handle routine requests automatically",
        tools=[knowledge_base, auto_responder]
    )

    critical_processor = Agent(
        name="critical_processor",
        system_prompt="Handle critical requests quickly",
        tools=[knowledge_base, escalate_to_support_agent]
    )
    ```

2. **Build the Workflow Graph**: Define the workflow using the `GraphBuilder` to route requests based on their nature.

    ```python
    builder = GraphBuilder()
    builder.add_node(analyzer_agent, "analyze")
    builder.add_node(normal_processor, "normal_processor")
    builder.add_node(critical_processor, "critical_processor")

    def is_approved(state):
        return True

    def is_critical(state):
        return False

    builder.add_edge("analyze", "normal_processor", condition=is_approved)
    builder.add_edge("analyze", "critical_processor", condition=is_critical)
    builder.set_entry_point("analyze")

    customer_support_graph = builder.build()
    ```

3. **Execute the Workflow**: Use the graph to process incoming customer queries.

    ```python
    result = customer_support_graph("I have an issue with my order.")
    ```

### Use Case: Market Research and Report Generation

Another powerful application of multi-agent systems is in market research and report generation. By leveraging Swarms, companies can create a team of agents that collaborate to gather data, analyze it, and generate comprehensive reports.

#### Step-by-Step Implementation

1. **Define Agents**: Create specialized agents for research, analysis, and writing.

    ```python
    researcher = Agent(
        name="researcher",
        system_prompt="You research topics thoroughly using your memory and built-in knowledge",
        tools=[memory]
    )

    analyst = Agent(
        name="analyst",
        system_prompt="You analyze data and create insights",
        tools=[calculator, memory]
    )

    writer = Agent(
        name="writer",
        system_prompt="You write comprehensive reports based on research and analysis",
        tools=[file_write, memory]
    )
    ```

2. **Create a Swarm**: Combine the agents into a Swarm to collaborate on generating a report.

    ```python
    market_research_team = Swarm([researcher, analyst, writer])
    result = market_research_team(
        "What is the history of AI since 1950? Create a comprehensive report"
    )
    ```

## Best Practices for Building Multi-Agent Systems

### 1. Clearly Define Agent Roles and Responsibilities

Each agent should have a well-defined role and set of responsibilities. This clarity helps in maintaining the system and scaling it effectively.

### 2. Use Conditional Routing for Complex Workflows

Leverage the Graph primitive to define complex workflows with conditional routing. This ensures that the system can handle different types of requests appropriately.

### 3. Maintain Context Throughout Interactions

Use the session manager to maintain context throughout interactions. This is particularly important in customer support scenarios where maintaining conversation history is crucial.

### 4. Leverage Asynchronous Execution

Improve the performance and responsiveness of your multi-agent systems by leveraging asynchronous execution. This allows agents to work in parallel, speeding up the overall process.

### 5. Test and Iterate

Continuously test your multi-agent systems and iterate based on feedback. This helps in identifying bottlenecks and improving the overall efficiency of the system.

## Conclusion

Strands Agents 1.0 represents a significant step forward in making multi-agent orchestration simple, reliable, and production-ready. With the introduction of new primitives like Agents-as-Tools, Handoffs, Swarms, and Graphs, building sophisticated multi-agent systems has never been easier.

Whether you’re looking to automate customer support, generate market research reports, or build any other complex AI application, Strands Agents 1.0 provides the tools and flexibility you need.

Explore the [Strands documentation](https://docs.strands.ai) for more detailed guides and examples, and start building your multi-agent systems today!
