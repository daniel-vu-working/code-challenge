import React, { useMemo, useCallback } from 'react';
import type { Token } from '../types';
import { useDropdown } from '../hooks/useDropdown';
import { TokenSelectorButton, SearchInput, TokenList } from './TokenSelectorComponents';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  token: Token | null;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  excludeToken?: Token | null;
  isOverLimit?: boolean;
  maxAmountUSD?: number;
  transitionClasses?: string;
}

const TokenAmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  token,
  onTokenSelect,
  tokens,
  label,
  placeholder = "0.0",
  readOnly = false,
  excludeToken = null,
  isOverLimit = false,
  maxAmountUSD = 1000000,
  transitionClasses = ""
}) => {
  const {
    isOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    closeDropdown,
    toggleDropdown
  } = useDropdown();

  const availableTokens = useMemo(() => tokens.filter(t => {
    if (excludeToken && t.symbol === excludeToken.symbol) return false;
    if (token && t.symbol === token.symbol) return false;
    return true;
  }), [excludeToken, token, tokens]);

  const filteredTokens = useMemo(() =>
    availableTokens.filter(tokenItem =>
      tokenItem.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    ), [availableTokens, searchTerm]
  );

  const handleTokenSelect = useCallback((selectedToken: Token) => {
    onTokenSelect(selectedToken);
    closeDropdown();
  }, [onTokenSelect, closeDropdown]);

  const handleButtonClick = () => {
    toggleDropdown();
  };

  const formatDisplayValue = (amount: string, price?: number): string => {
    if (!amount || !price) return '';
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return '';
    const usdValue = (numericAmount * price).toFixed(2);
    const formattedValue = parseFloat(usdValue).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(/,/g, ' ');
    return `≈ $${formattedValue}`;
  };

  const formatMaxAmountDisplay = (price: number): string => {
    const maxTokenAmount = maxAmountUSD / price;
    const formattedAmount = maxTokenAmount.toLocaleString('en-US', {
      maximumFractionDigits: 8
    }).replace(/,/g, ' ');
    // Remove trailing zeros and decimal point if not needed
    return formattedAmount.replace(/\.?0+$/, '');
  };

  const handleMaxClick = () => {
    if (token?.price) {
      const maxTokenAmount = maxAmountUSD / token.price;
      const formattedMaxAmount = parseFloat(maxTokenAmount.toFixed(8)).toString();
      onChange(formattedMaxAmount);
    }
  };
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-200 tracking-wide">
          {label}
        </span>
        {token?.price && (
          <span className={`text-xs text-emerald-400 font-medium ${transitionClasses}`}>
            ${(token.price.toFixed(6))}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-stretch relative justify-center" ref={dropdownRef}>
        <div className={`min-w-0 ${transitionClasses}`}>
          <TokenSelectorButton
            selectedToken={token}
            disabled={false}
            isOpen={isOpen}
            onClick={handleButtonClick}
            isLoading={tokens.length === 0}
          />
        </div>
        <div className={`flex-1 relative ${transitionClasses}`}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`text-right w-full px-4 py-4 max-h-[64px] rounded-b-xl sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-xl sm:rounded-br-xl text-2xl font-semibold bg-white/5 backdrop-blur-sm border border-white/10 outline-none text-gray-100 placeholder-gray-400 transition-all duration-200 focus:bg-white/10 focus:border-emerald-400/50 focus:shadow-lg focus:shadow-emerald-400/10 ${readOnly ? 'cursor-not-allowed text-gray-400 bg-white/5' : 'hover:bg-white/10'
              }`}
          />
          {value && token?.price && (
            <div className="absolute bottom-1 right-3 text-xs text-gray-400">
              {isOverLimit ? (
                <span className="text-red-400">
                  Max:{' '}
                  <button
                    type="button"
                    onClick={handleMaxClick}
                    className="text-red-400 hover:text-red-300 transition-colors cursor-pointer underline decoration underline-offset-2"
                  >
                    {formatMaxAmountDisplay(token.price)}
                  </button>
                </span>
              ) : (
                formatDisplayValue(value, token.price)
              )}
            </div>
          )}
        </div>

        {isOpen && (
          <div
            className="absolute w-full top-full bg-[#003366] backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-[9999] mt-2 overflow-hidden"
          >
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <div className="max-h-64 overflow-y-auto">
              <TokenList
                tokens={filteredTokens}
                onTokenSelect={handleTokenSelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenAmountInput;
