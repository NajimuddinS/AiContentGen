import { useState } from 'react';

const ContentForm = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('LinkedIn');

  const platforms = [
    { value: 'LinkedIn', label: 'LinkedIn', icon: '💼' },
    { value: 'Twitter', label: 'Twitter', icon: '🐦' },
    { value: 'Instagram', label: 'Instagram', icon: '📸' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), platform);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          AI Social Content Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your ideas into engaging social media posts tailored for different platforms using Gemini AI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-3">
            What topic would you like to create content about?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Remote Work Productivity Tips, Digital Marketing Trends, Healthy Lifestyle..."
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-3">
            Choose your target platform
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {platforms.map((p) => (
              <label
                key={p.value}
                className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  platform === p.value
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={p.value}
                  checked={platform === p.value}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="sr-only"
                  disabled={isLoading}
                />
                <span className="text-2xl mr-3">{p.icon}</span>
                <span className={`font-medium ${
                  platform === p.value ? 'text-primary-700' : 'text-gray-700'
                }`}>
                  {p.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              Generating Amazing Content...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2">✨</span>
              Generate Social Post
              <span className="ml-2">🚀</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;