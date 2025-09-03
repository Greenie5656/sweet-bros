import React, { useState } from 'react'
import { Facebook, Instagram, Mail, ChevronDown, ChevronUp } from 'lucide-react'

function Footer() {
  const [returnsOpen, setReturnsOpen] = useState(false)

  const toggleReturns = () => setReturnsOpen(!returnsOpen)

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Footer Content - More Compact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Sweet Bros Footer Logo - Left Side */}
          <div className="flex-shrink-0">
            <img 
              src="/footer-image.png" 
              alt="Stay Sweet" 
              className="h-16 sm:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Social Links & Contact - Center/Right */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            
            {/* Compact Social Icons */}
            <div className="flex items-center gap-3">
              
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61577922897409"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 bg-phlox-500 hover:bg-phlox-600 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/realsweetbros/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 bg-yellow_green-500 hover:bg-yellow_green-600 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@realsweetbros?_t=ZN-8yXG8Zsor7W&_r=1&fbclid=IwY2xjawL9jDBleHRuA2FlbQIxMQABHjmqR0SRFlQEEoRbS9PXuGjuRI6_jj6b3Jjg7H2SvKIjq0gwC_Zo25NNJ1yF_aem_YsIS0hkrl2-ia52jvugRzw"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:info@sweet-bros.co.uk"
                className="group p-2 bg-dodger_blue-500 hover:bg-dodger_blue-600 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Compact Contact Info */}
            <div className="text-center md:text-right">
              <p className="text-white font-medium text-sm">info@sweet-bros.co.uk</p>
            </div>
          </div>
        </div>

        {/* Compact Returns Section - Collapsible */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Returns Header - More Compact */}
            <button
              onClick={toggleReturns}
              className="w-full flex items-center justify-center gap-2 mb-3 group"
            >
              <div className="text-lg">🍭</div>
              <h3 className="text-lg font-bold text-white group-hover:text-phlox-300 transition-colors">
                Returns & Care Policy
              </h3>
              <div className="text-lg">🍭</div>
              {returnsOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Returns Content - Compact version */}
            {returnsOpen && (
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 md:p-6 space-y-3 text-gray-200 leading-relaxed text-sm">
                
                <p>
                  We take <span className="font-bold text-phlox-400">pride</span> in preparing your order <span className="font-semibold text-yellow_green-400">carefully</span> and making sure it reaches you just as you'd expect.
                </p>
                
                <p>
                  If for any reason this isn't the case, we'll do <span className="font-bold text-red-400">everything</span> we can to <span className="font-semibold text-dodger_blue-400">fix it</span>. Please contact our <span className="font-bold text-phlox-400">sweet team</span> at <a href="mailto:info@sweet-bros.co.uk" className="text-dodger_blue-400 hover:text-dodger_blue-300 font-semibold underline">info@sweet-bros.co.uk</a> with your order number and details within <span className="font-bold text-red-400">14 days</span> of receipt.
                </p>

                {/* Compact bullet points */}
                <div className="space-y-1 ml-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-yellow_green-400">🍬</span>
                    <span>Returned products must be in perfect condition, unless damaged during transit.</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-dodger_blue-400">🍭</span>
                    <span>Return postage is buyer's responsibility. Use tracked mail.</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-red-400">❌</span>
                    <span>NO REFUNDS for melted chocolate, missing post items, or custom Build Your Own Mix Bags.</span>
                  </div>
                </div>

                {/* Compact hours */}
                <div className="text-center mt-4 pt-2 border-t border-gray-600">
                  <p className="text-gray-300 text-xs">
                    We operate <span className="font-semibold text-dodger_blue-400">Monday-Friday, 9:00-16:30</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COMPACT BRANDING SECTION - Original Style but Black Lancashire Box */}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Shopify Credit - Left */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Powered by</span>
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 120 120" fill="none">
                  <path d="M30 30h60v60H30V30z" fill="#95BF47"/>
                  <path d="M70 50c0-5.5-4.5-10-10-10s-10 4.5-10 10v20h20V50z" fill="#FFF"/>
                  <circle cx="60" cy="45" r="3" fill="#95BF47"/>
                  <path d="M85 25l-5 20-10-5 15-15z" fill="#5E8E3E"/>
                </svg>
                <span className="text-green-400 font-semibold text-xs">Shopify</span>
              </div>
            </div>

            {/* ENHANCED Lancashire Web Fixers Credit - Center with BLACK background */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs">Website crafted by</span>
              
              <a 
                href="https://lancashirewebfixers.co.uk" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-black hover:bg-gray-900 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-600 hover:border-red-500 overflow-visible"
              >
                {/* BIGGER Web Fixers Logo - Made White with Scale Transform */}
                <img 
                  src="/FullLogo_resized.png" 
                  alt="Lancashire Web Fixers" 
                  className="w-8 h-8 object-contain filter brightness-0 invert transform scale-150"
                />
                
                {/* Web Fixers Text with Marble Font - WHITE Lancashire, RED Web Fixers */}
                <div className="flex flex-col leading-tight">
                  <span className="text-white font-extrabold text-sm font-marble group-hover:text-gray-200 transition-colors tracking-wide">
                    LANCASHIRE
                  </span>
                  <span className="text-red-600 font-extrabold text-xs font-marble tracking-widest group-hover:text-red-500 transition-colors">
                    WEB FIXERS
                  </span>
                </div>
              </a>
            </div>

            {/* Copyright - Right */}
            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-xs">
                © 2025 Sweet Bros 🍭
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer