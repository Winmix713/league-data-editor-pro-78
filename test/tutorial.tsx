import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Progress, Accordion, AccordionItem, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const Tutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = React.useState<string | null>(null);
  const [completedTutorials, setCompletedTutorials] = React.useState<string[]>([]);
  
  const tutorials = [
    {
      id: "basics",
      title: "Prompt Engineering Fundamentals",
      description: "Learn the basic principles and concepts of effective prompt engineering",
      duration: "15 min",
      level: "Beginner",
      icon: "lucide:book-open",
      progress: 0,
      sections: [
        {
          title: "What is Prompt Engineering?",
          content: `
            <div class="space-y-4">
              <p>Prompt engineering is the process of designing and refining inputs to AI systems to get desired outputs. It's a crucial skill for effectively working with large language models (LLMs) and other AI tools.</p>
              
              <h4 class="text-lg font-semibold">Key Concepts:</h4>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Prompts</strong>: Instructions or queries given to an AI system</li>
                <li><strong>Context</strong>: Background information that helps the AI understand the request</li>
                <li><strong>Constraints</strong>: Limitations or requirements for the AI's response</li>
                <li><strong>Examples</strong>: Demonstrations that guide the AI toward desired outputs</li>
              </ul>
              
              <div class="bg-primary-50 p-4 rounded-lg">
                <h4 class="font-semibold flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" class="text-primary" />
                  Why Prompt Engineering Matters
                </h4>
                <p>The same AI model can produce dramatically different results based on how prompts are formulated. Effective prompt engineering can be the difference between unusable outputs and exceptional results.</p>
              </div>
            </div>
          `
        },
        {
          title: "Core Principles of Effective Prompts",
          content: `
            <div class="space-y-4">
              <p>Creating effective prompts follows several key principles that help ensure clear communication with AI systems:</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-content2 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="lucide:check-circle" class="text-success" />
                    Be Specific
                  </h4>
                  <p>Clearly state what you want, including format, style, length, and other requirements.</p>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="lucide:check-circle" class="text-success" />
                    Provide Context
                  </h4>
                  <p>Give relevant background information to help the AI understand the task properly.</p>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="lucide:check-circle" class="text-success" />
                    Use Examples
                  </h4>
                  <p>Demonstrate the desired output format or style with examples when helpful.</p>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h4 class="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="lucide:check-circle" class="text-success" />
                    Iterate
                  </h4>
                  <p>Refine prompts based on results, gradually improving outputs through feedback.</p>
                </div>
              </div>
              
              <div class="mt-4">
                <h4 class="text-lg font-semibold">Example:</h4>
                <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-2">
                  <p class="text-danger">❌ Weak prompt:</p>
                  <p>"Write about climate change."</p>
                  
                  <p class="text-success mt-4">✅ Strong prompt:</p>
                  <p>"Write a 500-word explanation of climate change causes and solutions. Include recent scientific data, focus on both individual and policy-level actions, and conclude with hopeful but realistic future scenarios. Target audience is high school students with basic science knowledge."</p>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "The Prompt-Response Cycle",
          content: `
            <div class="space-y-4">
              <p>Prompt engineering is an iterative process that follows a cycle of refinement:</p>
              
              <div class="relative py-8">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                  <div class="w-full md:w-48 p-4 bg-primary-100 rounded-lg text-center">
                    <div class="mb-2 flex justify-center">
                      <Icon icon="lucide:edit-3" class="text-primary" width={24} height={24} />
                    </div>
                    <h5 class="font-medium">1. Draft Prompt</h5>
                    <p class="text-sm text-default-600">Create initial instructions</p>
                  </div>
                  
                  <div class="hidden md:block h-0.5 flex-1 bg-default-200 relative">
                    <Icon 
                      icon="lucide:chevron-right"
                      class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-default-400"
                      width={20}
                    />
                  </div>
                  
                  <div class="md:hidden flex justify-center w-full">
                    <Icon icon="lucide:chevron-down" class="text-default-400" width={20} height={20} />
                  </div>
                  
                  <div class="w-full md:w-48 p-4 bg-secondary-100 rounded-lg text-center">
                    <div class="mb-2 flex justify-center">
                      <Icon icon="lucide:send" class="text-secondary" width={24} height={24} />
                    </div>
                    <h5 class="font-medium">2. Submit to AI</h5>
                    <p class="text-sm text-default-600">Get AI response</p>
                  </div>
                  
                  <div class="hidden md:block h-0.5 flex-1 bg-default-200 relative">
                    <Icon 
                      icon="lucide:chevron-right"
                      class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-default-400"
                      width={20}
                    />
                  </div>
                  
                  <div class="md:hidden flex justify-center w-full">
                    <Icon icon="lucide:chevron-down" class="text-default-400" width={20} height={20} />
                  </div>
                  
                  <div class="w-full md:w-48 p-4 bg-success-100 rounded-lg text-center">
                    <div class="mb-2 flex justify-center">
                      <Icon icon="lucide:check-square" class="text-success" width={24} height={24} />
                    </div>
                    <h5 class="font-medium">3. Evaluate Result</h5>
                    <p class="text-sm text-default-600">Assess output quality</p>
                  </div>
                  
                  <div class="hidden md:block h-0.5 flex-1 bg-default-200 relative">
                    <Icon 
                      icon="lucide:chevron-right"
                      class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-default-400"
                      width={20}
                    />
                  </div>
                  
                  <div class="md:hidden flex justify-center w-full">
                    <Icon icon="lucide:chevron-down" class="text-default-400" width={20} height={20} />
                  </div>
                  
                  <div class="w-full md:w-48 p-4 bg-warning-100 rounded-lg text-center">
                    <div class="mb-2 flex justify-center">
                      <Icon icon="lucide:refresh-cw" class="text-warning" width={24} height={24} />
                    </div>
                    <h5 class="font-medium">4. Refine Prompt</h5>
                    <p class="text-sm text-default-600">Improve based on results</p>
                  </div>
                </div>
                
                <div class="hidden md:block absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div class="flex items-center justify-center">
                    <div class="w-24 h-24 rounded-full border-2 border-dashed border-default-300 flex items-center justify-center">
                      <Icon icon="lucide:repeat" class="text-default-400" width={24} height={24} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-primary-50 p-4 rounded-lg mt-6">
                <h4 class="font-semibold flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" class="text-primary" />
                  Pro Tip
                </h4>
                <p>Keep a prompt journal to track what works and what doesn't. Document your prompts, the results they produced, and your refinements. This creates a valuable resource for future prompt engineering tasks.</p>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced Prompt Techniques",
      description: "Master sophisticated prompt engineering strategies for complex tasks",
      duration: "25 min",
      level: "Intermediate",
      icon: "lucide:zap",
      progress: 0,
      sections: [
        {
          title: "Role-Based Prompting",
          content: `
            <div class="space-y-4">
              <p>Role-based prompting involves instructing the AI to adopt a specific persona or expertise when generating responses. This technique can dramatically improve the quality and relevance of AI outputs.</p>
              
              <h4 class="text-lg font-semibold">How It Works:</h4>
              <p>By assigning a role to the AI, you frame its response from a particular perspective, knowledge base, or communication style. This helps focus the AI's vast knowledge into a more specialized and appropriate response.</p>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-4">
                <p class="text-success font-medium">Example Format:</p>
                <p>"Act as a [role/profession/expert] and [task description]."</p>
                
                <p class="mt-4 text-success font-medium">Specific Examples:</p>
                <ul class="space-y-2 mt-2">
                  <li>"Act as an experienced React developer and review this code for best practices and potential optimizations."</li>
                  <li>"As a professional copywriter specializing in SaaS products, write a compelling headline and three bullet points for our new project management tool."</li>
                  <li>"Taking on the role of a UX researcher, analyze this user flow and identify potential pain points and improvements."</li>
                </ul>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div class="bg-success-100 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Benefits</h5>
                  <ul class="space-y-1">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>More specialized knowledge application</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Appropriate tone and terminology</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Better structured responses</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>More consistent perspective</span>
                    </li>
                  </ul>
                </div>
                
                <div class="bg-warning-100 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Best Practices</h5>
                  <ul class="space-y-1">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <span>Choose roles relevant to the task</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <span>Be specific about expertise level</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <span>Combine with clear task instructions</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <span>Avoid roles that encourage harmful content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Chain-of-Thought Prompting",
          content: `
            <div class="space-y-4">
              <p>Chain-of-Thought (CoT) prompting is a technique that encourages AI systems to break down complex reasoning tasks into step-by-step thinking processes. This approach significantly improves performance on tasks requiring multi-step reasoning.</p>
              
              <h4 class="text-lg font-semibold">How It Works:</h4>
              <p>Instead of asking for a direct answer, you prompt the AI to work through a problem step by step, showing its reasoning process. This helps the AI organize its thoughts and reduces errors in complex tasks.</p>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-4">
                <p class="text-success font-medium">Example Format:</p>
                <p>"[Problem statement]. Let's think through this step by step."</p>
                
                <p class="mt-4 text-success font-medium">Specific Example:</p>
                <p class="mt-2">Standard prompt: "What's the result of 17 × 24?"</p>
                <p class="mt-2">Chain-of-Thought prompt: "What's the result of 17 × 24? Let's break this down step by step to find the answer."</p>
                
                <p class="mt-4 text-primary font-medium">AI Response with CoT:</p>
                <p class="mt-2">To multiply 17 × 24:</p>
                <ol class="list-decimal pl-5 mt-2 space-y-1">
                  <li>First, I'll multiply 17 × 4 = 68</li>
                  <li>Then, I'll multiply 17 × 20 = 340</li>
                  <li>Now I'll add these results: 68 + 340 = 408</li>
                </ol>
                <p class="mt-2">Therefore, 17 × 24 = 408</p>
              </div>
              
              <div class="bg-primary-50 p-4 rounded-lg mt-6">
                <h4 class="font-semibold flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" class="text-primary" />
                  When to Use Chain-of-Thought
                </h4>
                <p>This technique is particularly effective for:</p>
                <ul class="mt-2 space-y-1">
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span>Mathematical problems</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span>Logical reasoning tasks</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span>Complex decision-making scenarios</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span>Debugging code or identifying errors</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span>Analyzing multi-factor situations</span>
                  </li>
                </ul>
              </div>
            </div>
          `
        },
        {
          title: "Few-Shot Learning",
          content: `
            <div class="space-y-4">
              <p>Few-shot learning is a powerful technique where you provide the AI with a few examples of the desired input-output pattern before asking it to perform a similar task. This helps the AI understand exactly what you're looking for.</p>
              
              <h4 class="text-lg font-semibold">How It Works:</h4>
              <p>By showing the AI 2-5 examples of how inputs should be transformed into outputs, you establish a pattern that the AI can then apply to new inputs. This is particularly useful for formatting tasks, classification, or generating content in specific styles.</p>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-4">
                <p class="text-success font-medium">Example Format:</p>
                <p>
                  Input: [example input 1]<br/>
                  Output: [example output 1]<br/><br/>
                  
                  Input: [example input 2]<br/>
                  Output: [example output 2]<br/><br/>
                  
                  Input: [example input 3]<br/>
                  Output: [example output 3]<br/><br/>
                  
                  Input: [actual input]<br/>
                  Output:
                </p>
                
                <p class="mt-4 text-success font-medium">Specific Example (Text Classification):</p>
                <p class="mt-2">
                  Input: "This product completely failed to meet my expectations."<br/>
                  Output: Negative<br/><br/>
                  
                  Input: "The delivery was on time and the item was exactly as described."<br/>
                  Output: Positive<br/><br/>
                  
                  Input: "It's an okay product but I probably wouldn't buy it again."<br/>
                  Output: Neutral<br/><br/>
                  
                  Input: "I've been using this for a week and am very impressed with the quality."<br/>
                  Output:
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="bg-success-100 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Best Practices</h5>
                  <ul class="space-y-1">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Use diverse examples</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Keep a consistent format</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Order from simple to complex</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                      <span>Include edge cases when relevant</span>
                    </li>
                  </ul>
                </div>
                
                <div class="bg-primary-50 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Applications</h5>
                  <ul class="space-y-1">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check-circle" class="text-primary mt-1" width={16} />
                      <span>Data formatting and transformation</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check-circle" class="text-primary mt-1" width={16} />
                      <span>Text classification</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check-circle" class="text-primary mt-1" width={16} />
                      <span>Content generation in specific styles</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:check-circle" class="text-primary mt-1" width={16} />
                      <span>Code transformation patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "domain",
      title: "Domain-Specific Prompt Engineering",
      description: "Specialized techniques for code generation, content creation, and design",
      duration: "20 min",
      level: "Advanced",
      icon: "lucide:code",
      progress: 0,
      sections: [
        {
          title: "Code Generation Prompts",
          content: `
            <div class="space-y-4">
              <p>Generating high-quality code with AI requires specialized prompt techniques that account for technical requirements, best practices, and implementation details.</p>
              
              <h4 class="text-lg font-semibold">Key Elements of Effective Code Prompts:</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:code" class="text-primary" width={18} />
                    Technical Specifications
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Language/framework requirements</li>
                    <li>Version constraints</li>
                    <li>Dependencies to use or avoid</li>
                    <li>Performance considerations</li>
                  </ul>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:layout" class="text-secondary" width={18} />
                    Structure Guidelines
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Architecture patterns</li>
                    <li>Component breakdown</li>
                    <li>File organization</li>
                    <li>Naming conventions</li>
                  </ul>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:shield" class="text-success" width={18} />
                    Quality Requirements
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Error handling approach</li>
                    <li>Testing expectations</li>
                    <li>Documentation needs</li>
                    <li>Security considerations</li>
                  </ul>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:puzzle" class="text-warning" width={18} />
                    Context Information
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Existing codebase details</li>
                    <li>Integration points</li>
                    <li>Business logic constraints</li>
                    <li>User requirements</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-6">
                <p class="text-success font-medium">Example Code Generation Prompt:</p>
                <p class="mt-2">
                  "Create a React component for a user profile card with the following specifications:
                  
                  Technical requirements:
                  - Use React 18 with TypeScript
                  - Use functional components with hooks
                  - Style with Tailwind CSS
                  - Must be responsive (mobile-first)
                  
                  Component features:
                  - Display user avatar, name, title, and bio
                  - Show user stats (followers, following, posts)
                  - Include a 'Follow' button that toggles state
                  - Implement a loading skeleton state
                  
                  Code quality requirements:
                  - Include proper TypeScript interfaces
                  - Add accessibility attributes
                  - Include basic unit tests with React Testing Library
                  - Add JSDoc comments for key functions
                  
                  The component will be used in a dashboard application with a dark mode design system."
                </p>
              </div>
              
              <div class="bg-primary-50 p-4 rounded-lg mt-4">
                <h4 class="font-semibold flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" class="text-primary" />
                  Pro Tips for Code Generation
                </h4>
                <ul class="mt-2 space-y-2">
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Provide partial implementations</strong> when you have specific requirements for certain sections</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Request explanatory comments</strong> to better understand the generated code</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Ask for alternative approaches</strong> to explore different implementation options</span>
                  </li>
                </ul>
              </div>
            </div>
          `
        },
        {
          title: "Content Creation Prompts",
          content: `
            <div class="space-y-4">
              <p>Creating high-quality written content with AI requires prompts that clearly define tone, style, audience, and purpose. Well-crafted content prompts lead to more engaging, relevant, and effective text.</p>
              
              <h4 class="text-lg font-semibold">Essential Elements for Content Prompts:</h4>
              
              <div class="overflow-x-auto">
                <table class="min-w-full mt-4">
                  <thead>
                    <tr class="border-b border-default-200">
                      <th class="py-3 px-4 text-left">Element</th>
                      <th class="py-3 px-4 text-left">Description</th>
                      <th class="py-3 px-4 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-default-100">
                      <td class="py-3 px-4 font-medium">Audience</td>
                      <td class="py-3 px-4">Who will read this content</td>
                      <td class="py-3 px-4">"Technical professionals with basic AI knowledge"</td>
                    </tr>
                    <tr class="border-b border-default-100">
                      <td class="py-3 px-4 font-medium">Purpose</td>
                      <td class="py-3 px-4">Goal of the content</td>
                      <td class="py-3 px-4">"To educate and persuade potential customers"</td>
                    </tr>
                    <tr class="border-b border-default-100">
                      <td class="py-3 px-4 font-medium">Tone</td>
                      <td class="py-3 px-4">Emotional quality</td>
                      <td class="py-3 px-4">"Professional but conversational"</td>
                    </tr>
                    <tr class="border-b border-default-100">
                      <td class="py-3 px-4 font-medium">Format</td>
                      <td class="py-3 px-4">Structure and organization</td>
                      <td class="py-3 px-4">"Blog post with H2/H3 headings and bullet points"</td>
                    </tr>
                    <tr>
                      <td class="py-3 px-4 font-medium">Length</td>
                      <td class="py-3 px-4">Word or character count</td>
                      <td class="py-3 px-4">"800-1000 words"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-6">
                <p class="text-success font-medium">Example Content Creation Prompt:</p>
                <p class="mt-2">
                  "Write a blog post about the benefits of prompt engineering for business productivity.
                  
                  Audience: Business professionals who are familiar with AI but not technical experts
                  Purpose: To educate readers about practical applications and convince them to invest time in learning prompt engineering
                  Tone: Professional, informative, and encouraging
                  Format: 
                  - Engaging introduction with a hook
                  - 4-5 main sections with descriptive H2 headings
                  - Each section should include a real-world example or case study
                  - Include actionable takeaways in each section
                  - Conclusion with next steps
                  Length: Approximately 1200 words
                  
                  Additional requirements:
                  - Include statistics where relevant (can be approximate)
                  - Avoid overly technical jargon
                  - Include a brief 'getting started' section at the end
                  - Optimize for readability with short paragraphs and varied sentence structure"
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="bg-success-100 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Content Types & Special Considerations</h5>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:file-text" class="text-success mt-1" width={16} />
                      <div>
                        <span class="font-medium">Blog Posts:</span>
                        <span class="text-sm block">Specify SEO requirements, target keywords</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:mail" class="text-success mt-1" width={16} />
                      <div>
                        <span class="font-medium">Email Copy:</span>
                        <span class="text-sm block">Include subject lines, specify CTA</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:shopping-bag" class="text-success mt-1" width={16} />
                      <div>
                        <span class="font-medium">Product Descriptions:</span>
                        <span class="text-sm block">Include key features, benefits, specifications</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:megaphone" class="text-success mt-1" width={16} />
                      <div>
                        <span class="font-medium">Social Media:</span>
                        <span class="text-sm block">Specify platform, character limits, hashtag strategy</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div class="bg-warning-100 p-4 rounded-lg">
                  <h5 class="font-medium mb-2">Common Pitfalls to Avoid</h5>
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <div>
                        <span class="font-medium">Vague Instructions:</span>
                        <span class="text-sm block">"Write something good about AI" is too general</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <div>
                        <span class="font-medium">Contradictory Requirements:</span>
                        <span class="text-sm block">Asking for "detailed but brief" content</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <div>
                        <span class="font-medium">Missing Context:</span>
                        <span class="text-sm block">Not specifying industry, brand voice, or audience</span>
                      </div>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon icon="lucide:alert-triangle" class="text-warning mt-1" width={16} />
                      <div>
                        <span class="font-medium">Unrealistic Expectations:</span>
                        <span class="text-sm block">Expecting highly specific industry knowledge without context</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          title: "Design and Visual Prompts",
          content: `
            <div class="space-y-4">
              <p>Creating effective prompts for design and visual content generation requires a different approach than text or code prompts. Visual prompts need to clearly communicate style, composition, and aesthetic qualities.</p>
              
              <h4 class="text-lg font-semibold">Key Components for Visual Prompts:</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:palette" class="text-primary" width={18} />
                    Style Elements
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Artistic style/movement</li>
                    <li>Color palette/scheme</li>
                    <li>Texture and materials</li>
                    <li>Historical or cultural references</li>
                    <li>Mood and atmosphere</li>
                  </ul>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:layout" class="text-secondary" width={18} />
                    Composition Details
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Subject placement</li>
                    <li>Perspective/viewpoint</li>
                    <li>Foreground/background elements</li>
                    <li>Aspect ratio and framing</li>
                    <li>Focal points</li>
                  </ul>
                </div>
                
                <div class="bg-content2 p-4 rounded-lg">
                  <h5 class="font-medium mb-2 flex items-center gap-2">
                    <Icon icon="lucide:settings" class="text-success" width={18} />
                    Technical Specifications
                  </h5>
                  <ul class="space-y-1 text-sm">
                    <li>Resolution/dimensions</li>
                    <li>Lighting conditions</li>
                    <li>Rendering style</li>
                    <li>Level of detail</li>
                    <li>Format requirements</li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-content1 p-4 rounded-md font-mono text-sm mt-6">
                <p class="text-success font-medium">Example UI Design Prompt:</p>
                <p class="mt-2">
                  "Design a mobile app dashboard for a personal finance application with the following specifications:
                  
                  Style:
                  - Clean, minimalist design with a professional feel
                  - Color scheme: Primary blue (#1E88E5) with white background and dark gray text
                  - Use subtle shadows for depth and hierarchy
                  - Follow Material Design principles with rounded corners
                  
                  Content Requirements:
                  - Account balance summary at the top
                  - Recent transactions list (last 5)
                  - Monthly spending chart (simple bar or pie chart)
                  - Quick action buttons for common tasks
                  - Bottom navigation with 4 main sections
                  
                  Technical Details:
                  - Design for iPhone 13 screen size (390x844)
                  - Include both light and dark mode versions
                  - Ensure text meets accessibility standards (minimum contrast 4.5:1)
                  - Include appropriate spacing for touch targets (minimum 44x44px)
                  
                  Target Audience:
                  - Young professionals (25-40 years old)
                  - Focus on clarity and ease of understanding financial information at a glance"
                </p>
              </div>
              
              <div class="bg-primary-50 p-4 rounded-lg mt-6">
                <h4 class="font-semibold flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" class="text-primary" />
                  Visual Prompt Best Practices
                </h4>
                <ul class="mt-2 space-y-2">
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Use reference images</strong> when possible (e.g., "similar to [reference]")</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Be specific about what NOT to include</strong> to avoid unwanted elements</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Prioritize your requirements</strong> to ensure the most important aspects are addressed</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon icon="lucide:check" class="text-success mt-1" width={16} />
                    <span><strong>Use specific terminology</strong> from design and art to communicate visual concepts</span>
                  </li>
                </ul>
              </div>
            </div>
          `
        }
      ]
    }
  ];
  
  const handleStartTutorial = (id: string) => {
    setSelectedTutorial(id);
  };
  
  const handleCompleteTutorial = (id: string) => {
    if (!completedTutorials.includes(id)) {
      setCompletedTutorials([...completedTutorials, id]);
    }
    setSelectedTutorial(null);
  };
  
  const renderTutorialCard = (tutorial: any) => {
    const isCompleted = completedTutorials.includes(tutorial.id);
    
    return (
      <Card key={tutorial.id} className={`${isCompleted ? 'border-2 border-success' : ''}`}>
        <CardBody>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full bg-${tutorial.id === 'basics' ? 'primary' : tutorial.id === 'advanced' ? 'secondary' : 'success'}-100`}>
              <Icon 
                icon={tutorial.icon} 
                className={`text-${tutorial.id === 'basics' ? 'primary' : tutorial.id === 'advanced' ? 'secondary' : 'success'}`} 
                width={24} 
                height={24} 
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                  <p className="text-default-600 text-sm mt-1">{tutorial.description}</p>
                </div>
                
                {isCompleted && (
                  <div className="bg-success-100 p-1 rounded-full">
                    <Icon icon="lucide:check" className="text-success" width={16} height={16} />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-default-500">
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:clock" width={14} height={14} />
                  <span>{tutorial.duration}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:bar-chart-2" width={14} height={14} />
                  <span>{tutorial.level}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:book-open" width={14} height={14} />
                  <span>{tutorial.sections.length} sections</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button 
            color={isCompleted ? "success" : "primary"} 
            variant={isCompleted ? "flat" : "solid"}
            onPress={() => handleStartTutorial(tutorial.id)}
            endContent={<Icon icon={isCompleted ? "lucide:refresh" : "lucide:arrow-right"} width={16} height={16} />}
            fullWidth
          >
            {isCompleted ? "Review Again" : "Start Tutorial"}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const renderTutorialContent = () => {
    const tutorial = tutorials.find(t => t.id === selectedTutorial);
    if (!tutorial) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="flat" 
            size="sm" 
            isIconOnly 
            onPress={() => setSelectedTutorial(null)}
          >
            <Icon icon="lucide:arrow-left" width={16} height={16} />
          </Button>
          
          <h2 className="text-2xl font-bold">{tutorial.title}</h2>
        </div>
        
        <Card>
          <CardBody>
            <Accordion>
              {tutorial.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  aria-label={section.title}
                  title={section.title}
                  startContent={
                    <div className="bg-primary-100 p-1 rounded-full">
                      <Icon icon="lucide:file-text" className="text-primary" width={16} height={16} />
                    </div>
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-default-600">
                {completedTutorials.includes(tutorial.id) 
                  ? "You've completed this tutorial!" 
                  : "Complete all sections to mark as finished"}
              </p>
              
              <Button 
                color="success" 
                onPress={() => handleCompleteTutorial(tutorial.id)}
                endContent={<Icon icon="lucide:check" width={16} height={16} />}
              >
                Mark as Complete
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {selectedTutorial ? (
        renderTutorialContent()
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Prompt Engineering Tutorials</h2>
            <p className="text-default-600">
              Learn the art and science of prompt engineering through our comprehensive tutorials.
              Master techniques from basic to advanced and apply them to your specific domain.
            </p>
          </div>
          
          <Card className="mb-6 bg-gradient-to-r from-primary-100 to-secondary-100">
            <CardBody>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Icon icon="lucide:book-open" className="text-primary" width={48} height={48} />
                  </div>
                </div>
                
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Your Learning Journey</h3>
                  <p className="mb-4">Track your progress through our prompt engineering curriculum. Complete all tutorials to become a prompt engineering expert!</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-medium">{Math.round((completedTutorials.length / tutorials.length) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(completedTutorials.length / tutorials.length) * 100} 
                        color="primary"
                        className="h-2"
                        aria-label="Learning progress"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {tutorials.map((tutorial) => (
                        <Tooltip key={tutorial.id} content={completedTutorials.includes(tutorial.id) ? "Completed" : "Not completed"}>
                          <div 
                            className={`w-3 h-3 rounded-full ${
                              completedTutorials.includes(tutorial.id) 
                                ? 'bg-success' 
                                : 'bg-default-200'
                            }`}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorials.map(renderTutorialCard)}
          </div>
        </>
      )}
    </div>
  );
};
