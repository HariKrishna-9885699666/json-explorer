import React, { useState } from "react";
import { Search, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JsonTreeNode } from "./JsonTreeNode";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface JsonTreeViewProps {
  data: unknown;
  className?: string;
}

export function JsonTreeView({ data, className }: JsonTreeViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandKey, setExpandKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleAll = () => {
    setIsExpanded(prev => !prev);
    setExpandKey(prev => prev + 1);
  };

  if (data === null || data === undefined) {
    return (
      <div className={cn("flex items-center justify-center h-full text-muted-foreground", className)}>
        <div className="text-center">
          <ChevronsUpDown className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Enter valid JSON to explore</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full bg-card rounded-lg border border-border", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/30">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keys or values..."
            className="pl-9 h-8 bg-background/50 border-border/50 font-mono text-sm"
          />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="toolbar"
              size="icon-sm"
              onClick={handleToggleAll}
            >
              <ChevronsUpDown className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isExpanded ? "Collapse all" : "Expand all"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-auto p-2 scrollbar-thin">
        {typeof data === "object" && data !== null ? (
          Array.isArray(data) ? (
            data.map((item, index) => (
              <JsonTreeNode
                key={`${expandKey}-${index}`}
                keyName={index}
                value={item}
                path={[index]}
                depth={0}
                searchQuery={searchQuery}
                defaultExpanded={isExpanded}
              />
            ))
          ) : (
            Object.entries(data).map(([key, value]) => (
              <JsonTreeNode
                key={`${expandKey}-${key}`}
                keyName={key}
                value={value}
                path={[key]}
                depth={0}
                searchQuery={searchQuery}
                defaultExpanded={isExpanded}
              />
            ))
          )
        ) : (
          <div className="p-4 font-mono text-sm">
            <span className={cn(
              typeof data === "string" && "text-json-string",
              typeof data === "number" && "text-json-number",
              typeof data === "boolean" && "text-json-boolean"
            )}>
              {JSON.stringify(data)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
