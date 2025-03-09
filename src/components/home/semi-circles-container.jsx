import { SemiCircle } from '../../components'

function SemiCirclesContainer() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '45vh',
        height: '100vh',
        opacity: '0.5',
      }}
    >
      <SemiCircle
        width={'120vw'}
        height={'120vw'}
        backgroundColor={'#232323'}
        zIndex={7}
      >
        <SemiCircle
          width={'110vw'}
          height={'110vw'}
          backgroundColor={'#3A3A3A'}
          zIndex={6}
        >
          <SemiCircle
            width={'100vw'}
            height={'100vw'}
            backgroundColor={'#545454'}
            zIndex={5}
          >
            <SemiCircle
              width={'90vw'}
              height={'90vw'}
              backgroundColor={'#747474'}
              zIndex={4}
            >
              <SemiCircle
                width={'80vw'}
                height={'80vw'}
                backgroundColor={'#979797'}
                zIndex={3}
              >
                <SemiCircle
                  width={'70vw'}
                  height={'70vw'}
                  backgroundColor={'#C5C5C5'}
                  zIndex={2}
                >
                  <SemiCircle
                    width={'60vw'}
                    height={'60vw'}
                    backgroundColor={'#FBFBFB'}
                    zIndex={1}
                  />
                </SemiCircle>
              </SemiCircle>
            </SemiCircle>
          </SemiCircle>
        </SemiCircle>
      </SemiCircle>
    </div>
  )
}

export default SemiCirclesContainer
