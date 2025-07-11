import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#007E85] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Left Section: Company Info */}
        <div>
          <h1 className="text-xl font-bold mb-2">Harmony Health Clinic</h1>
          <p className="text-sm">Copyright © 2025 Limo Design | All Rights Reserved</p>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="font-semibold mb-2">Product</h3>
          <ul className="space-y-1 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Case studies</li>
            <li>Reviews</li>
            <li>Updates</li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>About</li>
            <li>Contact us</li>
            <li>Careers</li>
            <li>Culture</li>
            <li>Health Insights</li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li>Getting started</li>
            <li>Help center</li>
            <li>Server status</li>
            <li>Report a bug</li>
            <li>Chat support</li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="font-semibold mb-2">Follow us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaFacebookF /> Facebook
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter /> Twitter
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram /> Instagram
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedinIn /> LinkedIn
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube /> YouTube
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
