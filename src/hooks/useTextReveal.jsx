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
 * @param {number} options.delay - Delay before animation starts in seconds (default: 0)
 * @param {boolean} options.isMutableRef - Whether elementRefs is a mutable ref array (default: false)
 * @param {number} options.expectedCount - For mutable refs, specify expected count
 * @returns {Object} Object containing containerRef
 */
function useTextReveal(elementRefs = [], options = {}) {
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)
  const {
    duration = 0.6,
    overlap = 0.4,
    ease = 'power2.out',
    yOffset = -20,
    delay = 0,
    isMutableRef = false,
    expectedCount = null,
  } = options

  useEffect(() => {
    // Only animate once
    if (hasAnimated.current) return

    if (!containerRef.current) return

    // Get valid refs
    let validRefs = []
    if (isMutableRef && elementRefs.current) {
      validRefs = elementRefs.current.filter((ref) => ref && ref.nodeType === 1)
      if (expectedCount !== null && validRefs.length !== expectedCount) {
        return
      }
    } else {
      validRefs = elementRefs
        .map((ref) => (ref && ref.current ? ref.current : null))
        .filter((ref) => ref && ref.nodeType === 1)
    }

    if (validRefs.length === 0) return

    // Mark as animated immediately
    hasAnimated.current = true

    // Set initial state
    validRefs.forEach((element) => {
      gsap.set(element, {
        opacity: 0,
        y: yOffset,
      })
    })

    // Create timeline
    const tl = gsap.timeline({ delay })

    validRefs.forEach((element, index) => {
      if (index === 0) {
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration,
          ease,
        })
      } else {
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
  })

  return { containerRef }
}

export default useTextReveal
