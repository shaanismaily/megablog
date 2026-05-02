import {Logo} from "../index"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo width="100px" className="rounded-lg" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Building modern web experiences with clean design and scalable architecture.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400 text-center sm:text-left">
            © 2026 ShaanIsmaily. All rights reserved.
          </p>

          {/* Optional Socials */}
          <div className="flex gap-4">
            <span className="text-gray-400 text-sm">Follow:</span>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;