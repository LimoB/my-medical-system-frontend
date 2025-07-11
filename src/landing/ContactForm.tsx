import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({ ...prev, terms: !prev.terms }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
  };

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-teal-600 text-center mb-6">Get In Touch</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="topic" className="block text-gray-700">Choose a topic</label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full mt-2"
            >
              <option value="">Select one...</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Appointments">Appointments</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              rows={4}
              className="p-3 border border-gray-300 rounded-md w-full mt-2"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">I accept the terms</label>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-full mt-6 hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
