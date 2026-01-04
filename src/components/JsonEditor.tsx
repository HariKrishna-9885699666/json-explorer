import React, { useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { JsonError } from "@/lib/json-utils";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: JsonError | null;
  className?: string;
}

export function JsonEditor({ value, onChange, error, className }: JsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lineCount = useMemo(() => {
    return value.split("\n").length;
  }, [value]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1);
  }, [lineCount]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (textarea && lineNumbers) {
      const syncScroll = () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      };
      textarea.addEventListener("scroll", syncScroll);
      return () => textarea.removeEventListener("scroll", syncScroll);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className={cn("relative flex h-full bg-editor-bg rounded-lg border border-border overflow-hidden", className)}>
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="flex-shrink-0 w-12 bg-muted/30 border-r border-border overflow-hidden select-none"
      >
        <div className="py-3 px-2 text-right">
          {lineNumbers.map((num) => (
            <div
              key={num}
              className={cn(
                "font-mono text-xs h-[1.5rem] leading-[1.5rem] text-muted-foreground/50",
                error?.line === num && "text-destructive font-medium bg-destructive/10"
              )}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full h-full resize-none bg-transparent font-mono text-sm p-3",
            "leading-[1.5rem] text-foreground placeholder:text-muted-foreground/50",
            "focus:outline-none scrollbar-thin",
            "selection:bg-[hsl(var(--editor-selection))]"
          )}
          placeholder="Paste or type your JSON here..."
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
        
        {/* Error highlight overlay */}
        {error && error.line > 0 && (
          <div
            className="absolute left-0 right-0 h-[1.5rem] bg-destructive/10 pointer-events-none border-l-2 border-destructive"
            style={{ top: `calc(${(error.line - 1) * 1.5}rem + 0.75rem)` }}
          />
        )}
      </div>
    </div>
  );
}
