import dailyReadImage from '@/assets/tamanna.jpg'; // Confirm the path

const DailyReadCard = () => {
  const dailyRead = {
    title: 'Effects of Intermittent Fasting on Metabolism',
    description:
      'Recent studies show that intermittent fasting can improve metabolic health and reduce inflammation in patients with Type 2 Diabetes. Explore how structured fasting windows affect insulin sensitivity.',
    image: dailyReadImage,
    link: '#',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-full flex flex-col">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Read</h2>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
          {dailyRead.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {dailyRead.description}
        </p>

        <a
          href={dailyRead.link}
          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition mb-4"
        >
          Read More →
        </a>

        {/* Image at the Bottom */}
        <img
          src={dailyRead.image}
          alt="Daily Read"
          className="w-full rounded-xl object-cover h-33 mt-auto"
        />
      </div>
    </div>
  );
};

export default DailyReadCard;
