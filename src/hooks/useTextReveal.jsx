import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * Custom hook for GSAP text reveal animation.
 * Animates elements from top to bottom with fade-in effect.
 *
 * @param {Array<React.RefObject>|React.MutableRefObject<Array>} elementRefs - Array of refs or mutable ref array
 * @param {Object} options - Animation options
 * @param {number} options.duration - Duration of each animation (default: 0.6)
 * @param {number} options.overlap - Overlap between animations (default: 0.4)
 * @param {string} options.ease - GSAP easing function (default: 'power2.out')
 * @param {number} options.yOffset - Initial Y offset (default: -20)
 * @param {boolean} options.isMutableRef - Whether elementRefs is a mutable ref array (default: false)
 * @param {number} options.expectedCount - For mutable refs, specify expected count
 * @returns {Object} Object containing containerRef
 */
function useTextReveal(elementRefs = [], options = {}) {
  const containerRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const lastLengthRef = useRef(0)
  const {
    duration = 0.6,
    overlap = 0.4,
    ease = 'power2.out',
    yOffset = -20,
    isMutableRef = false,
    expectedCount = null,
  } = options

  useEffect(() => {
    if (hasAnimatedRef.current) return

    const currentLength = isMutableRef
      ? elementRefs.current?.length || 0
      : elementRefs.length

    // Only proceed if length changed (for mutable refs) or if it's the first run
    if (isMutableRef && currentLength === lastLengthRef.current) {
      return
    }

    lastLengthRef.current = currentLength

    if (!containerRef.current) return

    // Get refs - handle both static array and mutable ref array
    let validRefs = []
    if (isMutableRef && elementRefs.current) {
      // Mutable ref array (like linkRefs.current)
      validRefs = elementRefs.current.filter((ref) => ref && ref.nodeType === 1)

      // For mutable refs, wait until all expected refs are ready
      if (expectedCount !== null && validRefs.length !== expectedCount) {
        return // Not ready yet, wait for next length change
      }
    } else {
      // Static ref array
      validRefs = elementRefs
        .map((ref) => (ref && ref.current ? ref.current : null))
        .filter((ref) => ref && ref.nodeType === 1)
    }

    if (validRefs.length === 0) return

    // Mark as animated IMMEDIATELY to prevent re-running
    hasAnimatedRef.current = true

    // Set initial state for all elements
    validRefs.forEach((element) => {
      gsap.set(element, {
        opacity: 0,
        y: yOffset,
      })
    })

    // Create timeline with incremental delays
    const tl = gsap.timeline()

    validRefs.forEach((element, index) => {
      if (index === 0) {
        // First element starts immediately
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration,
          ease,
        })
      } else {
        // Subsequent elements overlap with previous
        tl.to(
          element,
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
          },
          `-=${overlap}`
        )
      }
    })
  }, [
    isMutableRef ? elementRefs.current?.length || 0 : elementRefs.length,
    expectedCount,
  ])

  return { containerRef }
}

export default useTextReveal
