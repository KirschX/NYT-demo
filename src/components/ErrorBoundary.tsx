import React, { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error("Caught an error:", error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>에러가 발생했습니다.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
