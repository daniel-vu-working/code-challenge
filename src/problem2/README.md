# Crypto Swap Application

[Try it out](https://code-challenge-six-orpin.vercel.app/)

A modern, responsive cryptocurrency swap interface built with React, TypeScript, and UnoCSS. This application allows users to swap between different cryptocurrencies with real-time exchange rates and a beautiful glassmorphism UI design.

## 🚀 Features

- **Real-time Exchange Rates**: Fetches live cryptocurrency prices from external API
- **Interactive Token Selection**: Dropdown selectors for both source and destination tokens
- **Bidirectional Amount Calculation**: Automatically calculates amounts in both directions
- **Form Validation**: Comprehensive validation with error handling and limits
- **Responsive Design**: Mobile-first design with glassmorphism effects
- **Token Icons**: Dynamic token icons with fallback handling
- **Smooth Animations**: Elegant transitions and loading states
- **Error Handling**: Robust error handling with retry functionality

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: UnoCSS with Wind CSS presets
- **Build Tool**: Vite 7.0.4
- **Linting**: ESLint with TypeScript support
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd code-challenge/src/problem2
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

5. **Preview production build**
   ```bash
   pnpm preview
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── CryptoSwapForm.tsx      # Main swap form component
│   ├── TokenAmountInput.tsx     # Token input with dropdown
│   ├── SwapButton.tsx          # Token swap button
│   ├── ExchangeRateDisplay.tsx # Exchange rate display
│   ├── SubmitResult.tsx        # Submission result component
│   ├── StateComponents.tsx     # Loading and error states
│   └── TokenSelectorComponents.tsx # Token selector components
├── hooks/               # Custom React hooks
│   ├── useTokenPrices.ts       # Token price fetching logic
│   ├── useFormValidation.ts    # Form validation logic
│   ├── useSwapSubmission.ts   # Swap submission handling
│   ├── useAmountInput.ts      # Amount input sanitization
│   └── useDropdown.ts        # Dropdown state management
├── data/                # Static data
│   └── popularCryptos.ts      # Popular cryptocurrency list
├── types/               # TypeScript type definitions
│   └── index.ts              # Main type definitions
└── App.tsx              # Main application component
```

## 🔧 Key Components

### CryptoSwapForm
The main component that orchestrates the entire swap interface, handling:
- Form state management
- Token selection
- Amount calculations
- Form validation
- Submission handling

### TokenAmountInput
A reusable component for token input fields featuring:
- Amount input with validation
- Token dropdown selector
- Real-time amount conversion
- Error state display

### Custom Hooks

- **useTokenPrices**: Manages token price fetching and exchange rate calculations
- **useFormValidation**: Handles form validation logic and error states
- **useSwapSubmission**: Manages swap submission and result handling
- **useAmountInput**: Provides amount sanitization utilities

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like design with backdrop blur effects
- **Gradient Backgrounds**: Animated gradient backgrounds for visual appeal
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Smooth Animations**: CSS transitions for enhanced user experience
- **Loading States**: Elegant loading indicators and error states

## 🔌 API Integration

The application integrates with:
- **Price API**: `https://interview.switcheo.com/prices.json` for real-time token prices
- **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/` for token icons

## 📱 Usage

1. **Select Tokens**: Choose source and destination tokens from the dropdown menus
2. **Enter Amount**: Input the amount you want to swap in either field
3. **View Rate**: The exchange rate is automatically calculated and displayed
4. **Swap Tokens**: Use the swap button to reverse the token selection
5. **Submit**: Click "Confirm Swap" to process the transaction

## ⚙️ Configuration

The application includes several configurable options:
- Maximum swap amount limits
- Supported token list
- API endpoints
- Validation rules

## 🧪 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- UnoCSS for utility-first styling
- React hooks for state management

## 🚀 Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Simply run `pnpm build` and deploy the `dist` folder.

## 📄 License

This project is part of the 99Tech Code Challenge #1.
