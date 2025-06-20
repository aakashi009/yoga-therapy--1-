import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#030F0F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          {/* Brand Section */}
          <div className="flex-1">
            <div className="mb-6">
              <Link href="/" className="text-2xl font-bold text-[#00DF82]">
                CureThruYoga
              </Link>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300 leading-tight">
                HEALING THROUGH
                <br />
                <span className="text-[#00DF82]">ANCIENT WISDOM.</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your health naturally with personalized yoga therapy designed for your specific conditions.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#03624C] rounded-full flex items-center justify-center hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#03624C] rounded-full flex items-center justify-center hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#03624C] rounded-full flex items-center justify-center hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#03624C] rounded-full flex items-center justify-center hover:bg-[#00DF82] hover:text-[#030F0F] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info - Right Side */}
          <div className="ml-8">
            <h3 className="text-lg font-semibold mb-4 text-[#00DF82]">GET IN TOUCH</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#00DF82] mt-1" />
                <div>
                  <p className="text-gray-400">
                    Dayalbagh Educational Institute
                    <br />
                    Agra, India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#00DF82]" />
                <p className="text-gray-400">+91-941056XXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00DF82]" />
                <p className="text-gray-400">sakshamspeaks10@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#03624C] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024, CureThruYoga. All rights reserved. | Designed for holistic healing through yoga.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-[#00DF82] transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00DF82] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#00DF82] transition-colors">
                Medical Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
