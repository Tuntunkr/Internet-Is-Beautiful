import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/Button'

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
              Something went wrong
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We're sorry, an unexpected error occurred. Please try refreshing the page.
            </p>
            <Button
              variant="primary"
              className="mt-6"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
