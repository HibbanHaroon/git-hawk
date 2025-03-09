function SemiCircle({ width, height, backgroundColor, zIndex, children }) {
  return (
    <div
      style={{
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderRadius: '100%',
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  )
}

export default SemiCircle
