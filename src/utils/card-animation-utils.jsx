/**
 * Pure utility functions for calculating card animation positions and timelines.
 * These functions are framework-agnostic and can be tested in isolation.
 */

/**
 * Calculates the peek amount (distance) based on card height and percentage.
 * The peek amount determines how much of a card is visible when it's in preview state.
 *
 * @param {number} cardHeight - Height of the card in pixels
 * @param {number} peekPercentage - Percentage of card height to peek (0-1, default 0.35)
 * @returns {number} The peek distance in pixels
 */
export function calculatePeekAmount(cardHeight, peekPercentage = 0.35) {
  return cardHeight * peekPercentage
}

/**
 * Calculates the vertical positions for cards in different states.
 * All positions are relative to the viewport center (y = 0).
 *
 * The viewport center is our reference point (y = 0). From this center:
 * - Top of viewport is at: -viewportHeight / 2
 * - Bottom of viewport is at: viewportHeight / 2
 *
 * Cards use yPercent: -50 for centering, meaning the card's center point
 * is positioned at the specified y value.
 *
 * @param {number} viewportHeight - Height of the viewport in pixels
 * @param {number} cardHeight - Height of the card in pixels
 * @param {number} peekAmount - Distance in pixels for peek visibility
 * @returns {Object} Object containing centerY, topY, and bottomY positions
 * @returns {number} returns.centerY - Y position when card is centered (always 0)
 * @returns {number} returns.topY - Y position when card is at top peek (bottom 35% visible)
 * @returns {number} returns.bottomY - Y position when card is at bottom peek (top 35% visible)
 */
export function calculateCardPositions(viewportHeight, cardHeight, peekAmount) {
  const centerY = 0

  // Top peek position calculation:
  // We want the bottom 35% of the card to peek from the top of the viewport.
  // Viewport top edge is at -viewportHeight/2 from center.
  // We want card's bottom edge at: -viewportHeight/2 + peekAmount
  // Since card uses yPercent: -50, the card center is at: bottom edge - cardHeight/2
  // Therefore: card center = (-viewportHeight/2 + peekAmount) - cardHeight/2
  const topY = -viewportHeight / 2 - cardHeight / 2 + peekAmount

  // Bottom peek position calculation:
  // We want the top 35% of the card to peek from the bottom of the viewport.
  // Viewport bottom edge is at viewportHeight/2 from center.
  // We want card's top edge at: viewportHeight/2 - peekAmount
  // Since card uses yPercent: -50, the card center is at: top edge + cardHeight/2
  // Therefore: card center = (viewportHeight/2 - peekAmount) + cardHeight/2
  const bottomY = viewportHeight / 2 + cardHeight / 2 - peekAmount

  return { centerY, topY, bottomY }
}

/**
 * Calculates the section height allocated to each card for scrolling.
 * Each card gets exactly one viewport height of scroll space.
 *
 * @param {number} viewportHeight - Height of the viewport in pixels
 * @returns {number} Section height in pixels (equal to viewport height)
 */
export function calculateSectionHeight(viewportHeight) {
  return viewportHeight
}

/**
 * Calculates the scroll timeline points for a specific card.
 * These points determine when a card transitions between states (preview, entering, centered, exiting, faded).
 *
 * Timeline structure for cards (except Card 0):
 * - previewStart: When card first appears in bottom peek position
 * - enterStart: When card starts moving from bottom peek to center
 * - enterEnd / centerPoint: When card reaches center position
 * - exitStart: When card starts moving from center to top peek (same as centerPoint)
 * - exitEnd: When card reaches top peek position
 * - fadeOutStart: When card starts fading out (same as exitEnd)
 * - fadeOutEnd: When card is completely faded out
 *
 * Card 0 has special handling: it starts centered and exits immediately when scrolling begins.
 *
 * @param {number} index - Index of the card (0-based)
 * @param {number} sectionHeight - Height of scroll section per card
 * @param {number} totalCards - Total number of cards
 * @param {number} fadeOutDuration - Duration of fade-out as percentage of section (0-1, default 0.2)
 * @returns {Object} Timeline points for the card
 * @returns {number} returns.centerPoint - Scroll position where card reaches center
 * @returns {number} returns.enterStart - Scroll position where card starts entering
 * @returns {number} returns.enterEnd - Scroll position where card finishes entering (reaches center)
 * @returns {number} returns.exitStart - Scroll position where card starts exiting (same as centerPoint)
 * @returns {number} returns.exitEnd - Scroll position where card finishes exiting (reaches top peek)
 * @returns {number} returns.fadeOutStart - Scroll position where fade-out begins
 * @returns {number} returns.fadeOutEnd - Scroll position where fade-out completes
 * @returns {number} returns.previewStart - Scroll position where card first appears in preview
 */
export function calculateCardTimeline(
  index,
  sectionHeight,
  totalCards,
  fadeOutDuration = 0.2
) {
  // Each card reaches center at: index * sectionHeight
  // This creates consistent spacing between cards
  const centerPoint = index * sectionHeight

  // Card 1 starts entering immediately (at scroll 0) to match Card 0's exit
  // Cards 2+ start entering when the previous card reaches center
  const prevCardCenterPoint = (index - 1) * sectionHeight
  const enterStart = index === 1 ? 0 : prevCardCenterPoint
  const enterEnd = centerPoint

  // Card starts exiting immediately after reaching center (continuous movement)
  // Exit happens during the next card's entering phase
  const exitStart = centerPoint
  const nextCardCenterPoint = (index + 1) * sectionHeight
  const exitEnd = nextCardCenterPoint

  // Fade-out begins after card reaches top peek position
  // Fade-out duration is a percentage of section height
  const fadeOutStart = exitEnd
  const fadeOutEnd = fadeOutStart + sectionHeight * fadeOutDuration

  // Preview position appears slightly before the card starts entering
  // This gives a smooth preview before the card begins its transition
  const previewStart =
    index === 1 ? 0 : prevCardCenterPoint - sectionHeight * 0.5

  return {
    centerPoint,
    enterStart,
    enterEnd,
    exitStart,
    exitEnd,
    fadeOutStart,
    fadeOutEnd,
    previewStart,
  }
}
