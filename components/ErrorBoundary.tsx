'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export function handleError(error: Error) {
  // TODO: Implement error logging service
  console.error('Application error:', error);
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    handleError(error);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-opiol-dark text-white p-4 flex items-center justify-center"
        >
          <div className="max-w-md w-full space-y-6 text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-6xl mb-4"
            >
              ⚠️
            </motion.div>
            
            <h1 className="text-2xl font-bold text-opiol-gold">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-300">
              We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="mt-4 p-4 bg-opiol-dark/50 rounded-lg text-left overflow-auto"
              >
                <p className="text-red-400 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleRetry}
              className="mt-6 px-6 py-3 bg-opiol-gold text-opiol-dark font-semibold rounded-lg 
                       hover:bg-opiol-gold/90 transition-colors duration-200"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
} 