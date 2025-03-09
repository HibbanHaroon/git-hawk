import { SemiCircle } from '../../components'

function SemiCirclesContainer() {
  const semiCircles = [
    { width: '120vw', height: '120vw', backgroundColor: '#232323', zIndex: 1 },
    { width: '110vw', height: '110vw', backgroundColor: '#3A3A3A', zIndex: 2 },
    { width: '100vw', height: '100vw', backgroundColor: '#545454', zIndex: 3 },
    { width: '90vw', height: '90vw', backgroundColor: '#747474', zIndex: 4 },
    { width: '80vw', height: '80vw', backgroundColor: '#979797', zIndex: 5 },
    { width: '70vw', height: '70vw', backgroundColor: '#C5C5C5', zIndex: 6 },
    { width: '60vw', height: '60vw', backgroundColor: '#FBFBFB', zIndex: 7 },
  ]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '45vh',
        height: '100vh',
        opacity: '0.5',
        // filter: 'blur(30px)',
      }}
    >
      {semiCircles.map((circle, index) => (
        <SemiCircle key={index} {...circle} />
      ))}
    </div>
  )
}

export default SemiCirclesContainer
