import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[--course-bg] text-neutral-100 z-[100]">
      <div className="w-[90%] md:max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-semibold mb-4">Office Address</h4>
          <p className="text-sm">
            19, Idi Araba, Block J, Apple Apata Estate, Lagos Island
          </p>
          <p className="mt-2 text-sm">info@email.com</p>
          <p className="mt-2 text-sm">+2348030000000</p>
          <p className="text-sm">+2348020000000</p>
        </div>

        <div className="flex gap-5 w-full md:w-[80%] justify-between">
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Training</li>
              <li>About Us</li>
              <li>Store</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Socials</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Facebook size={16} /> Facebook
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={16} /> Instagram
              </li>
              <li className="flex items-center gap-2">
                <Twitter size={16} /> X (Twitter)
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-neutral-800 text-sm px-4 py-2 w-full rounded-l outline-none"
            />
            <button className="bg-red-600 px-4 py-2 rounded-r">&rarr;</button>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-neutral-800 text-xs">
        © YSFON. All Rights Reserved 2025
      </div>
    </footer>
  );
};
