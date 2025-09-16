import CryptoSwapForm from './components/CryptoSwapForm'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="text-center mb-8 z-10 relative">
        <h1 className="text-4xl text-gray-300 md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent select-none">
          Crypto Swap
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto">
          Trade cryptocurrencies instantly with the best rates
        </p>
      </div>

      <CryptoSwapForm />
    </div>
  )
}

export default App
