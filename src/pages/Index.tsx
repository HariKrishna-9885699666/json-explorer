import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Toolbar, ViewMode } from "@/components/Toolbar";
import { JsonEditor } from "@/components/JsonEditor";
import { JsonTreeView } from "@/components/JsonTreeView";
import { ErrorPanel } from "@/components/ErrorPanel";
import { TemplateSelector } from "@/components/TemplateSelector";
import { ProfileCard } from "@/components/ProfileCard";
import { parseJson, formatJson, minifyJson, ParseResult } from "@/lib/json-utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Index = () => {
  const [input, setInput] = useState("");
  const [parseResult, setParseResult] = useState<ParseResult>({
    isValid: false,
    data: null,
    error: null,
  });
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isDark, setIsDark] = useState(true);

  // Parse JSON on input change
  useEffect(() => {
    if (!input.trim()) {
      setParseResult({ isValid: false, data: null, error: null });
      return;
    }
    const result = parseJson(input);
    setParseResult(result);
  }, [input]);

  // Theme handling
  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const handleFormat = useCallback(() => {
    const formatted = formatJson(input);
    if (formatted !== input) {
      setInput(formatted);
      toast.success("JSON formatted");
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    const minified = minifyJson(input);
    if (minified !== input) {
      setInput(minified);
      toast.success("JSON minified");
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    if (parseResult.isValid && parseResult.data) {
      navigator.clipboard.writeText(JSON.stringify(parseResult.data, null, 2));
      toast.success("Copied to clipboard");
    }
  }, [parseResult]);

  const handleDownload = useCallback(() => {
    if (parseResult.isValid && parseResult.data) {
      const blob = new Blob([JSON.stringify(parseResult.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Downloaded as data.json");
    }
  }, [parseResult]);

  const handleClear = useCallback(() => {
    setInput("");
    toast.info("Editor cleared");
  }, []);

  const handleTemplateSelect = useCallback((json: string) => {
    setInput(json);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <Toolbar
          onFormat={handleFormat}
          onMinify={handleMinify}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={handleClear}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isValid={parseResult.isValid}
          hasContent={input.trim().length > 0}
        />

        {/* Error Panel */}
        <ErrorPanel error={parseResult.error} />

        {/* Template Selector - show when empty */}
        {!input.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-4"
          >
            <TemplateSelector onSelect={handleTemplateSelect} />
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden p-4 pt-0 gap-4">
          {/* Editor Panel */}
          <motion.div
            className={cn(
              "overflow-hidden",
              viewMode === "editor" && "flex-1",
              viewMode === "split" && "flex-1",
              viewMode === "tree" && "hidden"
            )}
            layout
            transition={{ duration: 0.2 }}
          >
            <JsonEditor
              value={input}
              onChange={setInput}
              error={parseResult.error}
              className="h-full"
            />
          </motion.div>

          {/* Tree Panel */}
          <motion.div
            className={cn(
              "overflow-hidden",
              viewMode === "tree" && "flex-1",
              viewMode === "split" && "flex-1",
              viewMode === "editor" && "hidden"
            )}
            layout
            transition={{ duration: 0.2 }}
          >
            <JsonTreeView data={parseResult.data} className="h-full" />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-3 px-6 text-center text-xs text-muted-foreground bg-card/50">
        <p>100% client-side • No data leaves your browser • Built with React + Vite</p>
      </footer>

      {/* Profile Card */}
      <ProfileCard />
    </div>
  );
};

export default Index;
