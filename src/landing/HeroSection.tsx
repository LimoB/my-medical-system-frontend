import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const rotatingMessages = [
  "💚 Trusted by 10,000+ happy patients",
  "🧑‍⚕️ Expert doctors with a human touch",
  "🌿 Personalized holistic treatment plans",
  "📞 24/7 Compassionate patient support",
  "🏥 Building healthier communities together",
];

const testimonials = [
  {
    quote: "Harmony Health gave me not just treatment, but true care. I felt seen, heard, and healed.",
    name: "– Amina K., Patient"
  },
  {
    quote: "Their team walked with me every step of the way. I've never felt more supported.",
    name: "– Daniel M., Father & Caregiver"
  },
  {
    quote: "Fast appointments, kind staff, and real results. Harmony truly lives up to its name.",
    name: "– Fatima S., Mother"
  },
  {
    quote: "Technology plus empathy — the perfect balance. This is how healthcare should feel.",
    name: "– Yusuf R., Engineer"
  },
];

const HeroSection = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const headingRef = useRef(null);
  const badgeRef = useRef(null);
  const testimonialRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const badgeInView = useInView(badgeRef, { once: true, margin: '-100px' });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 5000); // ⏳ Slower timing
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => {
      clearInterval(msgTimer);
      clearInterval(testimonialTimer);
    };
  }, []);

  return (
    <section className="relative bg-[#f4f4f5] pb-20 pt-16 px-6 md:px-12 overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
        src="/videos/video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* 🧠 Left Side Content */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Your Health In <span className="text-teal-600">Harmony</span> – <br className="hidden md:block" />
            Compassionate Care For a <span className="text-green-500">Brighter Tomorrow</span>
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            At Harmony Health Clinic, we’re dedicated to personalized, holistic care.
            Our experts blend advanced technology with deep compassion — for healthier communities, one person at a time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">
              Book Appointment
            </button>
            <button className="bg-gray-100 text-teal-600 px-6 py-3 rounded-full hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>

          {/* 🔁 Rotating Highlights with Fade-In */}
          <div className="relative mt-8 h-8 text-center lg:text-left overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-teal-700 font-semibold text-sm md:text-base"
              >
                {rotatingMessages[msgIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 🎖️ Animated Badges */}
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, y: 30 }}
            animate={badgeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <div className="bg-white shadow text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              ⭐ Rated <span className="text-teal-600 font-bold">4.9/5</span> by patients
            </div>
            <div className="bg-gray-100 text-teal-700 px-4 py-1 rounded-full text-sm">
              Over <span className="font-bold">30+</span> Medical Experts
            </div>
          </motion.div>
        </motion.div>

        {/* 💬 Testimonial Box */}
        <motion.div
          ref={testimonialRef}
          initial={{ opacity: 0, y: 40 }}
          animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:w-1/2 mt-10 lg:mt-0"
        >
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-md mx-auto min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-700 italic text-lg">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div className="mt-4 text-sm font-medium text-teal-600">
                  {testimonials[testimonialIndex].name}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold">
              💬 24/7 Patient Support Available
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🌊 Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-20 fill-[#f4f4f5]">
          <path d="M0,64L60,74.7C120,85,240,107,360,101.3C480,96,600,64,720,64C840,64,960,96,1080,106.7C1200,117,1320,107,1380,101.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
