// Footer image and social links
import React from 'react'
import { Facebook, Instagram, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Footer Logo - Left Side */}
          <div className="flex-shrink-0">
            <img 
              src="/footer-image.png" 
              alt="Stay Sweet" 
              className="h-24 sm:h-32 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Social Links & Contact - Right Side */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              
              {/* Facebook - Phlox */}
              <a 
                href="https://www.facebook.com/profile.php?id=61577922897409"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-phlox-500 hover:bg-phlox-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-phlox-300/50"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>

              {/* Instagram - Yellow Green */}
              <a 
                href="https://www.instagram.com/realsweetbros/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-yellow_green-500 hover:bg-yellow_green-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-yellow_green-300/50"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>

              {/* TikTok - Red */}
              <a 
                href="https://www.tiktok.com/@realsweetbros?_t=ZN-8yXG8Zsor7W&_r=1&fbclid=IwY2xjawL9jDBleHRuA2FlbQIxMQABHjmqR0SRFlQEEoRbS9PXuGjuRI6_jj6b3Jjg7H2SvKIjq0gwC_Zo25NNJ1yF_aem_YsIS0hkrl2-ia52jvugRzw"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-red-300/50"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Email - Dodger Blue */}
              <a 
                href="mailto:info@sweet-bros.co.uk"
                className="group p-3 bg-dodger_blue-500 hover:bg-dodger_blue-600 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-dodger_blue-300/50"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right space-y-1">
              <p className="text-gray-300 text-sm">Get in touch!</p>
              <p className="text-white font-medium">info@sweet-bros.co.uk</p>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs">
                © 2025 Sweet Bros. All rights reserved. 🍭
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer