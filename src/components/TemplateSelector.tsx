import React from "react";
import { FileJson, Server, Settings, Layers, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleJsonTemplates } from "@/lib/json-utils";

interface TemplateSelectorProps {
  onSelect: (json: string) => void;
}

const templateIcons: Record<string, React.ElementType> = {
  api: Server,
  config: Settings,
  nested: Layers,
  invalid: Bug,
};

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const handleSelect = (key: string) => {
    const template = sampleJsonTemplates[key as keyof typeof sampleJsonTemplates];
    if (typeof template.data === "string") {
      onSelect(template.data);
    } else {
      onSelect(JSON.stringify(template.data, null, 2));
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground mr-1">Try:</span>
      {Object.entries(sampleJsonTemplates).map(([key, template]) => {
        const Icon = templateIcons[key] || FileJson;
        return (
          <Button
            key={key}
            variant="toolbar"
            size="sm"
            onClick={() => handleSelect(key)}
            className="gap-1.5"
          >
            <Icon className="w-3.5 h-3.5" />
            {template.name}
          </Button>
        );
      })}
    </div>
  );
}
