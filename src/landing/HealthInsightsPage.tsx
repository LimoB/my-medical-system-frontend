const HealthInsightsPage = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center py-16 px-6 md:px-12" 
      style={{ backgroundImage: `url('/national-cancer.jpg')` }}
    >
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal-200">Health Insights</h1>
        <p className="text-lg mb-12 max-w-3xl mx-auto text-teal-100">
          Stay informed with the latest health trends, research, and tips from experts in the field.
        </p>

        <h2 className="text-xl font-semibold text-teal-100 mb-6">Latest Articles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-900">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-teal-700 mb-3">The Importance of Preventive Care</h3>
            <p>Prevention is better than cure. Learn why regular checkups can save lives.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-teal-700 mb-3">Healthy Eating Habits</h3>
            <p>Discover how a balanced diet can improve your health and energy levels.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-teal-700 mb-3">Mental Health and Wellness</h3>
            <p>Explore strategies to improve your mental well-being and cope with stress.</p>
          </div>
          {/* Add more articles if needed */}
        </div>
      </div>
    </div>
  );
};

export default HealthInsightsPage;
