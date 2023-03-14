import { Component } from "react";
import Error from "../Error/index.js";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    console.log(error);
    console.log(errorInfo);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Error />
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
