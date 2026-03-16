import React from "react";

import { Button } from "./ui/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="section" role="alert">
          <div className="section-center max-w-2xl text-center">
            <h2 className="mb-3">Something went wrong</h2>
            <p className="mb-6 text-slate-600">
              Please refresh the page and try again.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => window.location.reload()}>Refresh</Button>
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false })}
              >
                Try again
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
