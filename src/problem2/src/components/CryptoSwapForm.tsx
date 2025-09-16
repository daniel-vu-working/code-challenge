import { useState, useEffect } from "react";
import type { SwapFormData, Token } from "../types";
import { useTokenPrices } from "../hooks/useTokenPrices";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSwapSubmission } from "../hooks/useSwapSubmission";
import { useAmountInput } from "../hooks/useAmountInput";
import TokenAmountInput from "./TokenAmountInput";
import SwapButton from "./SwapButton";
import ExchangeRateDisplay from "./ExchangeRateDisplay";
import SubmitResult from "./SubmitResult";
import { LoadingState, ErrorState } from "./StateComponents";

const INITIAL_FORM_DATA: SwapFormData = {
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
};

const CryptoSwapForm: React.FC = () => {
  const { tokens, loading, error, calculateExchangeRate } = useTokenPrices();
  const {
    errors,
    validateForm,
    isFormValid,
    isAmountOverLimit,
    clearError,
    config,
  } = useFormValidation();
  const { isSubmitting, submitResult, submitSwap } = useSwapSubmission();
  const { sanitizeAmount } = useAmountInput();

  const [formData, setFormData] = useState<SwapFormData>(INITIAL_FORM_DATA);
  const [lastEditedField, setLastEditedField] = useState<"from" | "to" | null>(
    null
  );
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (tokens.length > 0 && !formData.fromToken && !formData.toToken) {
      const ethToken = tokens.find((token) => token.symbol === "ETH");
      const usdToken = tokens.find((token) => token.symbol === "USD");

      if (ethToken && usdToken) {
        setFormData((prev) => ({
          ...prev,
          fromToken: ethToken,
          toToken: usdToken,
        }));
      }
    }
  }, [tokens, formData.fromToken, formData.toToken]);

  useEffect(() => {
    if (formData.fromToken && formData.toToken) {
      const rate = calculateExchangeRate(
        formData.fromToken.symbol,
        formData.toToken.symbol
      );

      if (rate > 0) {
        if (lastEditedField === "from" && formData.fromAmount) {
          const amount = parseFloat(formData.fromAmount);
          if (!isNaN(amount) && amount > 0) {
            const toAmount = (amount * rate).toFixed(8);
            setFormData((prev) => ({
              ...prev,
              toAmount: parseFloat(toAmount).toString(),
            }));
          }
        } else if (lastEditedField === "to" && formData.toAmount) {
          const amount = parseFloat(formData.toAmount);
          if (!isNaN(amount) && amount > 0) {
            const fromAmount = (amount / rate).toFixed(8);
            setFormData((prev) => ({
              ...prev,
              fromAmount: parseFloat(fromAmount).toString(),
            }));
          }
        }
      }
    }

    if (!formData.fromToken || !formData.toToken) {
      if (lastEditedField === "from" && !formData.fromAmount) {
        setFormData((prev) => ({ ...prev, toAmount: "" }));
      } else if (lastEditedField === "to" && !formData.toAmount) {
        setFormData((prev) => ({ ...prev, fromAmount: "" }));
      }
    }
  }, [
    formData.fromToken,
    formData.toToken,
    formData.fromAmount,
    formData.toAmount,
    lastEditedField,
    calculateExchangeRate,
  ]);

  const handleFromAmountChange = (value: string) => {
    const sanitizedValue = sanitizeAmount(value);
    setFormData((prev) => ({ ...prev, fromAmount: sanitizedValue }));
    setLastEditedField("from");

    if (errors.fromAmount) {
      clearError("fromAmount");
    }
  };

  const handleToAmountChange = (value: string) => {
    const sanitizedValue = sanitizeAmount(value);
    setFormData((prev) => ({ ...prev, toAmount: sanitizedValue }));
    setLastEditedField("to");
  };

  const handleFromTokenSelect = (token: Token) => {
    setFormData((prev) => ({ ...prev, fromToken: token }));
    if (errors.fromToken) {
      clearError("fromToken");
    }
    if (!lastEditedField && formData.fromAmount) {
      setLastEditedField("from");
    }
  };

  const handleToTokenSelect = (token: Token) => {
    setFormData((prev) => ({ ...prev, toToken: token }));
    if (errors.toToken) {
      clearError("toToken");
    }
    if (!lastEditedField && formData.toAmount) {
      setLastEditedField("to");
    }
  };

  const handleSwapTokens = () => {
    setIsSwapping(true);

    setTimeout(() => {
      setIsSwapping(false);
      setLastEditedField((prev) =>
        prev === "from" ? "to" : prev === "to" ? "from" : null
      );
      setFormData((prev) => ({
        ...prev,
        fromToken: prev.toToken,
        toToken: prev.fromToken,
        fromAmount: prev.toAmount,
        toAmount: prev.fromAmount,
      }));
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    await submitSwap(formData);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const exchangeRate =
    formData.fromToken && formData.toToken
      ? calculateExchangeRate(
          formData.fromToken.symbol,
          formData.toToken.symbol
        )
      : 0;

  const isSwapDisabled = !formData.fromToken || !formData.toToken;
  const isFormComplete = isFormValid(formData);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        {/* Glassmorphism container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>

          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={handleRetry} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 relative z-10"
            >
              <div>
                <TokenAmountInput
                  value={formData.fromAmount}
                  onChange={handleFromAmountChange}
                  token={formData.fromToken}
                  onTokenSelect={handleFromTokenSelect}
                  tokens={tokens}
                  label={"Amount to send"}
                  excludeToken={formData.toToken}
                  isOverLimit={isAmountOverLimit(formData)}
                  maxAmountUSD={config.maxAmountUSD}
                  transitionClasses={
                    isSwapping
                      ? "transition-all duration-500 ease-in-out transform translate-y-50 sm:translate-y-34"
                      : "transition-none"
                  }
                />
              </div>

              <SwapButton onSwap={handleSwapTokens} disabled={isSwapDisabled} />

              <div>
                <TokenAmountInput
                  value={formData.toAmount}
                  onChange={handleToAmountChange}
                  token={formData.toToken}
                  onTokenSelect={handleToTokenSelect}
                  tokens={tokens}
                  label="Amount to receive"
                  excludeToken={formData.fromToken}
                  transitionClasses={
                    isSwapping
                      ? "transition-all duration-500 ease-in-out transform -translate-y-50 sm:-translate-y-34"
                      : "transition-none"
                  }
                />
              </div>

              {formData.fromToken && formData.toToken && (
                <ExchangeRateDisplay
                  fromSymbol={formData.fromToken.symbol}
                  toSymbol={formData.toToken.symbol}
                  rate={exchangeRate}
                />
              )}

              {submitResult && (
                <SubmitResult
                  success={submitResult.success}
                  message={submitResult.message}
                />
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden cursor-pointer transition-all duration-300 group ${
                  isSubmitting || !isFormComplete
                    ? "bg-gray-500/50 cursor-not-allowed text-gray-400"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-emerald-500/40 transform hover:scale-[1.02] active:scale-[0.99] ring-1 ring-emerald-400/40 hover:ring-emerald-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                }`}
                disabled={isSubmitting || !isFormComplete}
              >
                {/* Shimmer effect for enabled state */}
                {!isSubmitting && isFormComplete && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}

                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Swap...</span>
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Confirm Swap</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoSwapForm;
