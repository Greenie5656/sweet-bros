import React from 'react'
import { Heart } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers'

const AboutPage = () => {
  // Get consistent colors for different text elements using our color helpers
  const storyColors = {
    sweetBros: getItemColour('about-sweet-bros'),
    logan: getItemColour('about-logan'),
    barkley: getItemColour('about-barkley'),
    team: getItemColour('about-team'),
    mission: getItemColour('about-mission'),
    world: getItemColour('about-world'),
    smile: getItemColour('about-smile')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Image Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* About Page Photo with Rainbow Background - Same as Homepage */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Single clean vertical rainbow gradient matching the bag pattern */}
              <div className="absolute inset-0 rounded-3xl shadow-2xl" style={{
                background: `linear-gradient(to bottom,
                  #ff000c 0%,
                  #ff000c 14.2%,
                  #ff6b35 14.2%,
                  #ff6b35 28.4%,
                  #ffd23f 28.4%,
                  #ffd23f 42.6%,
                  #9fd600 42.6%,
                  #9fd600 56.8%,
                  #0495ff 56.8%,
                  #0495ff 71%,
                  #dd18fe 71%,
                  #dd18fe 85.2%,
                  #8b5cf6 85.2%,
                  #8b5cf6 100%
                )`,
                backgroundRepeat: 'no-repeat'
              }}></div>
              
              {/* Photo container with transparent background support */}
              <div className="relative rounded-3xl p-6 transform hover:scale-105 transition-all duration-500">
                <img 
                  src="/about_page_image.png" 
                  alt="Sweet Bros - Logan and Barkley, the founders" 
                  className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain rounded-2xl shadow-2xl"
                  style={{
                    maxWidth: '577px', // Preserve original width (577 × 433)
                    height: 'auto',
                    filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'
                  }}
                />
                
                {/* Fun floating elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full animate-bounce shadow-lg border-2 border-white"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-phlox-400 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                <div className="absolute top-1/4 -left-4 w-4 h-4 bg-yellow_green-400 rounded-full opacity-80 animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
                <div className="absolute top-3/4 -right-4 w-5 h-5 bg-dodger_blue-400 rounded-full opacity-70 animate-bounce shadow-lg" style={{animationDelay: '0.7s'}}></div>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="text-center mb-1">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
              🍬 Our Story 🍬
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-phlox-500 to-red-500 rounded-full mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-1">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 space-y-8 relative overflow-hidden">
            
            {/* Decorative background elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-phlox-400 to-phlox-600 rounded-full opacity-5"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-5"></div>
            
            <div className="relative z-10 space-y-6 text-lg leading-relaxed">
              {/* Opening paragraph */}
              <p className="text-gray-700">
                <span className="font-bold text-phlox-600">Sweet Bros</span> was founded by two brothers <span className="font-bold text-dodger_blue-600">Logan (13)</span> 😃 and <span className="font-bold text-red-600">Barkley (9)</span> 🤪 – with one simple goal... to create the perfect blend of high-quality <span className="font-semibold text-phlox-600">pick 'n' mix</span> 🍭 that makes people's day just that little bit <span className="font-semibold text-red-600">sweeter</span> 😋.
              </p>

              {/* Quality paragraph */}
              <p className="text-gray-700">
                We wanted our <span className="font-semibold text-dodger_blue-600">fizzy sweets</span> 🫧 to really <span className="font-bold text-phlox-600">fizz</span> ⚡ and our <span className="font-semibold text-red-600">jelly sweets</span> 🍡 to be soft, chewy, and full of <span className="font-bold text-red-600">flavour</span> 🤤 – nothing less would do.
              </p>

              {/* Personality section */}
              <p className="text-gray-700 mb-4">
                Even though we're just two normal <span className="font-semibold text-gray-800">brothers</span> 👬, our personalities couldn't be more different:
              </p>
              
              {/* Character cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {/* Logan's card */}
                <div className={`bg-white border-4 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`} 
                     style={{borderColor: getItemColour('logan-card').bg === 'bg-phlox-500' ? '#dd18fe' : getItemColour('logan-card').bg === 'bg-red-500' ? '#ff000c' : getItemColour('logan-card').bg === 'bg-dodger_blue-500' ? '#0495ff' : '#dd18fe'}}>
                  <div className="w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/Logan.png" 
                      alt="Logan avatar" 
                      className="w-full h-full object-contain rounded-full shadow-lg border-4 border-dodger_blue-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-dodger_blue-600 mb-3">Logan</h3>
                  <p className="text-gray-700 font-medium">
                    is <span className="font-bold text-dodger_blue-600">calm</span> 😌 <span className="font-bold text-dodger_blue-600">sensible</span> 🧠 and has a great head for <span className="font-bold text-dodger_blue-600">business</span> 📊.
                  </p>
                </div>

                {/* Barkley's card */}
                <div className={`bg-white border-4 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg`}
                     style={{borderColor: getItemColour('barkley-card').bg === 'bg-phlox-500' ? '#dd18fe' : getItemColour('barkley-card').bg === 'bg-red-500' ? '#ff000c' : getItemColour('barkley-card').bg === 'bg-dodger_blue-500' ? '#0495ff' : '#ff000c'}}>
                  <div className="w-20 h-20 mx-auto mb-4">
                    <img 
                      src="/Barkley.png" 
                      alt="Barkley avatar" 
                      className="w-full h-full object-contain rounded-full shadow-lg border-4 border-red-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-red-600 mb-3">Barkley</h3>
                  <p className="text-gray-700 font-medium">
                    is <span className="font-bold text-red-600">funny</span> 😂 <span className="font-bold text-red-600">wild</span> 🤪 and always full of <span className="font-bold text-red-600">energy</span> ⚡.
                  </p>
                </div>
              </div>

              {/* Team paragraph */}
              <p className={`text-center text-xl font-bold text-gray-800 bg-gradient-to-r from-phlox-50 to-red-50 border-4 rounded-2xl py-4 px-6`}
                 style={{borderColor: getItemColour('team-section').bg === 'bg-phlox-500' ? '#dd18fe' : getItemColour('team-section').bg === 'bg-red-500' ? '#ff000c' : getItemColour('team-section').bg === 'bg-dodger_blue-500' ? '#0495ff' : '#dd18fe'}}>
                Together, we make the <span className="text-phlox-600">perfect team</span>! 🤝
              </p>

              {/* Growth paragraph */}
              <p className="text-gray-700">
                What started as a fun idea during the <span className="font-semibold text-phlox-600">summer holidays</span> ☀ of 2025 has grown into something much <span className="font-bold text-red-600">bigger</span> 🚀 than we ever imagined. We've already had the chance to work with amazing names like <span className="font-bold text-dodger_blue-600">Blackburn Rovers</span> ⚽, <span className="font-bold text-red-600">Spud Bros</span> 🥔, and other local businesses 🏪 – and the journey is only just <span className="font-bold text-phlox-600">beginning</span> 🌟.
              </p>

              {/* Mission statement */}
              <div className={`bg-gradient-to-r from-phlox-50 via-red-50 to-dodger_blue-50 border-4 rounded-3xl p-8 text-center my-8 relative overflow-hidden`}
                   style={{borderColor: getItemColour('mission-section').bg === 'bg-phlox-500' ? '#dd18fe' : getItemColour('mission-section').bg === 'bg-red-500' ? '#ff000c' : getItemColour('mission-section').bg === 'bg-dodger_blue-500' ? '#0495ff' : '#dd18fe'}}>
                <div className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-phlox-400 rounded-full opacity-40 animate-bounce"></div>
                
                <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
                  Our Mission
                  <Heart className="w-6 h-6 text-phlox-500" fill="currentColor" />
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our <span className="font-bold text-phlox-600">mission</span> is simple...to deliver what we believe are the <span className="font-bold text-red-600">best sweets</span> in the UK 🇬🇧 and maybe one day… the <span className="font-bold text-dodger_blue-600">world</span> 🌍.
                </p>
              </div>

              {/* Closing paragraph */}
              <p className="text-gray-700 text-xl text-center leading-relaxed">
                Because at <span className="font-bold text-phlox-600">Sweet Bros</span>, it's not just about sweets 🍬 – it's about putting a <span className="font-bold text-red-600">smile</span> 😁 on people's faces, one bag at a time!
              </p>

              {/* Hashtag */}
              <div className="text-center mt-8">
                <span className="inline-block bg-gradient-to-r from-phlox-500 to-red-500 text-white font-bold text-2xl px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  #StaySweet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage