import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'
import COLORS from 'tailwindcss/colors'

const TIP_KEYS = [
  'calculator',
  'compare',
  'trends',
  'zulu',
  'discount',
  'logbook'
] as const

const TIP_ICONS = {
  calculator: 'tabler:calculator',
  compare: 'tabler:chart-dots',
  trends: 'tabler:history',
  zulu: 'tabler:zoom-check',
  discount: 'tabler:discount',
  logbook: 'tabler:notebook'
}

function AnalysisTips() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')
  const { derivedThemeColor } = usePersonalization()

  return (
    <Widget
      icon="tabler:bulb"
      iconColor={COLORS.yellow[500]}
      title={t('guide.howto.tipsTitle')}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {TIP_KEYS.map(key => (
          <Widget
            key={key}
            className="component-bg-lighter"
            icon={TIP_ICONS[key]}
            iconColor={derivedThemeColor}
            title={
              <div className="text-bg-500 font-normal">
                {t(`guide.howto.tips.${key}`)}
              </div>
            }
          />
        ))}
      </div>
    </Widget>
  )
}

export default AnalysisTips
