import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'
import COLORS from 'tailwindcss/colors'

const STEP_ICONS = [
  'tabler:checkbox',
  'tabler:trending-up',
  'tabler:percentage',
  'tabler:chart-bar',
  'tabler:chart-pie',
  'tabler:activity',
  'tabler:coin',
  'tabler:star'
]

function StepByStep() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')
  const { derivedThemeColor } = usePersonalization()

  return (
    <Widget
      icon="tabler:list-numbers"
      iconColor={COLORS.blue[500]}
      title={t('guide.howto.stepByStep')}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
          <Widget
            key={step}
            className="component-bg-lighter"
            icon={STEP_ICONS[step - 1]}
            iconColor={derivedThemeColor}
            title={`${step.toString().padStart(2, '0')}. ${t(`guide.howto.steps.${step}.title`)}`}
            variant="large-icon"
          >
            <p className="text-bg-500">{t(`guide.howto.steps.${step}.desc`)}</p>
          </Widget>
        ))}
      </div>
    </Widget>
  )
}

export default StepByStep
