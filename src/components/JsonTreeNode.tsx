import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Copy, Braces, Brackets, Hash, Type, ToggleLeft, CircleSlash } from "lucide-react";
import { cn } from "@/lib/utils";
import { getValueType, getJsonPath } from "@/lib/json-utils";
import { toast } from "sonner";

interface JsonTreeNodeProps {
  keyName: string | number;
  value: unknown;
  path: (string | number)[];
  depth: number;
  searchQuery?: string;
  isLast?: boolean;
  defaultExpanded?: boolean;
}

const typeIcons: Record<string, React.ElementType> = {
  object: Braces,
  array: Brackets,
  string: Type,
  number: Hash,
  boolean: ToggleLeft,
  null: CircleSlash,
};

const typeColors: Record<string, string> = {
  object: "text-json-bracket",
  array: "text-json-bracket",
  string: "text-json-string",
  number: "text-json-number",
  boolean: "text-json-boolean",
  null: "text-json-null",
};

export function JsonTreeNode({ keyName, value, path, depth, searchQuery, isLast, defaultExpanded = true }: JsonTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const type = getValueType(value);
  const isExpandable = type === "object" || type === "array";
  const Icon = typeIcons[type];

  // Reset expansion state when defaultExpanded changes (from expand/collapse all)
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const matchesSearch = searchQuery
    ? String(keyName).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()))
    : true;

  const copyPath = () => {
    const jsonPath = getJsonPath(path);
    navigator.clipboard.writeText(jsonPath);
    toast.success("Path copied!", { description: jsonPath });
  };

  const copyValue = () => {
    const valueStr = typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
    navigator.clipboard.writeText(valueStr);
    toast.success("Value copied!");
  };

  const renderValue = () => {
    switch (type) {
      case "string":
        return <span className="text-json-string">"{String(value).length > 100 ? String(value).substring(0, 100) + "..." : String(value)}"</span>;
      case "number":
        return <span className="text-json-number">{String(value)}</span>;
      case "boolean":
        return <span className="text-json-boolean">{String(value)}</span>;
      case "null":
        return <span className="text-json-null">null</span>;
      case "array":
        return <span className="text-muted-foreground">[{(value as unknown[]).length}]</span>;
      case "object":
        return <span className="text-muted-foreground">{`{${Object.keys(value as object).length}}`}</span>;
      default:
        return null;
    }
  };

  if (!matchesSearch && !isExpandable) {
    return null;
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "group flex items-center gap-1 py-0.5 px-2 rounded-md cursor-pointer",
          "hover:bg-muted/50 transition-colors duration-150",
          matchesSearch && searchQuery && "bg-primary/10"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        {/* Expand/Collapse Arrow */}
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
          {isExpandable && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>
          )}
        </div>

        {/* Type Icon */}
        <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", typeColors[type])} />

        {/* Key */}
        <span className="font-mono text-sm text-json-key font-medium">
          {typeof keyName === "string" ? `"${keyName}"` : `[${keyName}]`}
        </span>

        <span className="text-muted-foreground mx-1">:</span>

        {/* Value */}
        <span className="font-mono text-sm truncate">{renderValue()}</span>

        {/* Copy Buttons */}
        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); copyPath(); }}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Copy path"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Children */}
      <AnimatePresence>
        {isExpandable && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {type === "array"
              ? (value as unknown[]).map((item, index) => (
                  <JsonTreeNode
                    key={index}
                    keyName={index}
                    value={item}
                    path={[...path, index]}
                    depth={depth + 1}
                    searchQuery={searchQuery}
                    isLast={index === (value as unknown[]).length - 1}
                    defaultExpanded={defaultExpanded}
                  />
                ))
              : Object.entries(value as object).map(([key, val], index, arr) => (
                  <JsonTreeNode
                    key={key}
                    keyName={key}
                    value={val}
                    path={[...path, key]}
                    depth={depth + 1}
                    searchQuery={searchQuery}
                    isLast={index === arr.length - 1}
                    defaultExpanded={defaultExpanded}
                  />
                ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
