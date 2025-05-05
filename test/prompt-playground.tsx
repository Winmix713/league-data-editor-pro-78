import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Textarea, Select, SelectItem, Tabs, Tab, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

export const PromptPlayground = () => {
  const [prompt, setPrompt] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("editor");
  const [savedPrompts, setSavedPrompts] = React.useState<{id: string, title: string, prompt: string}[]>([
    {
      id: "1",
      title: "Code Review Prompt",
      prompt: "Act as an experienced software engineer with expertise in React and TypeScript. Review the following code for best practices, potential bugs, performance issues, and security concerns. Provide specific recommendations for improvements with code examples where applicable."
    },
    {
      id: "2",
      title: "Blog Post Outline",
      prompt: "Create a detailed outline for a blog post about prompt engineering best practices. The target audience is technical professionals who want to improve their AI interactions. Include an introduction, at least 5 main sections with subsections, and a conclusion. For each section, provide a brief description of the content to be included."
    }
  ]);
  
  const templates = [
    {
      id: "role-based",
      name: "Role-Based Prompt",
      description: "Assign a specific role to the AI",
      template: "Act as a [role/profession] with expertise in [specific domain]. [Your request here]"
    },
    {
      id: "step-by-step",
      name: "Step-by-Step Instructions",
      description: "Break down complex tasks",
      template: "I need you to [main task]. Please follow these steps:\n1. First, [step one]\n2. Then, [step two]\n3. Next, [step three]\n4. Finally, [step four]"
    },
    {
      id: "few-shot",
      name: "Few-Shot Learning",
      description: "Provide examples to follow",
      template: "I want you to [task description]. Here are some examples:\n\nInput: [example input 1]\nOutput: [example output 1]\n\nInput: [example input 2]\nOutput: [example output 2]\n\nNow, please do the same for:\nInput: [your input]"
    },
    {
      id: "constraints",
      name: "Constraints-Based",
      description: "Set clear boundaries",
      template: "Generate [content type] with the following constraints:\n- Must be [length/size constraint]\n- Should include [required elements]\n- Must avoid [elements to exclude]\n- Should follow [style/tone requirements]\n- Target audience is [audience description]"
    }
  ];
  
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setPrompt(template.template);
      }
    }
  };
  
  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate a mock response based on the prompt
      let mockResponse = "";
      
      if (prompt.includes("code") || prompt.includes("programming")) {
        mockResponse = "Based on your request about code, here's my analysis and suggestions:\n\n";
        mockResponse += "```javascript\n// This is a sample code implementation\nfunction optimizedFunction(data) {\n  // Implementation details\n  return processedData;\n}\n```\n\n";
        mockResponse += "The code above demonstrates a more efficient approach because it:\n1. Reduces time complexity\n2. Improves readability\n3. Follows best practices for error handling";
      } else if (prompt.includes("outline") || prompt.includes("blog")) {
        mockResponse = "# Proposed Outline\n\n## Introduction\n- Hook to engage readers\n- Brief overview of the topic\n- Why this matters to the audience\n\n## Main Section 1\n- Key point 1.1\n- Key point 1.2\n- Supporting evidence\n\n## Main Section 2\n- Key point 2.1\n- Key point 2.2\n- Case study example\n\n## Conclusion\n- Summary of main points\n- Call to action\n- Final thought";
      } else {
        mockResponse = "I've analyzed your request and here are my thoughts:\n\n";
        mockResponse += "The approach you're considering has several merits, including scalability and user-friendliness. However, consider these additional factors:\n\n";
        mockResponse += "1. Implementation complexity might be higher than anticipated\n";
        mockResponse += "2. There are alternative approaches worth exploring\n";
        mockResponse += "3. The timeline might need adjustment based on these considerations\n\n";
        mockResponse += "I recommend proceeding with a phased approach, starting with a prototype to validate core assumptions.";
      }
      
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSavePrompt = () => {
    if (!prompt.trim()) return;
    
    const newPrompt = {
      id: Date.now().toString(),
      title: `Saved Prompt ${savedPrompts.length + 1}`,
      prompt: prompt
    };
    
    setSavedPrompts([...savedPrompts, newPrompt]);
  };
  
  const handleLoadPrompt = (id: string) => {
    const promptToLoad = savedPrompts.find(p => p.id === id);
    if (promptToLoad) {
      setPrompt(promptToLoad.prompt);
    }
  };
  
  const handleClearPrompt = () => {
    setPrompt("");
    setSelectedTemplate("");
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Prompt Playground</h2>
        <p className="text-default-600">
          Experiment with different prompt techniques and see how they affect AI responses.
          Use templates, save your best prompts, and learn through practice.
        </p>
      </div>
      
      <Tabs 
        aria-label="Playground Options" 
        selectedKey={selectedTab} 
        onSelectionChange={setSelectedTab as any}
        className="mb-4"
      >
        <Tab key="editor" title={
          <div className="flex items-center gap-2">
            <Icon icon="lucide:edit-3" />
            <span>Prompt Editor</span>
          </div>
        }/>
        <Tab key="saved" title={
          <div className="flex items-center gap-2">
            <Icon icon="lucide:bookmark" />
            <span>Saved Prompts</span>
          </div>
        }/>
        <Tab key="tips" title={
          <div className="flex items-center gap-2">
            <Icon icon="lucide:lightbulb" />
            <span>Tips & Tricks</span>
          </div>
        }/>
      </Tabs>
      
      {selectedTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Create Your Prompt</h3>
                <Select
                  label="Use Template"
                  placeholder="Select a template"
                  className="max-w-xs"
                  selectedKeys={selectedTemplate ? [selectedTemplate] : []}
                  onChange={handleTemplateChange}
                >
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </Select>
              </CardHeader>
              <Divider />
              <CardBody>
                <Textarea
                  label="Your Prompt"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  minRows={10}
                  className="w-full"
                />
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex justify-between w-full">
                  <div className="flex gap-2">
                    <Button 
                      variant="flat" 
                      color="danger" 
                      onPress={handleClearPrompt}
                      startContent={<Icon icon="lucide:trash-2" width={16} height={16} />}
                    >
                      Clear
                    </Button>
                    <Button 
                      variant="flat" 
                      color="primary" 
                      onPress={handleSavePrompt}
                      startContent={<Icon icon="lucide:save" width={16} height={16} />}
                    >
                      Save
                    </Button>
                  </div>
                  <Button 
                    color="primary" 
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    endContent={!isLoading && <Icon icon="lucide:send" width={16} height={16} />}
                  >
                    Submit
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Template Details</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                {selectedTemplate ? (
                  <div>
                    <h4 className="font-medium text-lg mb-2">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </h4>
                    <p className="text-default-600 mb-4">
                      {templates.find(t => t.id === selectedTemplate)?.description}
                    </p>
                    <div className="bg-content2 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">When to use this template:</h5>
                      <ul className="space-y-2">
                        {selectedTemplate === "role-based" && (
                          <>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When you need specialized knowledge or perspective</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>To get responses in a specific professional tone</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>For domain-specific advice or analysis</span>
                            </li>
                          </>
                        )}
                        
                        {selectedTemplate === "step-by-step" && (
                          <>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>For complex tasks that need clear structure</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When you need a specific workflow followed</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>For instructional or tutorial content</span>
                            </li>
                          </>
                        )}
                        
                        {selectedTemplate === "few-shot" && (
                          <>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When you need consistent formatting</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>For pattern-based tasks or transformations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When explaining the task is difficult but examples are clear</span>
                            </li>
                          </>
                        )}
                        
                        {selectedTemplate === "constraints-based" && (
                          <>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When you have specific requirements or limitations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>For creative tasks that need guardrails</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                              <span>When you want to avoid certain topics or approaches</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-default-500">
                    <Icon icon="lucide:file-question" className="mx-auto mb-2" width={32} height={32} />
                    <p>Select a template to see details</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">AI Response</h3>
              <div className="flex items-center gap-2 text-sm text-default-500">
                <Icon icon="lucide:info" width={14} height={14} />
                <span>Simulated response for demonstration</span>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {response ? (
                <div className="whitespace-pre-wrap font-mono text-sm bg-content2 p-4 rounded-lg min-h-[400px]">
                  {response}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-default-500">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="animate-spin mb-4">
                        <Icon icon="lucide:loader" width={32} height={32} />
                      </div>
                      <p>Generating response...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon icon="lucide:message-square" className="mb-4" width={32} height={32} />
                      <p>Submit a prompt to see the response</p>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-default-500">
                  {response && "Response generated for demonstration purposes"}
                </div>
                <div className="flex gap-2">
                  {response && (
                    <>
                      <Button 
                        variant="flat" 
                        color="primary"
                        startContent={<Icon icon="lucide:copy" width={16} height={16} />}
                      >
                        Copy
                      </Button>
                      <Button 
                        variant="flat" 
                        color="secondary"
                        startContent={<Icon icon="lucide:download" width={16} height={16} />}
                      >
                        Export
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {selectedTab === "saved" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPrompts.map((savedPrompt) => (
            <Card key={savedPrompt.id} isPressable onPress={() => handleLoadPrompt(savedPrompt.id)}>
              <CardBody>
                <h3 className="font-semibold mb-2">{savedPrompt.title}</h3>
                <p className="text-default-600 text-sm line-clamp-3">
                  {savedPrompt.prompt}
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="w-full flex justify-between">
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="danger"
                    startContent={<Icon icon="lucide:trash-2" width={14} height={14} />}
                  >
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    color="primary"
                    onPress={() => handleLoadPrompt(savedPrompt.id)}
                    endContent={<Icon icon="lucide:arrow-right" width={14} height={14} />}
                  >
                    Use
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-2 border-dashed border-default-200">
            <CardBody className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-primary-100 p-3 mb-4">
                <Icon icon="lucide:plus" className="text-primary" width={24} height={24} />
              </div>
              <h3 className="font-semibold mb-2">Create New Prompt</h3>
              <p className="text-default-500 text-sm text-center mb-4">
                Save your prompts for future use
              </p>
              <Button 
                color="primary" 
                variant="flat"
                onPress={() => setSelectedTab("editor")}
              >
                Go to Editor
              </Button>
            </CardBody>
          </Card>
        </div>
      )}
      
      {selectedTab === "tips" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Prompt Engineering Quick Tips</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-success-100 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Icon icon="lucide:check-circle" className="text-success" />
                      Do's
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                        <span>Be specific and clear about what you want</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                        <span>Provide context and background information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                        <span>Break complex requests into steps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                        <span>Use examples when appropriate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                        <span>Specify format, length, and style requirements</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-danger-100 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Icon icon="lucide:x-circle" className="text-danger" />
                      Don'ts
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:x" className="text-danger mt-1" width={16} />
                        <span>Use vague or ambiguous language</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:x" className="text-danger mt-1" width={16} />
                        <span>Assume the AI understands implied context</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:x" className="text-danger mt-1" width={16} />
                        <span>Include contradictory requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:x" className="text-danger mt-1" width={16} />
                        <span>Overload with unnecessary details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon icon="lucide:x" className="text-danger mt-1" width={16} />
                        <span>Use jargon without explanation</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Prompt Structure Formula</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-content2 p-3 rounded-lg border-l-4 border-primary">
                      <h5 className="font-medium text-sm">1. Context/Role</h5>
                      <p className="text-sm text-default-600">Set the stage with background info or assign a role</p>
                      <div className="bg-content1 p-2 rounded mt-2 text-xs font-mono">
                        "As a financial analyst with expertise in cryptocurrency markets..."
                      </div>
                    </div>
                    
                    <div className="bg-content2 p-3 rounded-lg border-l-4 border-secondary">
                      <h5 className="font-medium text-sm">2. Task/Request</h5>
                      <p className="text-sm text-default-600">Clearly state what you want</p>
                      <div className="bg-content1 p-2 rounded mt-2 text-xs font-mono">
                        "Analyze the potential impact of recent regulatory changes on Bitcoin prices..."
                      </div>
                    </div>
                    
                    <div className="bg-content2 p-3 rounded-lg border-l-4 border-success">
                      <h5 className="font-medium text-sm">3. Format/Structure</h5>
                      <p className="text-sm text-default-600">Specify how you want the response organized</p>
                      <div className="bg-content1 p-2 rounded mt-2 text-xs font-mono">
                        "Structure your analysis with: 1) Summary of changes 2) Short-term impacts 3) Long-term outlook..."
                      </div>
                    </div>
                    
                    <div className="bg-content2 p-3 rounded-lg border-l-4 border-warning">
                      <h5 className="font-medium text-sm">4. Constraints/Requirements</h5>
                      <p className="text-sm text-default-600">Add any specific limitations or must-haves</p>
                      <div className="bg-content1 p-2 rounded mt-2 text-xs font-mono">
                        "Keep the analysis under 500 words, include at least 2 specific examples, and avoid technical jargon..."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Divider className="my-6" />
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon icon="lucide:lightbulb" className="text-primary" />
                  Iterative Improvement
                </h4>
                <p className="mb-3">
                  Remember that prompt engineering is an iterative process. If you don't get the desired results:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Analyze what's missing or incorrect in the response</li>
                  <li>Refine your prompt to address those specific issues</li>
                  <li>Add more examples or constraints if needed</li>
                  <li>Try a different approach if you're still not getting good results</li>
                </ol>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
