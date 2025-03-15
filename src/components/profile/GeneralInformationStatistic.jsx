import { Statistic, theme } from 'antd'

const { useToken } = theme

function GeneralInformationStatistic({ title, value }) {
  const { token } = useToken()
  return (
    <Statistic
      title={title}
      value={value}
      valueStyle={{ color: token.colorAccent }}
      titleStyle={{ color: token.colorText }}
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        backgroundColor: token.colorSecondary,
        paddingInline: 24,
        paddingBlock: 16,
        borderRadius: 12,
      }}
    />
  )
}

export default GeneralInformationStatistic
