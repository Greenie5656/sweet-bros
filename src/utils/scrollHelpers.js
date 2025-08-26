
export const scrollToTop = (options = {}) => {
  const {
    behavior = 'smooth',
    delay = 0,
    maxRetries = 3,
    retryDelay = 100
  } = options

  const attemptScroll = (retryCount = 0) => {
    try {
      // Multiple scroll attempts for better mobile compatibility
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: behavior 
      })
      
      // Also try the older method as fallback
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // For iOS Safari - force layout recalculation
      if (window.webkit?.messageHandlers) {
        document.body.style.transform = 'translateZ(0)'
        setTimeout(() => {
          document.body.style.transform = ''
        }, 0)
      }
      
      // Verify scroll position after a delay
      setTimeout(() => {
        if (window.pageYOffset > 50 && retryCount < maxRetries) {
          console.log(`Scroll retry ${retryCount + 1}/${maxRetries}`)
          attemptScroll(retryCount + 1)
        }
      }, retryDelay)
      
    } catch (error) {
      console.warn('Scroll to top failed:', error)
      // Fallback: instant scroll
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.error('All scroll methods failed:', e)
      }
    }
  }

  if (delay > 0) {
    setTimeout(() => attemptScroll(), delay)
  } else {
    attemptScroll()
  }
}

/**
 * Custom hook for handling page navigation with scroll
 */
export const useScrollToTop = () => {
  const scrollWithDelay = (delay = 150) => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToTop({ 
          behavior: 'smooth',
          maxRetries: 5,
          retryDelay: 150
        })
      }, delay)
    })
  }

  return { scrollWithDelay }
}