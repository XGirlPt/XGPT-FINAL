const LoaderBar = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-75">
    <div className="loader border-t-4 border-pink-600 rounded-full w-12 h-12 animate-spin mb-4"></div>
    <p className="text-pink-600 font-semibold text-lg">A carregar o seu Story...</p>
  </div>

);

export default LoaderBar;