import React from 'react';

interface ExchangeRateDisplayProps {
  fromSymbol: string;
  toSymbol: string;
  rate: number;
  className?: string;
}

const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  fromSymbol,
  toSymbol,
  rate,
  className = ""
}) => {
  if (rate <= 0) return null;

  return (
    <div className={`text-center py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-emerald-300 font-medium hover:bg-white/10 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <span className="text-gray-400">Exchange Rate:</span>
        <span className="font-semibold">1 {fromSymbol} = {rate.toFixed(8)} {toSymbol}</span>
      </div>
    </div>
  );
};

export default ExchangeRateDisplay;
