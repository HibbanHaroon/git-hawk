import { Statistic } from 'antd'

function GeneralInformationStatistic({ title, value }) {
  // Appending 0 infront of the value for single digits
  let transformedValue = value
  if (value >= 0 && value < 10) {
    transformedValue = '0' + value
  }

  return (
    <Statistic
      className="general-statistic"
      title={title}
      value={transformedValue}
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    />
  )
}

export default GeneralInformationStatistic
