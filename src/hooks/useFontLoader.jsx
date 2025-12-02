import { useState, useEffect } from 'react'

/**
 * Custom hook to detect when web fonts are loaded.
 * Waits for all fonts to load, ensures minimum display time,
 * and manages smooth transitions.
 *
 * @returns {Object} - { fontsReady: boolean, isTransitioning: boolean }
 */
function useFontLoader() {
  const [fontsReady, setFontsReady] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    let mounted = true
    const minLoadTime = 800 // Minimum time to show loader (800ms)
    const transitionDelay = 600 // Time for smooth fade-out transition (600ms)
    const startTime = Date.now()

    const checkFonts = async () => {
      try {
        // Wait for the browser to finish loading all fonts
        await document.fonts.ready

        // Double-check that fonts are actually loaded
        // This ensures the status is 'loaded' and not just 'loading'
        const allFontsLoaded =
          document.fonts.status === 'loaded' || document.fonts.size > 0

        if (allFontsLoaded) {
          // Calculate remaining time to meet minimum load time
          const elapsed = Date.now() - startTime
          const remainingTime = Math.max(0, minLoadTime - elapsed)

          // Wait for remaining time, then start transition
          setTimeout(() => {
            if (mounted) {
              setIsTransitioning(true)

              // After transition animation completes, set fonts as ready
              setTimeout(() => {
                if (mounted) {
                  setFontsReady(true)
                }
              }, transitionDelay)
            }
          }, remainingTime)
        } else {
          // Fallback: if fonts still aren't loaded, proceed anyway
          setTimeout(() => {
            if (mounted) {
              setIsTransitioning(true)
              setTimeout(() => {
                if (mounted) {
                  setFontsReady(true)
                }
              }, transitionDelay)
            }
          }, minLoadTime)
        }
      } catch (error) {
        console.error('Error loading fonts:', error)
        // Set to ready even on error to prevent infinite loading
        setTimeout(() => {
          if (mounted) {
            setIsTransitioning(true)
            setTimeout(() => {
              if (mounted) {
                setFontsReady(true)
              }
            }, transitionDelay)
          }
        }, minLoadTime)
      }
    }

    checkFonts()

    return () => {
      mounted = false
    }
  }, [])

  return { fontsReady, isTransitioning }
}

export default useFontLoader
