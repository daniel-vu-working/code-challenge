import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading token prices...",
  className = ""
}) => (
  <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
    <div className="relative mb-6">
      <div className="w-12 h-12 border-3 border-white/20 border-t-emerald-400 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-r-emerald-300 rounded-full animate-spin animate-reverse"></div>
    </div>
    <p className="text-gray-300 text-lg font-medium">{message}</p>
  </div>
);

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  className = ""
}) => (
  <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p className="text-red-400 mb-6 text-base font-medium">Error loading token data: {error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/25"
      >
        Try Again
      </button>
    )}
  </div>
);

export { LoadingState, ErrorState };
