import type { Config } from "./get-config.js";

// ============================================================================
// TRANSFORM LIB IMPORTS
// ============================================================================
/**
 * Transforms relative lib imports to use the configured alias.
 * 
 * Examples:
 * - `from "../lib/utils"` → `from "@/lib/utils"`
 * - `from "../../lib/utils"` → `from "@/lib/utils"`
 */
export function transformLibImports(content: string, config: Config): string {
  const libAlias = config.aliases.lib;
  
  // Match various relative paths to lib/utils
  // Patterns: ../lib/utils, ../../lib/utils, etc.
  const relativeLibPattern = /from\s+["']\.\.\/(?:\.\.\/)*lib\/utils["']/g;
  
  return content.replace(relativeLibPattern, `from "${libAlias}/utils"`);
}

// ============================================================================
// TRANSFORM COMPONENT IMPORTS
// ============================================================================
/**
 * Transforms relative component imports to use the configured alias.
 * 
 * Examples:
 * - `from "./button"` → `from "@/components/ui/button"`
 * - `from "../button"` → `from "@/components/ui/button"`
 */
export function transformComponentImports(content: string, config: Config): string {
  const uiAlias = config.aliases.ui;
  
  // Match relative imports that look like component imports
  // Pattern: from "./<component>" or from "../<component>"
  const relativeComponentPattern = /from\s+["'](\.\.?\/)+([a-z][a-z0-9-]*)["']/gi;
  
  return content.replace(relativeComponentPattern, (match, _dots, componentName) => {
    // Only transform if it looks like a component name (lowercase, possibly with hyphens)
    if (/^[a-z][a-z0-9-]*$/.test(componentName)) {
      return `from "${uiAlias}/${componentName}"`;
    }
    return match;
  });
}

// ============================================================================
// TRANSFORM ALL IMPORTS
// ============================================================================
/**
 * Applies all import transformations to the content.
 */
export function transformImports(content: string, config: Config): string {
  let result = content;
  
  // Transform lib imports (always)
  result = transformLibImports(result, config);
  
  // Transform component imports (for cross-component references)
  // Note: Be careful not to transform external package imports
  result = transformComponentImports(result, config);
  
  return result;
}

// ============================================================================
// TRANSFORM SPECIFIC PATTERNS
// ============================================================================
/**
 * Transforms specific known patterns that might appear in components.
 */
export function transformKnownPatterns(content: string, config: Config): string {
  let result = content;
  
  // Pattern: @/lib/utils (already aliased but might need adjustment)
  if (config.aliases.lib !== "@/lib") {
    result = result.replace(
      /from\s+["']@\/lib\/utils["']/g,
      `from "${config.aliases.lib}/utils"`
    );
  }
  
  // Pattern: @/components/ui/<component> (already aliased but might need adjustment)
  if (config.aliases.ui !== "@/components/ui") {
    result = result.replace(
      /from\s+["']@\/components\/ui\/([^"']+)["']/g,
      `from "${config.aliases.ui}/$1"`
    );
  }
  
  return result;
}
