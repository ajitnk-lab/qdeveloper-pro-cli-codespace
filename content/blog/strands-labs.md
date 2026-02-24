---
title: "Strands Labs"
excerpt: "Exploring the Cutting Edge of Agentic Development with Strands Labs"
publishedAt: "2026-02-24"
category: "AWS"
tags: []
author: "CloudNestle Team"
featured: false
---

# Exploring the Cutting Edge of Agentic Development with Strands Labs

## Introduction

Welcome to the forefront of agentic AI development, where experimentation meets innovation. AWS is excited to introduce Strands Labs, a dedicated GitHub organization aimed at providing developers with access to state-of-the-art, experimental approaches in the realm of agentic development. This initiative is designed to foster a community-driven environment where developers can collaborate, innovate, and push the boundaries of what's possible with AI agents.

### What is Strands Labs?

Strands Labs is a new GitHub organization under the Strands umbrella, created to facilitate hands-on experimentation with cutting-edge agentic AI technologies. Unlike the production-ready Strands Agents SDK, which has seen over 14 million downloads since its open-source release in May 2025, Strands Labs is all about exploration and discovery. It's a space where developers can engage with novel projects, contribute to open-source initiatives, and collaborate across Amazon's development teams.

## Why Strands Labs?

The decision to create Strands Labs stems from a desire to separate experimental projects from the production release cycle of the Strands SDK. This separation allows for faster iteration, learning, and growth within the developer community. By fostering an environment where experimentation is encouraged, we aim to accelerate the development of innovative agentic solutions.

### Key Features of Strands Labs

- **Separate GitHub Organization**: Encourages innovation through experimentation.
- **Open to Amazon Development Teams**: Allows for broader contribution and collaboration.
- **Clear Use Cases and Functional Code**: Projects come with detailed documentation and tests to facilitate quick onboarding.
- **Focus on Agentic Development**: Projects are centered around advancing the capabilities of AI agents.

## Diving into Strands Labs Projects

At launch, Strands Labs features three pioneering projects: Robots, Robots Sim, and AI Functions. Each project is designed to explore different aspects of agentic development, from physical interaction to simulated environments and natural language specifications.

### 1. Strands Robots

**Strands Robots** is an initiative to extend AI agents into the physical world. This project focuses on how AI agents can control and interact with physical robots, leveraging a unified Strands Agents interface to connect AI capabilities directly to physical sensors and hardware.

#### Practical Example: SO-101 Robotic Arm

In a lab demonstration, we showcased how a SO-101 robotic arm could be controlled using the NVIDIA GR00T vision-language-action (VLA) model. This model combines visual perception, language understanding, and action prediction into a single framework. By integrating NVIDIA GR00T with Strands Agents, we demonstrated the ability to run sophisticated AI capabilities directly on NVIDIA Jetson edge hardware.

Here's a snippet of how you can use the Strands Robot class to connect hardware to VLA models:

```python
from strands import Agent
from strands_robots import Robot

# Create robot with cameras
robot = Robot(
    tool_name="my_arm",
    robot="so101_follower",
    cameras={
        "front": {"type": "opencv", "index_or_path": "/dev/video0", "fps": 30},
        "wrist": {"type": "opencv", "index_or_path": "/dev/video2", "fps": 30}
    },
    port="/dev/ttyACM0",
    data_config="so100_dualcam"
)

# Create agent with robot tool
agent = Agent(tools=[robot])
agent("place the apple in the basket")
```

This example illustrates how the Robot class can delegate complex reasoning to the cloud using LLMs and other models when needed, while VLA models provide millisecond-level control for physical actions.

### 2. Strands Robots Sim

**Strands Robots Sim** offers a simulated environment for rapid prototyping and algorithm development in agentic robotics. This project allows developers to iterate on agent strategies, test Vision-Language-Action (VLA) model policies, and validate approaches without the need for physical robotic hardware.

#### Features of Strands Robots Sim

- **Libero Benchmark Environments**: Supports a variety of benchmark environments for testing.
- **saac-GR00T VLA Policy Support**: Integrates with saac-GR00T for policy execution.
- **Extensible Interface for VLA Providers**: Allows for easy swapping of VLA models.
- **Simulation Episode Capture**: Records simulation episodes as MP4 videos for review.
- **Non-Blocking Simulation with Status Monitoring**: Enables fast, efficient testing.

Here's an example of how to use the `SimEnv` class from `strands_robots_sim` to control simulated robots within Libero environments:

```python
import asyncio
import argparse

# Example assumes Libero is installed, GR00T inference service is operational, and Docker with isaac-gr00t containers are accessible.

async def run_simulation():
    sim_env = SimEnv(
        environment="libero",
        vla_provider="gr00t",
        inference_port=8000
    )
    
    await sim_env.start()
    await sim_env.run_episode()
    await sim_env.stop()

asyncio.run(run_simulation())
```

### 3. AI Functions

**AI Functions** is an experimental project that allows developers to define agents using natural language specifications instead of traditional code. This approach aims to narrow the trust gap when generating code with Large Language Models (LLMs) by focusing developer time on validating their intentions, with the framework handling the rest.

#### Practical Use Case: Defining Agents with Natural Language

Developers can specify pre and post conditions in Python to validate behavior and generate working implementations. This method simplifies the process of creating complex agentic systems by leveraging the power of natural language.

Here's a basic example of how to define an AI Function:

```python
from strands_ai_functions import AIFunction

def pre_condition():
    return "The apple is on the table."

def post_condition():
    return "The apple is in the basket."

ai_function = AIFunction(
    name="place_apple_in_basket",
    pre_condition=pre_condition,
    post_condition=post_condition
)

ai_function.execute("place the apple in the basket")
```

This example demonstrates how AI Functions can be used to define and execute tasks with clear validation criteria, making it easier for developers to create reliable agentic systems.

## Real-World Use Cases and Best Practices

### Use Case: Autonomous Delivery Robots

One of the most exciting applications of Strands Labs projects is in the development of autonomous delivery robots. These robots can navigate complex environments, interact with physical objects, and make real-time decisions based on sensor data and pre-defined policies.

#### Best Practices

- **Modular Design**: Use a modular approach to allow for easy swapping of components and policies.
- **Simulation First**: Prototype and test algorithms in a simulated environment before deploying them in the real world.
- **Cloud-Edge Collaboration**: Leverage cloud computing for complex reasoning tasks and edge computing for real-time actions.

### Use Case: Smart Manufacturing

In smart manufacturing, AI agents can control robotic arms to perform precise tasks, such as assembling components or quality inspection. Strands Robots and Robots Sim can be used to develop and test these agents in a controlled environment.

#### Best Practices

- **Data-Driven Approaches**: Use data from sensors and previous tasks to improve agent performance.
- **Iterative Testing**: Continuously iterate on agent strategies based on simulation and real-world feedback.
- **Scalability**: Design agents to scale from prototyping to enterprise production workloads.

## Conclusion

Strands Labs represents a bold step forward in the world of agentic development. By providing a dedicated space for experimentation and collaboration, AWS aims to foster a vibrant community of developers who are passionate about pushing the boundaries of what AI agents can achieve. Whether you're interested in physical robotics, simulated environments, or natural language specifications, Strands Labs offers a wealth of opportunities to explore and innovate.

We invite you to join us on this journey. Visit the [Strands Labs GitHub organization](https://github.com/strands-labs) to get started with our projects, contribute your own innovations, and be part of the future of agentic AI development.
