const HeroSection = () => {
  return (
    <section className="bg-[#f4f4f5] py-16 px-6 md:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Health In <span className="text-teal-600">Harmony</span> – <br className="hidden md:block" />
          Compassionate Care For <span className="text-green-500">Brighter Tomorrow</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          At Harmony Health Clinic, we are committed to delivering compassionate, personalized care to you and your loved ones.
          Our expert team of healthcare professionals combines state-of-the-art technology and a patient-first philosophy.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">
            Appointments
          </button>
          <button className="bg-gray-100 text-teal-600 px-6 py-3 rounded-full hover:bg-gray-200 transition">
            Watch Video
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <div className="bg-gray-100 text-teal-600 px-4 py-1 rounded-full text-sm">
            Our Professionals <span className="font-bold">30+</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0 relative">
        <div className="bg-teal-600 absolute top-4 right-4 text-white px-4 py-2 rounded-full text-xs font-semibold">
          24/7 Service
        </div>
        <img
          src="/image 17.png" // Replace with actual path if needed
          alt="Doctor Hero"
          className="w-full max-w-md mx-auto rounded-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;




// import { useEffect, useState } from 'react';

// const imageList = [
//   '/Hero/1.jpeg',
//   '/Hero/2.jpeg',
//   '/Hero/3.jpeg',
//   '/Hero/4.jpeg',
//   '/Hero/5.jpeg',
//   '/Hero/6.jpeg',
//   '/Hero/7.jpeg',
// ];

// const HeroSection = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-6 md:px-12">
//       {/* 🔁 Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src={imageList[currentImageIndex]}
//           alt="Background Slide"
//           className="w-full h-full object-cover object-center transition-opacity duration-1000 opacity-90"
//         />
//       </div>

//       {/* 🔳 Transparent Content */}
//       <div className="relative z-10 w-full py-16 text-white text-center lg:text-left lg:max-w-4xl mx-auto">
//         <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
//           Your Health In <span className="text-teal-300">Harmony</span> – <br className="hidden md:block" />
//           Compassionate Care For <span className="text-green-300">Brighter Tomorrow</span>
//         </h1>

//         <p className="text-lg mb-6 drop-shadow-sm">
//           At Harmony Health Clinic, we are committed to delivering compassionate, personalized care to you and your loved ones.
//           Our expert team of healthcare professionals combines state-of-the-art technology and a patient-first philosophy.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//           <button className="bg-teal-600/90 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">
//             Appointments
//           </button>
//           <button className="bg-white/20 text-white px-6 py-3 rounded-full hover:bg-white/30 transition border border-white/30">
//             Watch Video
//           </button>
//         </div>

//         <div className="mt-4 flex justify-center lg:justify-start gap-4">
//           <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm shadow border border-white/30">
//             Our Professionals <span className="font-bold">30+</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

