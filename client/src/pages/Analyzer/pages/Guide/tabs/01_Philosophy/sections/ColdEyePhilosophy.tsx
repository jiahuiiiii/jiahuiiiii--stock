import { Card, Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function ColdEyePhilosophy() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <Widget
      icon="tabler:eye"
      iconColor={COLORS.blue[500]}
      title={t('guide.coldEye.title')}
    >
      <div>
        <p className="text-bg-500 mb-8">{t('guide.coldEye.intro')}</p>
        <h3 className="mb-4 text-xl font-semibold">
          {t('guide.coldEye.keyPrinciples')}
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="component-bg-lighter">
            <div className="mb-1 text-lg font-semibold">
              {t('guide.coldEye.gdpScore.title')}
            </div>
            <p className="text-bg-500">{t('guide.coldEye.gdpScore.desc')}</p>
          </Card>
          <Card className="component-bg-lighter">
            <div className="mb-1 text-lg font-semibold">
              {t('guide.coldEye.prcScore.title')}
            </div>
            <p className="text-bg-500">{t('guide.coldEye.prcScore.desc')}</p>
          </Card>
          <Card className="component-bg-lighter">
            <div className="mb-1 text-lg font-semibold">
              {t('guide.coldEye.threshold.title')}
            </div>
            <p className="text-bg-500">{t('guide.coldEye.threshold.desc')}</p>
          </Card>
        </div>
      </div>
    </Widget>
  )
}

export default ColdEyePhilosophy
