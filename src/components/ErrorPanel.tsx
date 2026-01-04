import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Lightbulb } from "lucide-react";
import { JsonError } from "@/lib/json-utils";
import { cn } from "@/lib/utils";

interface ErrorPanelProps {
  error: JsonError | null;
  onDismiss?: () => void;
}

export function ErrorPanel({ error, onDismiss }: ErrorPanelProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mx-4 mb-4"
        >
          <div className="relative overflow-hidden rounded-lg border border-destructive/30 bg-destructive/5 backdrop-blur-sm">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-transparent to-destructive/10" />
            
            <div className="relative p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-destructive">
                      Syntax Error
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      Line {error.line}, Column {error.column}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground/80 font-mono">
                    {error.message}
                  </p>

                  {error.message.includes("Trailing comma") && (
                    <div className="mt-3 flex items-start gap-2 p-2 rounded bg-warning/10 border border-warning/20">
                      <Lightbulb className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-warning">Tip:</span> JSON doesn't allow trailing commas. Remove the comma before the closing bracket or brace.
                      </p>
                    </div>
                  )}
                </div>

                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className="flex-shrink-0 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
