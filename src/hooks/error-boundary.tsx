import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { LuRotateCcw } from "react-icons/lu";
import { logger } from "../libs/security/logger";
import { ENV } from "../config/env";

type ErrorBoundaryState = {
  hasError: boolean;
  error: unknown;
  info: ErrorInfo | null;
};

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    let safeError = error;

    try {
      // Log error securely (sanitized)
      logger.error("Error caught by ErrorBoundary", {
        context: "ErrorBoundary",
        data: {
          error: error instanceof Error ? error.message : String(error),
          componentStack: info.componentStack,
        },
      });
    } catch (_fallbackError) {
      logger.error("Error logging failed in ErrorBoundary", {
        context: "ErrorBoundary",
        data: { fallbackError: String(_fallbackError) },
      });
      safeError = { message: String(error) };
    }

    this.setState({ error: safeError, info });
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    try {
      return JSON.stringify(error);
    } catch {
      return "An unknown error occurred.";
    }
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.getErrorMessage(this.state.error);
      const showDetails = ENV.isDevelopment;

      return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Error Header */}
            <div className="bg-linear-to-r from-red-500 to-red-600 p-6 flex items-center gap-4">
              <FaExclamationTriangle className="w-8 h-8 text-white shrink-0" />
              <div>
                <h1 className="text-xl font-bold text-white">Oops!</h1>
                <p className="text-red-100 text-sm">Something went wrong</p>
              </div>
            </div>

            {/* Error Content */}
            <div className="p-6 space-y-4">
              <p className="text-slate-700 text-base leading-relaxed">
                We encountered an unexpected error while processing your
                request. Our team has been notified and will look into it.
              </p>

              {/* Error Details (Dev Only) */}
              {showDetails && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Error Details:
                  </p>
                  <pre className="text-xs bg-slate-100 p-3 rounded-lg overflow-x-auto border border-slate-200 whitespace-pre-wrap wrap-break-word max-h-40">
                    {errorMessage}
                  </pre>
                  {this.state.info?.componentStack && (
                    <>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide pt-2">
                        Component Stack:
                      </p>
                      <pre className="text-xs bg-slate-100 text-slate-700 p-3 rounded-lg overflow-x-auto border border-slate-200 whitespace-pre-wrap wrap-break-word max-h-32">
                        {this.state.info.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <LuRotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium rounded-lg transition-colors duration-200"
              >
                <IoHome className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
