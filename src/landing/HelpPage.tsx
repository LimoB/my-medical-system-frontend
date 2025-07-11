
const HelpPage = () => {
  return (
    <div className="py-16 px-6 md:px-12">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Help & Support</h1>
      <p className="text-gray-700 mb-6">
        If you need assistance or have any questions, please refer to the information below or contact our support team.
      </p>

      <h2 className="text-xl font-semibold text-teal-600 mb-4">Frequently Asked Questions</h2>
      <ul className="space-y-4 text-gray-600">
        <li><strong>How can I book an appointment?</strong> You can book an appointment via our online system or by calling our clinic.</li>
        <li><strong>What services do you offer?</strong> We offer a wide range of medical services, including dental, orthopedic, cardiology, and more.</li>
        <li><strong>How do I contact customer support?</strong> You can reach our support team by email or phone. Details can be found in the contact section.</li>
      </ul>
    </div>
  );
};

export default HelpPage;
