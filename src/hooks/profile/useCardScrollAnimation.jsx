import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  calculatePeekAmount,
  calculateCardPositions,
  calculateSectionHeight,
  calculateCardTimeline,
} from '../../utils'

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook that handles GSAP scroll-based card animations.
 *
 * This hook creates a seamless scroll animation where cards transition through states:
 * - Preview (bottom peek): Card is visible at bottom with top 35% peeking
 * - Entering: Card moves from bottom peek to center, growing and becoming fully visible
 * - Centered: Card is at center, full scale and opacity
 * - Exiting: Card moves from center to top peek, shrinking
 * - Faded: Card fades out completely after reaching top peek
 *
 * The animation is continuous and simultaneous - when one card exits, the next enters
 * at the same time, creating a seamless scroll experience.
 *
 * @param {React.RefObject} scrollContainerRef - Ref to the scroll container element
 * @param {React.RefObject} cardsContainerRef - Ref to the fixed container holding all cards
 * @param {React.MutableRefObject<Array>} cardRefs - Ref array containing refs to individual card elements
 * @param {Object} options - Configuration options
 * @param {number} options.cardHeight - Height of each card in pixels (default: 300)
 * @param {number} options.peekPercentage - Percentage of card height to peek (0-1, default: 0.35)
 * @param {number} options.fadeOutDuration - Duration of fade-out as percentage of section (0-1, default: 0.2)
 * @param {number} options.cardsCount - Number of cards (used as dependency to re-run hook when cards change)
 */
