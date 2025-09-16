import type { Token } from '../types';
import { TokenDisplay, ChevronIcon } from './TokenDisplay';

interface TokenSelectorButtonProps {
  selectedToken: Token | null;
  disabled: boolean;
  isOpen: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

export const TokenSelectorButton: React.FC<TokenSelectorButtonProps> = ({
  selectedToken,
  disabled,
  isOpen,
  onClick,
  isLoading = false
}) => (
  <button
    className={`w-full p-3 rounded-t-xl sm:rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none sm:rounded-br-none bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-200 flex items-center justify-between min-h-16 text-base hover:bg-white/10 focus:bg-white/10 focus:border-emerald-400/50 focus:outline-none ${disabled ? 'bg-white/5 cursor-not-allowed opacity-60' : ''}`}
    onClick={onClick}
    disabled={disabled || isLoading}
    type="button"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
  >
    {selectedToken ? (
      <TokenDisplay token={selectedToken} />
    ) : (
      <span className="text-gray-500 text-base">
        {isLoading ? "Loading..." : "Select token"}
      </span>
    )}
    <ChevronIcon isOpen={isOpen} />
  </button>
);

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="p-3 border-b border-white/10">
    <input
      type="text"
      placeholder="Search tokens..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 placeholder-gray-400 focus:bg-white/10 focus:border-emerald-400/50 focus:shadow-lg focus:shadow-emerald-400/10"
      autoFocus
    />
  </div>
);

interface TokenListItemProps {
  token: Token;
  onSelect: (token: Token) => void;
}

export const TokenListItem: React.FC<TokenListItemProps> = ({
  token,
  onSelect
}) => (
  <button
    className={`w-full p-3 border-none cursor-pointer transition-all duration-200 flex items-center gap-3 text-left hover:bg-white/10 focus:bg-white/10 focus:outline-none group`}
    onClick={() => onSelect(token)}
    type="button"
  >
    <TokenDisplay token={token} showPrice />
  </button>
);

interface TokenListProps {
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
}

export const TokenList: React.FC<TokenListProps> = ({
  tokens,
  onTokenSelect
}) => (
  <div>
    {tokens.length > 0 ? (
      tokens.map((token) => (
        <TokenListItem
          key={token.symbol}
          token={token}
          onSelect={onTokenSelect}
        />
      ))
    ) : (
      <div className="p-8 text-center text-gray-400 text-sm">No tokens found</div>
    )}
  </div>
);
