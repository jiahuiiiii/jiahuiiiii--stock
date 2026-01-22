import { Icon } from '@iconify/react'
import { Widget } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function FindingData() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <Widget
      icon="tabler:search"
      iconColor={COLORS.green[500]}
      title={t('guide.howto.findingData.title')}
    >
      <p className="text-bg-500">{t('guide.howto.findingData.intro')}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-bg-100 dark:bg-bg-800/50 rounded-lg p-4">
          <h3 className="mb-2 text-lg font-semibold">
            {t('guide.howto.findingData.annualReports.title')}
          </h3>
          <p className="text-bg-500 mb-2">
            {t('guide.howto.findingData.annualReports.desc')}
          </p>
          <ul className="text-bg-500 space-y-1">
            <li className="flex items-center gap-2">
              <Icon className="text-custom-500 size-4" icon="tabler:check" />
              {t('guide.howto.findingData.annualReports.incomeStatement')}
            </li>
            <li className="flex items-center gap-2">
              <Icon className="text-custom-500 size-4" icon="tabler:check" />
              {t('guide.howto.findingData.annualReports.balanceSheet')}
            </li>
            <li className="flex items-center gap-2">
              <Icon className="text-custom-500 size-4" icon="tabler:check" />
              {t('guide.howto.findingData.annualReports.cashFlowStatement')}
            </li>
          </ul>
        </div>
        <div className="bg-bg-100 dark:bg-bg-800/50 rounded-lg p-4">
          <h3 className="mb-2 text-lg font-semibold">
            {t('guide.howto.findingData.dataProviders.title')}
          </h3>
          <ul className="text-bg-500 space-y-2">
            <li className="flex items-center gap-2">
              <Icon className="size-4 text-blue-500" icon="tabler:world" />
              <strong>Yahoo Finance</strong> -{' '}
              {t('guide.howto.findingData.dataProviders.yahooFinance')}
            </li>
            <li className="flex items-center gap-2">
              <Icon className="size-4 text-purple-500" icon="tabler:star" />
              <strong>Morningstar</strong> -{' '}
              {t('guide.howto.findingData.dataProviders.morningstar')}
            </li>
            <li className="flex items-center gap-2">
              <Icon className="size-4 text-orange-500" icon="tabler:file" />
              <strong>SEC EDGAR</strong> -{' '}
              {t('guide.howto.findingData.dataProviders.secEdgar')}
            </li>
          </ul>
        </div>
      </div>
    </Widget>
  )
}

export default FindingData