function useCardScrollAnimation(
  scrollContainerRef,
  cardsContainerRef,
  cardRefs,
  options = {}
) {
  const {
    cardHeight = 300,
    peekPercentage = 0.35,
    fadeOutDuration = 0.2,
    cardsCount,
  } = options

  // Store ScrollTrigger instance for cleanup
  const scrollTriggerRef = useRef(null)

  useGSAP(
    () => {
      // Get all valid card elements from refs array
      const cards = cardRefs.current.filter(Boolean)

      // Early return if required elements are missing
      if (
        !cards.length ||
        !scrollContainerRef.current ||
        !cardsContainerRef.current
      ) {
        return
      }

      // ============================================
      // SETUP: Calculate dimensions and positions
      // ============================================

      const viewportHeight = window.innerHeight
      const peekAmount = calculatePeekAmount(cardHeight, peekPercentage)
      const sectionHeight = calculateSectionHeight(viewportHeight)
      const totalScrollHeight = sectionHeight * cards.length

      // Calculate card positions for different states
      const { centerY, topY, bottomY } = calculateCardPositions(
        viewportHeight,
        cardHeight,
        peekAmount
      )

      // ============================================
      // CONTAINER SETUP
      // ============================================

      // Set scroll container height to provide enough scroll space
      // Each card gets exactly one viewport height of scroll space
      scrollContainerRef.current.style.height = `${totalScrollHeight}px`

      // Position cards container fixed in center of viewport
      // This keeps cards centered while the scroll container provides the scroll space
      gsap.set(cardsContainerRef.current, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        zIndex: 10,
      })

      // ============================================
      // INITIAL CARD STATES
      // ============================================

      cards.forEach((card, index) => {
        if (!card) return

        // Center each card using transform origin
        // This ensures cards are positioned relative to their center point
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
        })

        if (index === 0) {
          // First card: Centered on screen, full scale, fully visible
          // This is the initial state when the page loads
          gsap.set(card, {
            y: centerY,
            scale: 1,
            opacity: 1,
          })
        } else if (index === 1) {
          // Second card: At bottom peek position, shrunk, already visible
          // Card 1 is always visible (no fade-in) to provide immediate preview
          gsap.set(card, {
            y: bottomY,
            scale: 0.5,
            opacity: 1,
          })
        } else {
          // Other cards: Positioned below viewport, invisible
          // These cards will fade in when they reach preview position
          gsap.set(card, {
            y: bottomY + 200,
            scale: 0.5,
            opacity: 0,
          })
        }
      })

      // ============================================
      // SCROLL ANIMATION LOGIC
      // ============================================

      /**
       * Calculates fade-in opacity progress for cards appearing in preview.
       * Card 1 is always visible (opacity 1), while cards 2+ fade in smoothly.
       *
       * @param {number} index - Card index
       * @param {number} currentScroll - Current scroll position
       * @param {number} previewStart - Scroll position where preview starts
       * @param {number} sectionHeight - Height of one scroll section
       * @returns {number} Opacity value between 0 and 1
       */
      const calculateFadeInProgress = (
        index,
        currentScroll,
        previewStart,
        sectionHeight
      ) => {
        // Card 1 is always visible, no fade-in needed
        if (index === 1) {
          return 1
        }

        // Cards 2+ fade in over 20% of section height
        const fadeInDuration = sectionHeight * 0.2
        if (currentScroll < previewStart + fadeInDuration) {
          let progress = (currentScroll - previewStart) / fadeInDuration
          progress = Math.max(0, Math.min(1, progress))
          // Apply quadratic easing for smoother fade
          return progress * progress
        }

        return 1
      }

      /**
       * Handles animation for Card 0 (first card).
       * Card 0 has special behavior: it starts centered and exits immediately when scrolling begins.
       *
       * @param {HTMLElement} card - Card element
       * @param {number} currentScroll - Current scroll position
       * @param {number} sectionHeight - Height of one scroll section
       * @param {number} centerY - Y position when centered
       * @param {number} topY - Y position when at top peek
       */
      const handleCard0Animation = (
        card,
        currentScroll,
        sectionHeight,
        centerY,
        topY
      ) => {
        // Card 1 enters from scroll 0 to sectionHeight
        // Card 0 exits simultaneously during this same period
        const card1EnterEnd = sectionHeight
        const fadeOutStart = card1EnterEnd
        const fadeOutEnd = fadeOutStart + sectionHeight * fadeOutDuration

        if (currentScroll <= 0) {
          // Initial state: Card is centered, full scale, fully visible
          gsap.set(card, {
            y: centerY,
            scale: 1,
            opacity: 1,
          })
        } else if (currentScroll > 0 && currentScroll < card1EnterEnd) {
          // Exiting to top peek: Card moves up and shrinks simultaneously with Card 1 entering
          const progress = currentScroll / card1EnterEnd // 0 to 1
          gsap.set(card, {
            y: gsap.utils.interpolate(centerY, topY, progress),
            scale: gsap.utils.interpolate(1, 0.5, progress),
            opacity: 1,
          })
        } else if (
          currentScroll >= fadeOutStart &&
          currentScroll < fadeOutEnd
        ) {
          // Fade out: Card is at top peek, gradually fading out
          const fadeProgress =
            (currentScroll - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          // Quadratic ease out for smoother fade
          const easedProgress = fadeProgress * fadeProgress
          gsap.set(card, {
            y: topY,
            scale: 0.5,
            opacity: 1 * (1 - easedProgress), // Fade from 1 to 0
          })
        } else {
          // Completely faded out
          gsap.set(card, {
            y: topY,
            scale: 0.5,
            opacity: 0,
          })
        }
      }

      /**
       * Handles animation for cards 1 and above.
       * These cards follow a pattern: preview -> entering -> centered -> exiting -> faded.
       *
       * @param {HTMLElement} card - Card element
       * @param {number} index - Card index
       * @param {number} currentScroll - Current scroll position
       * @param {number} sectionHeight - Height of one scroll section
       * @param {number} centerY - Y position when centered
       * @param {number} topY - Y position when at top peek
       * @param {number} bottomY - Y position when at bottom peek
       */
      const handleCardAnimation = (
        card,
        index,
        currentScroll,
        sectionHeight,
        centerY,
        topY,
        bottomY
      ) => {
        // Calculate timeline points for this card
        const timeline = calculateCardTimeline(
          index,
          sectionHeight,
          cards.length,
          fadeOutDuration
        )

        const {
          centerPoint,
          enterStart,
          enterEnd,
          exitEnd,
          fadeOutStart,
          fadeOutEnd,
          previewStart,
        } = timeline

        const prevCardCenterPoint = (index - 1) * sectionHeight

        // ============================================
        // STATE 1: Preview (bottom peek)
        // ============================================
        // Card is visible at bottom with top 35% peeking out
        // This happens before the card starts entering center
        if (
          (index === 1 && currentScroll >= 0 && currentScroll < enterStart) ||
          (index > 1 &&
            currentScroll >= prevCardCenterPoint - sectionHeight * 0.5 &&
            currentScroll < enterStart)
        ) {
          const fadeInProgress = calculateFadeInProgress(
            index,
            currentScroll,
            previewStart,
            sectionHeight
          )

          gsap.set(card, {
            y: bottomY,
            scale: 0.5,
            opacity: fadeInProgress,
          })
        }
        // ============================================
        // STATE 2: Entering center
        // ============================================
        // Card moves from bottom peek to center, growing and becoming fully visible
        // This happens simultaneously with the previous card exiting
        else if (currentScroll >= enterStart && currentScroll < enterEnd) {
          const progress =
            (currentScroll - enterStart) / (enterEnd - enterStart) // 0 to 1

          gsap.set(card, {
            y: gsap.utils.interpolate(bottomY, centerY, progress),
            scale: gsap.utils.interpolate(0.5, 1, progress),
            opacity: 1,
          })
        }
        // ============================================
        // STATE 3: Exiting to top peek
        // ============================================
        // Card moves from center to top peek, shrinking
        // This happens simultaneously with the next card entering
        // There's no "hold" period - card exits immediately after reaching center
        else if (currentScroll >= enterEnd && currentScroll < exitEnd) {
          const exitProgress = (currentScroll - enterEnd) / (exitEnd - enterEnd)

          gsap.set(card, {
            y: gsap.utils.interpolate(centerY, topY, exitProgress),
            scale: gsap.utils.interpolate(1, 0.5, exitProgress),
            opacity: 1,
          })
        }
        // ============================================
        // STATE 4: Fading out
        // ============================================
        // Card is at top peek position, gradually fading out
        else if (currentScroll >= fadeOutStart && currentScroll < fadeOutEnd) {
          const fadeProgress =
            (currentScroll - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          // Quadratic ease out for smoother fade
          const easedProgress = fadeProgress * fadeProgress

          gsap.set(card, {
            y: topY,
            scale: 0.5,
            opacity: 1 * (1 - easedProgress), // Fade from 1 to 0
          })
        }
        // ============================================
        // STATE 5: Completely hidden
        // ============================================
        // Card is too far away from viewport, completely invisible
        else {
          gsap.set(card, {
            y: currentScroll < enterStart ? topY - 200 : bottomY + 200,
            scale: 0.5,
            opacity: 0,
          })
        }
      }

      /**
       * Updates all card animations based on current scroll position.
       * This is called on every scroll update by ScrollTrigger.
       *
       * @param {ScrollTrigger} self - ScrollTrigger instance
       */
      const updateCardAnimations = (self) => {
        const scrollProgress = self.progress
        const currentScroll = scrollProgress * totalScrollHeight

        cards.forEach((card, index) => {
          if (!card) return

          if (index === 0) {
            // Card 0 has special handling
            handleCard0Animation(
              card,
              currentScroll,
              sectionHeight,
              centerY,
              topY
            )
          } else {
            // Cards 1+ follow the standard pattern
            handleCardAnimation(
              card,
              index,
              currentScroll,
              sectionHeight,
              centerY,
              topY,
              bottomY
            )
          }
        })
      }

      // ============================================
      // CREATE SCROLLTRIGGER
      // ============================================

      // Create ScrollTrigger instance for smooth scroll-based animation
      // scrub: 1 creates a smooth, continuous animation tied directly to scroll position
      const scrollTrigger = ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: `+=${totalScrollHeight}`,
        scrub: 1,
        onUpdate: updateCardAnimations,
      })

      // Store instance for cleanup
      scrollTriggerRef.current = scrollTrigger

      // ============================================
      // CLEANUP
      // ============================================

      // Return cleanup function
      // useGSAP automatically handles most cleanup, but we need to explicitly
      // kill ScrollTrigger instances to prevent memory leaks
      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill()
          scrollTriggerRef.current = null
        }
      }
    },
    {
      scope: scrollContainerRef,
      dependencies: [cardHeight, peekPercentage, fadeOutDuration, cardsCount],
    }
  )
}

export default useCardScrollAnimation
