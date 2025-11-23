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

  // Check if all data is loaded
  const isDataLoaded =
    user &&
    repositories &&
    quote &&
    joke &&
    (user ? event != null : true) && // Use != null to check for both null and undefined
    (repositories ? topRepository != null : true) &&
    (repositories ? topLanguages != null : true)

  // Array of all card components in order
  // Only create this when data is loaded to avoid undefined props
  const cards = useMemo(
    () =>
      isDataLoaded
        ? [
            { component: UserInformation, props: { user } },
            { component: GeneralInformation, props: { user } },
            { component: RandomQuote, props: { quote } },
            { component: CreationTime, props: { user } },
            { component: FollowingFact, props: { user } },
            { component: TotalStars, props: { repositories } },
            { component: DadJoke, props: { joke } },
            ...(event ? [{ component: OnThisDay, props: { event } }] : []),
            {
              component: TopRepository,
              props: { repository: topRepository },
            },
            { component: TopLanguages, props: { languages: topLanguages } },
          ]
        : [],
    [
      isDataLoaded,
      user,
      quote,
      repositories,
      joke,
      event,
      topRepository,
      topLanguages,
    ]
  )

  // Initialize card refs array to match number of cards
  // This ensures refs array is always the correct length
  if (cardRefs.current.length !== cards.length) {
    cardRefs.current = Array(cards.length).fill(null)
  }

  // Use GSAP scroll animation hook
  // Only call hook when data is loaded and cards array is ready
  // Passing cards length to ensure hook re-runs when cards change
  useCardScrollAnimation(scrollContainerRef, cardsContainerRef, cardRefs, {
    cardHeight: 400,
    cardsCount: cards.length,
  })

  if (!isDataLoaded) {
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
