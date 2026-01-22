import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function BlindSpots() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <Widget
      icon="tabler:alert-triangle"
      iconColor={COLORS.red[500]}
      title={t('guide.limitations.blindSpots.title')}
    >
      <Widget
        className="component-bg-lighter"
        icon="tabler:rocket-off"
        iconColor={COLORS.red[500]}
        title={t('guide.limitations.blindSpots.techGrowth.title')}
      >
        <div>
          <p className="text-bg-500 mb-3">
            {t('guide.limitations.blindSpots.techGrowth.intro')}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-bg-50 dark:bg-bg-700/30 rounded p-3">
              <div className="font-semibold">
                {t(
                  'guide.limitations.blindSpots.techGrowth.dividendIssues.title'
                )}
              </div>
              <p className="text-bg-500">
                {t(
                  'guide.limitations.blindSpots.techGrowth.dividendIssues.desc'
                )}
              </p>
            </div>
            <div className="bg-bg-50 dark:bg-bg-700/30 rounded p-3">
              <div className="font-semibold">
                {t('guide.limitations.blindSpots.techGrowth.peIssues.title')}
              </div>
              <p className="text-bg-500">
                {t('guide.limitations.blindSpots.techGrowth.peIssues.desc')}
              </p>
            </div>
          </div>
          <p className="text-bg-500 mt-3 border-l-2 border-red-500 pl-2 italic">
            {t('guide.limitations.blindSpots.techGrowth.result')}
          </p>
        </div>
      </Widget>
      <Widget
        className="component-bg-lighter"
        icon="tabler:history"
        iconColor={COLORS.orange[500]}
        title={t('guide.limitations.blindSpots.laggingIndicators.title')}
      >
        <p className="text-bg-500">
          {t('guide.limitations.blindSpots.laggingIndicators.desc')}
        </p>
      </Widget>
      <Widget
        className="component-bg-lighter"
        icon="tabler:coins"
        iconColor={COLORS.yellow[500]}
        title={t('guide.limitations.blindSpots.simplifiedCashFlow.title')}
      >
        <p className="text-bg-500">
          {t('guide.limitations.blindSpots.simplifiedCashFlow.desc')}
        </p>
      </Widget>
    </Widget>
  )
}

export default BlindSpots
