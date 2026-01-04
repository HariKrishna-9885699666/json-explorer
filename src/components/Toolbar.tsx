import React from "react";
import { 
  Wand2, 
  Minimize2, 
  Copy, 
  Download, 
  Trash2, 
  PanelLeft, 
  PanelRight, 
  Columns,
  Check,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type ViewMode = "editor" | "tree" | "split";

interface ToolbarProps {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isValid: boolean;
  hasContent: boolean;
}

export function Toolbar({
  onFormat,
  onMinify,
  onCopy,
  onDownload,
  onClear,
  viewMode,
  onViewModeChange,
  isValid,
  hasContent,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-card border-b border-border">
      {/* Left: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="toolbar"
          size="sm"
          onClick={onFormat}
          disabled={!hasContent}
          className="gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Format
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onMinify}
          disabled={!hasContent}
          className="gap-2"
        >
          <Minimize2 className="w-4 h-4" />
          Minify
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          variant="toolbar"
          size="sm"
          onClick={onCopy}
          disabled={!hasContent || !isValid}
          className="gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
        <Button
          variant="toolbar"
          size="sm"
          onClick={onDownload}
          disabled={!hasContent || !isValid}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          variant="toolbar"
          size="sm"
          onClick={onClear}
          disabled={!hasContent}
          className="gap-2 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>

      {/* Center: Status */}
      <div className="flex items-center gap-2">
        {hasContent && (
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              isValid 
                ? "bg-success/10 text-success" 
                : "bg-destructive/10 text-destructive"
            )}
          >
            {isValid ? (
              <>
                <Check className="w-4 h-4" />
                Valid JSON
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4" />
                Invalid JSON
              </>
            )}
          </div>
        )}
      </div>

      {/* Right: View Mode */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
        <Button
          variant={viewMode === "editor" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onViewModeChange("editor")}
          title="Editor only"
        >
          <PanelLeft className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === "split" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onViewModeChange("split")}
          title="Split view"
        >
          <Columns className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === "tree" ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={() => onViewModeChange("tree")}
          title="Tree only"
        >
          <PanelRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
