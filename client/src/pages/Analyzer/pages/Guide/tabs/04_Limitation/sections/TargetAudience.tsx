import { Icon } from '@iconify/react'
import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function TargetAudience() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const suitableItems = t(
    'guide.limitations.targetAudience.suitableFor.items',
    {
      returnObjects: true
    }
  ) as string[]
  const notSuitableItems = t(
    'guide.limitations.targetAudience.notSuitableFor.items',
    { returnObjects: true }
  ) as string[]

  return (
    <Widget
      icon="tabler:users"
      iconColor={COLORS.blue[500]}
      title={t('guide.limitations.targetAudience.title')}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon className="size-5 text-green-500" icon="tabler:check" />
            <h3 className="font-semibold text-green-700 dark:text-green-400">
              {t('guide.limitations.targetAudience.suitableFor.title')}
            </h3>
          </div>
          <ul className="text-bg-500 space-y-2">
            {suitableItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Icon className="size-5 text-red-500" icon="tabler:x" />
            <h3 className="font-semibold text-red-700 dark:text-red-400">
              {t('guide.limitations.targetAudience.notSuitableFor.title')}
            </h3>
          </div>
          <ul className="text-bg-500 space-y-2">
            {notSuitableItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-bg-500 flex items-start gap-2">
        <Icon className="mt-0.5 size-5" icon="tabler:book" />
        <div>
          <p className="font-semibold">
            {t('guide.limitations.targetAudience.source.title')}
          </p>
          <p>{t('guide.limitations.targetAudience.source.desc')}</p>
        </div>
      </div>
    </Widget>
  )
}

export default TargetAudience
