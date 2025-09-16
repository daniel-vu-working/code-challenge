import React from 'react';

interface SubmitResultProps {
  success: boolean;
  message: string;
  className?: string;
}

const SubmitResult: React.FC<SubmitResultProps> = ({
  success,
  message,
  className = ""
}) => {
  return (
    <div
      className={`py-4 px-6 rounded-xl text-sm font-medium text-center backdrop-blur-sm border transition-all duration-300 ${success
        ? 'bg-green-500/10 text-green-300 border-green-400/30 hover:bg-green-500/15'
        : 'bg-red-500/10 text-red-300 border-red-400/30 hover:bg-red-500/15'
        } ${className}`}
    >
      <div className="flex items-center justify-center gap-3">
        {success ? (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default SubmitResult;
