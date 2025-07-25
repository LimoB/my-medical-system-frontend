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
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-5 text-sm text-center md:text-left">
        {/* Company Info */}
        <div className="space-y-2">
          <h1 className="text-lg font-bold">Harmony Health Clinic</h1>
          <p className="text-white/80">
            © {new Date().getFullYear()} Harmony Health | All Rights Reserved
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold mb-3">Product</h3>
          <ul className="space-y-2">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Updates</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Culture</a></li>
            <li><a href="#">Health Insights</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#">Getting Started</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Server Status</a></li>
            <li><a href="#">Report a Bug</a></li>
            <li><a href="#">Chat Support</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-3">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaFacebookF /> Facebook
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaTwitter /> Twitter
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaInstagram /> Instagram
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaLinkedinIn /> LinkedIn
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaYoutube /> YouTube
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
