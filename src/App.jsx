import { useState } from 'react';
import ContentForm from './components/ContentForm';
import ResultCard from './components/ResultCard';
import { generateContent } from './services/geminiService';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (topic, platform) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedContent = await generateContent(topic, platform);
      setResult(generatedContent);
    } catch (err) {
      setError(err.message);
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ContentForm onGenerate={handleGenerate} isLoading={isLoading} />
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-8 animate-slide-up">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">Generation Error</h3>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto flex-shrink-0 text-red-400 hover:text-red-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {result && (
          <ResultCard result={result} onClear={handleClear} />
        )}

        {!result && !isLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ready to Create Amazing Content?</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a topic above and select your platform to generate engaging social media content powered by AI.
            </p>
          </div>
        )}

        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by Google Gemini AI • Built with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;