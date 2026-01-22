import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'
import COLORS from 'tailwindcss/colors'

const QUALITATIVE_IDS = [
  'valueChain',
  'dividendPolicy',
  'management',
  'moat'
] as const

const QUALITATIVE_ICONS = {
  valueChain: 'tabler:link',
  dividendPolicy: 'tabler:coin',
  management: 'tabler:user-check',
  moat: 'tabler:shield'
}

function SleepStrategy() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')
  const { derivedThemeColor } = usePersonalization()

  return (
    <Widget
      icon="tabler:moon"
      iconColor={COLORS.purple[500]}
      title={t('guide.sleepStrategy.title')}
    >
      <p className="text-bg-500">{t('guide.sleepStrategy.intro')}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {QUALITATIVE_IDS.map(id => (
          <Widget
            key={id}
            className="component-bg-lighter"
            description={
              <p className="text-base">{t(`guide.qualitative.${id}.desc`)}</p>
            }
            icon={QUALITATIVE_ICONS[id]}
            iconColor={derivedThemeColor}
            title={t(`guide.qualitative.${id}.title`)}
          />
        ))}
      </div>
    </Widget>
  )
}

export default SleepStrategy
