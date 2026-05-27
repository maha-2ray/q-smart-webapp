import { ENV } from "../../config/env";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogOptions {
  level?: LogLevel;
  context?: string;
  data?: unknown;
}

/**
 * Sanitize data before logging (remove sensitive information)
 */
const sanitizeForLogging = (data: unknown): unknown => {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const sensitiveKeys = [
    "password",
    "token",
    "authorization",
    "auth",
    "secret",
    "key",
    "apiKey",
  ];
  const sanitized = Array.isArray(data)
    ? [...data]
    : { ...(data as Record<string, unknown>) };

  if (Array.isArray(sanitized)) {
    return sanitized.map((item) => sanitizeForLogging(item));
  }

  for (const key in sanitized as Record<string, unknown>) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some((sensitive) => lowerKey.includes(sensitive))) {
      (sanitized as Record<string, unknown>)[key] = "[REDACTED]";
    } else if (
      typeof (sanitized as Record<string, unknown>)[key] === "object"
    ) {
      (sanitized as Record<string, unknown>)[key] = sanitizeForLogging(
        (sanitized as Record<string, unknown>)[key],
      );
    }
  }

  return sanitized;
};

/**
 * Logger class with security-conscious logging
 */
class Logger {
  private isDevelopment = ENV.isDevelopment;

  private log(level: LogLevel, message: string, options?: LogOptions): void {
    if (!this.isDevelopment && level === "debug") {
      return; // Don't log debug messages in production
    }

    const context = options?.context ? `[${options.context}]` : "";
    const sanitizedData = options?.data
      ? sanitizeForLogging(options.data)
      : undefined;

    const logMessage = `${context} ${message}`;

    switch (level) {
      case "debug":
        console.debug(logMessage, sanitizedData);
        break;
      case "info":
        console.info(logMessage, sanitizedData);
        break;
      case "warn":
        console.warn(logMessage, sanitizedData);
        break;
      case "error":
        console.error(logMessage, sanitizedData);
        break;
    }
  }

  debug(message: string, options?: LogOptions): void {
    this.log("debug", message, options);
  }

  info(message: string, options?: LogOptions): void {
    this.log("info", message, options);
  }

  warn(message: string, options?: LogOptions): void {
    this.log("warn", message, options);
  }

  error(message: string, options?: LogOptions): void {
    this.log("error", message, options);
  }
}

export const logger = new Logger();
