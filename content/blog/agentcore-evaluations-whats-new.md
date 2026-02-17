---
title: "AgentCore Evaluations - Whats new"
excerpt: "Unlocking the Full Potential of AI Agents with Amazon Bedrock AgentCore"
publishedAt: "2026-02-17"
category: "AI/ML"
tags: []
author: "CloudNestle Team"
featured: false
---

# Unlocking the Full Potential of AI Agents with Amazon Bedrock AgentCore

## Introduction

In the rapidly evolving landscape of artificial intelligence, the deployment of AI agents has become a cornerstone for innovation across various industries. However, the journey from development to production is often fraught with challenges, particularly when it comes to ensuring the quality, security, and compliance of these agents. Amazon Bedrock AgentCore is at the forefront of addressing these challenges, offering a robust platform for building, deploying, and managing AI agents at scale. This blog post delves into the latest enhancements in AgentCore, specifically focusing on the introduction of quality evaluations and policy controls, which are designed to facilitate the deployment of trusted AI agents.

## The AgentCore Advantage

Amazon Bedrock AgentCore has quickly established itself as a leading platform for AI agent development. Since its preview launch just five months ago, the AgentCore SDK has been downloaded over 2 million times, underscoring its widespread adoption and utility. Organizations like PGA TOUR, Workday, and Grupo Elfa have leveraged AgentCore to revolutionize their operations, achieving significant improvements in efficiency, cost reduction, and operational transparency.

### Real-World Impact

- **PGA TOUR**: By deploying a multi-agent content generation system built on AgentCore, PGA TOUR has increased its content writing speed by 1,000 percent while reducing costs by 95 percent. This solution provides comprehensive coverage for every player, enhancing digital platform engagement.
- **Workday**: Utilizing AgentCore Code Interpreter, Workday has integrated secure data protection and essential features for financial data exploration into its Planning Agent. This capability allows users to analyze financial and operational data through natural language queries, reducing time spent on routine planning analysis by 30 percent and saving approximately 100 hours per month.
- **Grupo Elfa**: Grupo Elfa employs AgentCore Observability for complete audit traceability and real-time metrics, transforming reactive processes into proactive operations. This has resulted in 100 percent traceability of agent decisions and interactions, cutting problem resolution time by 50 percent.

## New Capabilities in AgentCore

As organizations scale their agent deployments, they encounter challenges in implementing the right boundaries and quality checks to ensure agents operate within acceptable parameters. The new capabilities in AgentCore aim to address these challenges, enabling organizations to deploy AI agents with confidence.

### Policy in AgentCore (Preview)

**Policy in AgentCore** introduces fine-grained permissions to define clear boundaries for agent actions. This feature intercepts AgentCore Gateway tool calls before they are executed, applying policies that ensure agents operate within predefined limits. 

#### How It Works

Policies can be created using natural language descriptions or directly using Cedar, an open-source policy language. This flexibility allows development, security, and compliance teams to create, understand, and audit rules without requiring specialized coding knowledge. 

```cedar
permit(
  principal in AgentCore::OAuthUser,
  action == AgentCore::Action::"RefundTool__process_refund",
  resource == AgentCore::Gateway::"<GATEWAY_ARN>"
) when {
  principal.hasTag("role") &&
  principal.getTag("role") == "refund-agent" &&
  context.input.amount < 200
};
```

This sample policy ensures that only authenticated users with the `refund-agent` role can access the refund tool for amounts lower than $200 USD.

### AgentCore Evaluations (Preview)

**AgentCore Evaluations** is a fully managed service that continuously monitors and analyzes agent performance based on real-world behavior. It uses built-in evaluators for common quality dimensions such as correctness and helpfulness, as well as custom evaluators for business-specific requirements.

#### Continuous Quality Intelligence

With AgentCore Evaluations, organizations can ensure that their AI agents maintain high standards of performance. The service provides real-time insights into agent behavior, allowing teams to identify and address issues promptly. 

### Expanded Agent Capabilities

In addition to policy controls and quality evaluations, AgentCore introduces features that enhance agent functionality:

- **Episodic Functionality in AgentCore Memory**: This long-term strategy allows agents to learn from past experiences and adapt solutions across similar situations, improving consistency and performance.
- **Bidirectional Streaming in AgentCore Runtime**: This feature enables voice agents to engage in natural conversations where both users and agents can speak simultaneously, enhancing the user experience.

## Practical Implementation

### Setting Up Policy in AgentCore

To implement Policy in AgentCore, follow these steps:

1. **Create a Policy Engine**: Navigate to the Policy section in the AgentCore console and create a new policy engine.
2. **Associate Gateways**: Link one or more AgentCore gateways to the policy engine.
3. **Define Policies**: Use natural language descriptions or Cedar code to define policies. For example:
    ```cedar
    permit(
      principal in AgentCore::OAuthUser,
      action == AgentCore::Action::"AccessTool",
      resource == AgentCore::Gateway::"<GATEWAY_ARN>"
    ) when {
      principal.hasTag("role") &&
      principal.getTag("role") == "admin"
    };
    ```
4. **Enforce or Log**: Choose whether to enforce the policy (permit or deny access) or emit logs for testing and validation.

### Utilizing AgentCore Evaluations

To leverage AgentCore Evaluations:

1. **Enable the Service**: Activate AgentCore Evaluations in the console.
2. **Configure Evaluators**: Set up built-in and custom evaluators to monitor agent performance.
3. **Analyze Results**: Review the continuous feedback provided by the service to make informed decisions about agent improvements.

## Best Practices for Deploying Trusted AI Agents

### Define Clear Boundaries

Clearly define the actions and data access permissions for your agents. Use Policy in AgentCore to create fine-grained permissions that align with your organizational policies and compliance requirements.

### Continuous Monitoring

Implement AgentCore Evaluations to continuously monitor agent performance. Use the insights gained to make data-driven decisions and maintain high standards of agent quality.

### Iterative Improvement

Adopt an iterative approach to agent development. Use the feedback from AgentCore Evaluations to refine agent behaviors and enhance performance over time.

### Cross-Functional Collaboration

Foster collaboration between development, security, and compliance teams. Ensure that everyone involved in the agent deployment process understands the policies and quality checks in place.

## Conclusion

The new capabilities in Amazon Bedrock AgentCore—Policy in AgentCore and AgentCore Evaluations—empower organizations to deploy AI agents with confidence. By defining clear boundaries and continuously monitoring agent performance, organizations can ensure that their AI agents operate within acceptable parameters while delivering high-quality results. As the adoption of AI agents continues to grow, these enhancements will play a crucial role in facilitating secure, compliant, and efficient agent deployments.
