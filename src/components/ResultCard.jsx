const ResultCard = ({ result, onClear }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      // You could add a toast notification here
      alert('Content copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'LinkedIn': '💼',
      'Twitter': '🐦',
      'Instagram': '📸'
    };
    return icons[platform] || '📱';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'LinkedIn': 'from-blue-500 to-blue-600',
      'Twitter': 'from-sky-400 to-sky-500',
      'Instagram': 'from-pink-500 to-purple-600'
    };
    return colors[platform] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 animate-slide-up">
      <div className={`bg-gradient-to-r ${getPlatformColor(result.platform)} p-6 rounded-t-2xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{getPlatformIcon(result.platform)}</span>
            <div>
              <h3 className="text-xl font-bold text-white">Generated for {result.platform}</h3>
              <p className="text-white/80 text-sm">Topic: {result.topic}</p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            title="Clear result"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Generated Content:</h4>
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-accent-500">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.content}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={copyToClipboard}
            className="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy to Clipboard
            </div>
          </button>
          
          <button
            onClick={onClear}
            className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
          >
            Generate New Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;