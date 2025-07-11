
const HealthInsightsPage = () => {
  return (
    <div className="py-16 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Health Insights</h1>
      <p className="text-gray-700 mb-6">
        Stay informed with the latest health trends, research, and tips from experts in the field.
      </p>

      <h2 className="text-xl font-semibold text-teal-600 mb-4">Latest Articles</h2>
      <div className="space-y-4 text-gray-600">
        <div>
          <h3 className="font-semibold">The Importance of Preventive Care</h3>
          <p>Prevention is better than cure. Learn why regular checkups can save lives.</p>
        </div>
        <div>
          <h3 className="font-semibold">Healthy Eating Habits</h3>
          <p>Discover how a balanced diet can improve your health and energy levels.</p>
        </div>
        <div>
          <h3 className="font-semibold">Mental Health and Wellness</h3>
          <p>Explore strategies to improve your mental well-being and cope with stress.</p>
        </div>
      </div>
    </div>
  );
};

export default HealthInsightsPage;
