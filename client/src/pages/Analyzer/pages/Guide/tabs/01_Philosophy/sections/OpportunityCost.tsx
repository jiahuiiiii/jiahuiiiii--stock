import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function OpportunityCost() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <Widget
      icon="tabler:scale"
      iconColor={COLORS.orange[500]}
      title={t('guide.opportunityCost.title')}
    >
      <p className="text-bg-500">{t('guide.opportunityCost.desc')}</p>
    </Widget>
  )
}

export default OpportunityCost
