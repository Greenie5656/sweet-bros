// Footer image and social links with Returns section
import React, { useState } from 'react'
import { Facebook, Instagram, Mail, ChevronDown, ChevronUp } from 'lucide-react'

function Footer() {
  const [returnsOpen, setReturnsOpen] = useState(false)

  const toggleReturns = () => setReturnsOpen(!returnsOpen)

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
          </div>
        </div>

        {/* Returns & Care Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Returns Header - Collapsible */}
            <button
              onClick={toggleReturns}
              className="w-full flex items-center justify-center gap-3 mb-6 group"
            >
              <div className="text-2xl">🍭</div>
              <h3 className="text-xl font-bold text-white group-hover:text-phlox-300 transition-colors">
                Sweet Returns & Care
              </h3>
              <div className="text-2xl">🍭</div>
              {returnsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Returns Content - Collapsible */}
            {returnsOpen && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 md:p-8 space-y-4 text-gray-200 leading-relaxed">
                
                {/* Opening paragraph */}
                <p>
                  We take <span className="font-bold text-phlox-400">pride</span> in preparing your order <span className="font-semibold text-yellow_green-400">carefully</span> and making sure it reaches you just as you'd expect.
                </p>
                
                <p>
                  If for any reason this isn't the case, we'll do <span className="font-bold text-red-400">everything</span> we can to <span className="font-semibold text-dodger_blue-400">fix it</span>. Please contact our <span className="font-bold text-phlox-400">sweet team</span> at <a href="mailto:info@sweet-bros.co.uk" className="text-dodger_blue-400 hover:text-dodger_blue-300 font-semibold underline">info@sweet-bros.co.uk</a> with your order number and details of the issue within <span className="font-bold text-red-400">14 days</span> of receipt. We'll do our <span className="font-semibold text-yellow_green-400">best</span> to resolve the problem as <span className="font-bold text-dodger_blue-400">quickly</span> as possible.
                </p>

                {/* Bullet points with candy emojis */}
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow_green-400">🍬</span>
                    <span>Returned products must be in <span className="font-bold text-yellow_green-400">perfect sweet condition</span>, unless specified as damaged during transit.</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-dodger_blue-400">🍭</span>
                    <span>Return postage is the buyer's responsibility. Returns must be sent via <span className="font-semibold text-dodger_blue-400">tracked mail</span>.</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-red-400">🍫</span>
                    <span>We do not take responsibility for <span className="font-bold text-red-400">incorrect shipping details</span> you provide. If your order is returned to us because of this, you'll need to cover the cost of re-delivery.</span>
                  </div>
                </div>

                {/* NO REFUNDS section */}
                <div className="bg-red-900/30 border-l-4 border-red-400 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span>❌</span>
                    <span><span className="font-bold text-red-400">NO REFUNDS</span> for melted chocolate during summer months.</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span>❌</span>
                    <span><span className="font-bold text-red-400">NO REFUNDS</span> will be given for items that go missing in the post – claim directly with Royal Mail or Parcelforce.</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span>❌</span>
                    <span>We cannot accept returns on the <span className="font-bold text-red-400">Build Your Own Mix Bag</span>, as it is custom-made.</span>
                  </div>
                </div>

                {/* Refund options */}
                <p>
                  If your order qualifies for a <span className="font-bold text-yellow_green-400">refund</span> (excluding the Build Your Own Mix Bag), you can either:
                </p>
                
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-2">
                    <span className="text-phlox-400">🎁</span>
                    <span>Choose to have your items <span className="font-semibold text-phlox-400">re-sent</span> (you'll need to cover postage), or</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-yellow_green-400">💰</span>
                    <span>Receive a <span className="font-semibold text-yellow_green-400">refund</span> for the items.</span>
                  </div>
                </div>

                {/* Hours and closing */}
                <div className="text-center mt-6 pt-4 border-t border-gray-600">
                  <p className="text-gray-300">
                    We operate <span className="font-semibold text-dodger_blue-400">Monday to Friday, 9:00 – 16:30</span>.
                  </p>
                  <p className="mt-2 text-lg font-bold text-phlox-400">
                    Stay Sweet! 🍬
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-xs">
            © 2025 Sweet Bros. All rights reserved. 🍭
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer