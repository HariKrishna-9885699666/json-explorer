export interface JsonError {
  message: string;
  line: number;
  column: number;
}

export interface ParseResult {
  isValid: boolean;
  data: unknown | null;
  error: JsonError | null;
}

export function parseJson(input: string): ParseResult {
  if (!input.trim()) {
    return {
      isValid: false,
      data: null,
      error: {
        message: "Empty input",
        line: 1,
        column: 1,
      },
    };
  }

  try {
    const data = JSON.parse(input);
    return {
      isValid: true,
      data,
      error: null,
    };
  } catch (e) {
    const error = e as SyntaxError;
    const match = error.message.match(/at position (\d+)/);
    const position = match ? parseInt(match[1], 10) : 0;

    // Calculate line and column from position
    const lines = input.substring(0, position).split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    // Try to provide more helpful error messages
    let message = error.message;
    
    // Common error fixes
    if (input.includes(",]") || input.includes(",}")) {
      message = "Trailing comma detected - remove the comma before ] or }";
    } else if (input.match(/[\w"]\s*\n\s*[\w"]/)) {
      message = "Missing comma between values";
    } else if ((input.match(/"/g) || []).length % 2 !== 0) {
      message = "Unbalanced quotes - check for missing or extra quotation marks";
    }

    return {
      isValid: false,
      data: null,
      error: {
        message,
        line,
        column,
      },
    };
  }
}

export function formatJson(input: string, spaces: number = 2): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, spaces);
  } catch {
    return input;
  }
}

export function minifyJson(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch {
    return input;
  }
}

export function getJsonPath(path: (string | number)[]): string {
  return path.reduce<string>((acc, key, index) => {
    if (typeof key === "number") {
      return `${acc}[${key}]`;
    }
    return index === 0 ? `$.${key}` : `${acc}.${key}`;
  }, "$");
}

export function getValueType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

export function getValuePreview(value: unknown): string {
  const type = getValueType(value);
  switch (type) {
    case "string":
      return `"${(value as string).length > 50 ? (value as string).substring(0, 50) + "..." : value}"`;
    case "number":
    case "boolean":
      return String(value);
    case "null":
      return "null";
    case "array":
      return `Array(${(value as unknown[]).length})`;
    case "object":
      return `Object(${Object.keys(value as object).length})`;
    default:
      return String(value);
  }
}

export const sampleJsonTemplates = {
  api: {
    name: "API Response",
    data: {
      success: true,
      data: {
        users: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
          { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" }
        ],
        pagination: {
          page: 1,
          perPage: 10,
          total: 42,
          totalPages: 5
        }
      },
      timestamp: "2025-01-04T12:00:00Z"
    }
  },
  config: {
    name: "Config File",
    data: {
      app: {
        name: "My Application",
        version: "1.0.0",
        environment: "production"
      },
      database: {
        host: "localhost",
        port: 5432,
        name: "myapp_db",
        ssl: true
      },
      features: {
        darkMode: true,
        notifications: true,
        analytics: false
      },
      limits: {
        maxUploadSize: 10485760,
        requestTimeout: 30000,
        maxConnections: 100
      }
    }
  },
  nested: {
    name: "Nested Structure",
    data: {
      company: {
        name: "Tech Corp",
        departments: [
          {
            name: "Engineering",
            teams: [
              { name: "Frontend", members: 5, technologies: ["React", "TypeScript", "Tailwind"] },
              { name: "Backend", members: 4, technologies: ["Node.js", "PostgreSQL", "Redis"] }
            ]
          },
          {
            name: "Design",
            teams: [
              { name: "UI/UX", members: 3, tools: ["Figma", "Sketch"] }
            ]
          }
        ]
      }
    }
  },
  invalid: {
    name: "Invalid (Test)",
    data: `{
  "name": "Test",
  "items": [1, 2, 3,],
  "incomplete": {
    "key": "value"
}` // Intentionally invalid
  }
};
