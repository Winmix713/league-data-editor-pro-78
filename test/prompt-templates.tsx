import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Input, Tabs, Tab, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

export const PromptTemplates = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  const templates = [
    {
      id: "code-review",
      title: "Code Review",
      category: "development",
      description: "Get a comprehensive code review with best practices and improvement suggestions",
      template: `Act as a senior software engineer with expertise in [LANGUAGE/FRAMEWORK].

Please review the following code for:
1. Best practices and coding standards
2. Potential bugs or edge cases
3. Performance optimizations
4. Security vulnerabilities
5. Readability and maintainability

For each issue found, please:
- Explain why it's a problem
- Show how to fix it with a code example
- Rate the severity (Low/Medium/High)

Code to review:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\``,
      icon: "lucide:code"
    },
    {
      id: "feature-spec",
      title: "Feature Specification",
      category: "development",
      description: "Generate a detailed technical specification for a new feature",
      template: `Create a comprehensive technical specification for implementing [FEATURE NAME] in our [TYPE OF APPLICATION].

Background:
[BRIEF DESCRIPTION OF THE CURRENT SYSTEM AND CONTEXT]

Requirements:
1. [REQUIREMENT 1]
2. [REQUIREMENT 2]
3. [REQUIREMENT 3]

Please include the following sections:
- Overview and goals
- User stories/use cases
- Technical approach and architecture
- API endpoints or interfaces needed
- Database changes required
- UI/UX considerations
- Testing strategy
- Potential challenges and mitigations
- Implementation timeline estimate`,
      icon: "lucide:file-text"
    },
    {
      id: "blog-post",
      title: "Blog Post",
      category: "content",
      description: "Create a well-structured, engaging blog post on any topic",
      template: `Write a comprehensive blog post about [TOPIC] for [TARGET AUDIENCE].

The blog post should:
- Have an engaging title that includes SEO keywords
- Start with a compelling introduction that hooks the reader
- Include [NUMBER] main sections with descriptive H2 headings
- Incorporate relevant examples, statistics, or case studies
- Use a [TONE: professional/conversational/educational] tone
- Be approximately [WORD COUNT] words
- End with a conclusion and call-to-action

Key points to cover:
- [KEY POINT 1]
- [KEY POINT 2]
- [KEY POINT 3]

SEO keywords to include: [KEYWORD 1], [KEYWORD 2], [KEYWORD 3]`,
      icon: "lucide:file-text"
    },
    {
      id: "social-media",
      title: "Social Media Campaign",
      category: "content",
      description: "Generate a multi-platform social media campaign",
      template: `Create a social media campaign for [PRODUCT/SERVICE/EVENT] targeting [TARGET AUDIENCE].

Campaign goals:
- [GOAL 1, e.g., Increase brand awareness]
- [GOAL 2, e.g., Drive traffic to website]
- [GOAL 3, e.g., Generate leads]

Please create:

1. Twitter/X posts (5 tweets, max 280 characters each):
   - Include relevant hashtags
   - Vary between question-based, statistic-based, and quote-based tweets
   - Suggest optimal posting times

2. Instagram content (3 posts):
   - Caption text (150-200 characters)
   - Image description/concept
   - Relevant hashtags (8-12 per post)

3. LinkedIn post (1 longer form post):
   - Professional tone
   - Include a call-to-action
   - Suggest relevant hashtags

4. Facebook post (2 posts):
   - Conversational tone
   - Include engaging questions
   - Suggest image concepts

Brand voice: [DESCRIBE BRAND VOICE, e.g., Professional but friendly, Humorous and casual]
Key messaging points: [LIST KEY MESSAGES]`,
      icon: "lucide:message-square"
    },
    {
      id: "product-description",
      title: "Product Description",
      category: "content",
      description: "Create compelling product descriptions for e-commerce",
      template: `Write a persuasive product description for [PRODUCT NAME], a [PRODUCT CATEGORY] designed for [TARGET AUDIENCE].

Product details:
- Key features: [LIST MAIN FEATURES]
- Materials/specifications: [MATERIALS OR TECHNICAL SPECS]
- Unique selling points: [WHAT MAKES THIS PRODUCT SPECIAL]
- Price point: [PRICE RANGE OR SPECIFIC PRICE]

The description should include:
1. An attention-grabbing headline
2. A compelling opening paragraph that hooks the reader
3. Feature-benefit statements (what the feature is and how it benefits the user)
4. Sensory words and emotional triggers
5. Social proof or credibility elements
6. A clear call-to-action

Tone: [LUXURY/CASUAL/TECHNICAL/FRIENDLY]
Length: Approximately [NUMBER] words
SEO keywords to include: [KEYWORD 1], [KEYWORD 2], [KEYWORD 3]`,
      icon: "lucide:shopping-bag"
    },
    {
      id: "ui-design",
      title: "UI Design Specification",
      category: "design",
      description: "Create detailed UI design specifications for developers",
      template: `Create a UI design specification for [COMPONENT/PAGE NAME] in our [WEB/MOBILE] application.

Design requirements:
- Purpose: [WHAT THIS UI ELEMENT SHOULD ACCOMPLISH]
- Target users: [WHO WILL USE THIS]
- Key functionality: [WHAT IT SHOULD DO]
- Platform: [WEB/IOS/ANDROID/RESPONSIVE]

Please provide detailed specifications for:

1. Layout and Structure:
   - Component hierarchy
   - Responsive behavior
   - Grid/alignment specifications

2. Visual Design:
   - Color scheme (use hex codes)
   - Typography (font family, sizes, weights)
   - Spacing and padding (in pixels)
   - Shadows, borders, and other visual effects

3. Interactive Elements:
   - Button states (default, hover, active, disabled)
   - Form elements behavior
   - Animations and transitions

4. Accessibility Considerations:
   - Color contrast requirements
   - Keyboard navigation
   - Screen reader support

5. States and Variations:
   - Loading state
   - Empty state
   - Error state
   - Success state

Include any specific design patterns or component library references that should be followed.`,
      icon: "lucide:layout"
    },
    {
      id: "data-analysis",
      title: "Data Analysis Plan",
      category: "data",
      description: "Create a structured plan for analyzing a dataset",
      template: `Develop a comprehensive data analysis plan for [DATASET/PROJECT NAME].

Dataset description:
- Data source: [WHERE THE DATA COMES FROM]
- Size: [APPROXIMATE SIZE]
- Key variables: [LIST IMPORTANT VARIABLES]
- Time period: [TIME RANGE OF DATA]

Research questions:
1. [QUESTION 1]
2. [QUESTION 2]
3. [QUESTION 3]

Please create a detailed analysis plan including:

1. Data Preparation:
   - Cleaning steps needed
   - Transformations required
   - Feature engineering opportunities

2. Exploratory Data Analysis:
   - Key visualizations to create
   - Summary statistics to calculate
   - Relationships to explore

3. Statistical Methods:
   - Recommended statistical tests
   - Models to consider
   - Validation approaches

4. Interpretation Framework:
   - How to interpret results
   - Potential confounding factors
   - Limitations to consider

5. Deliverables:
   - Suggested visualizations
   - Report structure
   - Key metrics to highlight

Include any specific tools or libraries that would be appropriate for this analysis.`,
      icon: "lucide:bar-chart-2"
    },
    {
      id: "meeting-agenda",
      title: "Meeting Agenda",
      category: "business",
      description: "Create a structured agenda for productive meetings",
      template: `Create a detailed meeting agenda for a [MEETING TYPE] meeting on [TOPIC].

Meeting details:
- Date and time: [DATE, TIME]
- Duration: [LENGTH OF MEETING]
- Participants: [LIST OF ATTENDEES AND THEIR ROLES]
- Meeting objective: [MAIN GOAL OF THE MEETING]

Please structure the agenda as follows:

1. Welcome and Introduction (5 minutes)
   - Brief overview of meeting purpose
   - Introduction of any new participants

2. Review of Previous Action Items (10 minutes)
   - Status updates on previous tasks
   - Outstanding items to address

3. Main Discussion Topics:
   a. [TOPIC 1] (15 minutes)
      - Key points to cover
      - Questions to address
      - Expected outcome
   
   b. [TOPIC 2] (20 minutes)
      - Key points to cover
      - Questions to address
      - Expected outcome
   
   c. [TOPIC 3] (15 minutes)
      - Key points to cover
      - Questions to address
      - Expected outcome

4. Action Items and Next Steps (10 minutes)
   - Assignments and responsibilities
   - Deadlines
   - Follow-up meeting scheduling

5. Q&A and Closing (5 minutes)

Please include any pre-meeting preparation required from participants and any materials that should be distributed in advance.`,
      icon: "lucide:calendar"
    }
  ];
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const copyTemplate = (templateText: string) => {
    navigator.clipboard.writeText(templateText);
    // In a real app, you would show a toast notification here
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Prompt Templates</h2>
        <p className="text-default-600">
          Browse our collection of professionally crafted prompt templates for various use cases.
          Copy and customize these templates to jumpstart your prompt engineering process.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          className="md:max-w-xs"
        />
        
        <Tabs 
          aria-label="Template Categories" 
          selectedKey={selectedCategory} 
          onSelectionChange={setSelectedCategory as any}
          classNames={{
            base: "flex-1",
            tabList: "gap-2"
          }}
          variant="light"
          size="sm"
        >
          <Tab key="all" title="All" />
          <Tab key="development" title="Development" />
          <Tab key="content" title="Content" />
          <Tab key="design" title="Design" />
          <Tab key="data" title="Data" />
          <Tab key="business" title="Business" />
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="flex gap-3">
              <div className={`p-2 rounded-full bg-${
                template.category === "development" ? "primary" : 
                template.category === "content" ? "secondary" : 
                template.category === "design" ? "success" :
                template.category === "data" ? "warning" : "default"
              }-100`}>
                <Icon 
                  icon={template.icon} 
                  className={`text-${
                    template.category === "development" ? "primary" : 
                    template.category === "content" ? "secondary" : 
                    template.category === "design" ? "success" :
                    template.category === "data" ? "warning" : "default"
                  }`} 
                  width={20} 
                  height={20} 
                />
              </div>
              <div className="flex flex-col">
                <p className="text-md font-semibold">{template.title}</p>
                <p className="text-small text-default-500">{template.description}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="bg-content2 p-3 rounded-lg max-h-40 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {template.template}
                </pre>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xs text-default-500 capitalize">
                    {template.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Tooltip content="Preview in playground">
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="secondary"
                      isIconOnly
                    >
                      <Icon icon="lucide:external-link" width={16} height={16} />
                    </Button>
                  </Tooltip>
                  <Button 
                    size="sm" 
                    color="primary"
                    onPress={() => copyTemplate(template.template)}
                    startContent={<Icon icon="lucide:copy" width={16} height={16} />}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <Card>
          <CardBody className="py-8">
            <div className="text-center">
              <div className="bg-default-100 p-3 rounded-full inline-flex mb-4">
                <Icon icon="lucide:search" className="text-default-500" width={24} height={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-default-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </CardBody>
        </Card>
      )}
      
      <Card className="bg-gradient-to-r from-primary-100 to-secondary-100 mt-8">
        <CardBody>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <Icon icon="lucide:plus" className="text-primary" width={32} height={32} />
              </div>
            </div>
            
            <div className="md:w-3/4 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Create Custom Templates</h3>
              <p className="mb-4">
                Have a prompt pattern that works well for you? Save it as a custom template to reuse and share with others.
              </p>
              <Button 
                color="primary" 
                endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
              >
                Create Template
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
