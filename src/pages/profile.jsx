import { Flex, Grid, theme } from 'antd'
import { useParams } from 'react-router-dom'
import { useRef, useMemo } from 'react'
import {
  useProfileData,
  useHistoricalEvent,
  useCardScrollAnimation,
} from '../hooks'
import {
  CreationTime,
  FollowingFact,
  GeneralInformation,
  RandomQuote,
  TotalStars,
  UserInformation,
  DadJoke,
  OnThisDay,
  TopRepository,
  TopLanguages,
} from '../components'

const { useBreakpoint } = Grid
const { useToken } = theme

function Profile() {
  const { token } = useToken()
  const { username } = useParams()
  const { user, repositories, quote, joke, topRepository, topLanguages } =
    useProfileData(username)
  const { event } = useHistoricalEvent(user?.createdAt)
  const screens = useBreakpoint()
  const isXSDevice = !screens.sm

  // Refs for GSAP scroll animation
  const scrollContainerRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const cardRefs = useRef([])

  // Build cards array conditionally - only include cards when their data is available
  // This allows cards to appear progressively as data loads
  const cards = useMemo(() => {
    const cardList = []

    // Critical cards - render if user exists
    if (user) {
      cardList.push({ component: UserInformation, props: { user } })
      cardList.push({ component: GeneralInformation, props: { user } })
      cardList.push({ component: CreationTime, props: { user } })
      cardList.push({ component: FollowingFact, props: { user } })
    }

    // Lazy cards - render only when their data is available
    if (quote) {
      cardList.push({ component: RandomQuote, props: { quote } })
    }

    if (repositories) {
      cardList.push({ component: TotalStars, props: { repositories } })
    }

    if (joke) {
      cardList.push({ component: DadJoke, props: { joke } })
    }

    if (event) {
      cardList.push({ component: OnThisDay, props: { event } })
    }

    if (topRepository) {
      cardList.push({
        component: TopRepository,
        props: { repository: topRepository },
      })
    }

    if (topLanguages) {
      cardList.push({
        component: TopLanguages,
        props: { languages: topLanguages },
      })
    }

    return cardList
  }, [user, quote, repositories, joke, event, topRepository, topLanguages])

  // Initialize card refs array to match number of cards
  // This ensures refs array is always the correct length
  if (cardRefs.current.length !== cards.length) {
    cardRefs.current = Array(cards.length).fill(null)
  }

  // Use GSAP scroll animation hook
  // Hook will re-run when cards array changes (as cards are added progressively)
  // Passing cards length to ensure hook re-runs when cards change
  useCardScrollAnimation(scrollContainerRef, cardsContainerRef, cardRefs, {
    cardHeight: 400,
    cardsCount: cards.length,
  })

  // Show loading only while critical data (user) is being fetched
  // Once user data is available, we can start rendering cards
  // Other cards will appear as their data loads
  if (!user) {
    return <>Loading...</>
  }

  return (
    <Flex
      align="center"
      vertical
      style={{
        backgroundColor: token.colorPrimary,
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Scroll container provides the scroll space for animation */}
      <div
        ref={scrollContainerRef}
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Fixed container holds all cards in center of viewport */}
        <div
          ref={cardsContainerRef}
          style={{
            width: isXSDevice ? 'min(75vw, 650px)' : 'min(60vw, 650px)',
            position: 'relative',
          }}
        >
          {/* Each card is wrapped in an absolute positioned div for animation */}
          {cards.map(({ component: CardComponent, props }, index) => {
            // Create a stable ref callback for each card
            const setRef = (el) => {
              if (el) {
                cardRefs.current[index] = el
              } else {
                // Clean up ref when element is removed
                cardRefs.current[index] = null
              }
            }

            return (
              <div
                key={`card-${index}`}
                ref={setRef}
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  willChange: 'transform, opacity',
                  transformOrigin: 'center center',
                }}
              >
                <CardComponent {...props} />
              </div>
            )
          })}
        </div>
      </div>
    </Flex>
  )
}

export default Profile
