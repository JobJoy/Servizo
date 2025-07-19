import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-5 m-5 border border-red-500 bg-red-100 text-red-800 rounded-lg">
          <h1 className="text-2xl font-bold text-red-900">Oops! Something went wrong.</h1>
          <p className="mt-2.5 mb-4 text-base">We're sorry, but the application encountered an error. Please try refreshing the page, or check the console for more details.</p>
          {this.state.error && (
            <details className="whitespace-pre-wrap bg-yellow-100 p-2.5 rounded border border-yellow-300">
              <summary className="cursor-pointer font-semibold text-yellow-800">Error Details (for developers)</summary>
              <p className="mt-1.5 text-sm text-yellow-900"><strong>Message:</strong> {this.state.error.toString()}</p>
              {this.state.errorInfo && this.state.errorInfo.componentStack && (
                <>
                  <p className="mt-1.5 text-sm text-yellow-900"><strong>Component Stack:</strong></p>
                  <pre className="overflow-x-auto p-2.5 mt-1 bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
            </details>
          )}
          <p className="mt-4 text-sm">
            If the problem persists, please report this issue.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;