import React from "react";
import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FlowDiagram } from "./components/flow-diagram";
import { ProcessAnalysis } from "./components/process-analysis";
import { FeedbackForm } from "./components/feedback-form";
import { ResourcesSection } from "./components/resources-section";
import { OptimizationStrategies } from "./components/optimization-strategies";
import { CaseStudies } from "./components/case-studies";
import { Tutorials } from "./components/tutorials";
import { PromptPlayground } from "./components/prompt-playground";
import { PromptTemplates } from "./components/prompt-templates";

export default function App() {
  const [selected, setSelected] = React.useState("diagram");

  return (
    <div className="min-h-screen bg-gradient-to-br from-content1 to-content2 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Prompt Engineering Academy</h1>
          <p className="text-default-600 max-w-3xl mx-auto text-lg">
            Master the art and science of prompt engineering with interactive tutorials, 
            comprehensive analysis tools, and practical examples.
          </p>
        </header>

        <Card className="mb-8">
          <CardBody>
            <Tabs 
              aria-label="Analysis Options" 
              selectedKey={selected} 
              onSelectionChange={setSelected}
              className="mb-4"
              variant="bordered"
            >
              <Tab key="tutorials" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:book" />
                  <span>Tutorials</span>
                </div>
              }>
                <Tutorials />
              </Tab>
              
              <Tab key="playground" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:terminal" />
                  <span>Playground</span>
                </div>
              }>
                <PromptPlayground />
              </Tab>
              
              <Tab key="templates" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:copy" />
                  <span>Templates</span>
                </div>
              }>
                <PromptTemplates />
              </Tab>
              
              <Tab key="diagram" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:git-branch" />
                  <span>Flow Diagrams</span>
                </div>
              }>
                <FlowDiagram />
              </Tab>
              
              <Tab key="analysis" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:bar-chart-2" />
                  <span>Process Analysis</span>
                </div>
              }>
                <ProcessAnalysis />
              </Tab>
              
              <Tab key="optimization" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:settings" />
                  <span>Optimization</span>
                </div>
              }>
                <OptimizationStrategies />
              </Tab>
              
              <Tab key="cases" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:file-text" />
                  <span>Case Studies</span>
                </div>
              }>
                <CaseStudies />
              </Tab>
              
              <Tab key="resources" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:book-open" />
                  <span>Resources</span>
                </div>
              }>
                <ResourcesSection />
              </Tab>
              
              <Tab key="feedback" title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:message-square" />
                  <span>Feedback</span>
                </div>
              }>
                <FeedbackForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
