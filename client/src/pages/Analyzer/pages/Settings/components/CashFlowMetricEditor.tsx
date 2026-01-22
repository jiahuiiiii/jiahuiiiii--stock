import type { CashFlowOption, MetricConfig } from '@server/utils/defaults'
import { Button, Card, NumberInput, Widget } from 'lifeforge-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CashFlowMetricEditor({
  settings,
  localSettings,
  setLocalSettings
}: {
  settings: Record<CashFlowOption, number>
  localSettings: Record<string, MetricConfig>
  setLocalSettings: (settings: Record<string, MetricConfig>) => void
}) {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const [isCashFlowLocked, setIsCashFlowLocked] = useState(true)

  function updateTiers(tiers: Record<CashFlowOption, number>) {
    setLocalSettings({
      ...localSettings,
      cashflow: {
        ...localSettings.cashflow,
        tiers
      }
    })
  }

  return (
    <Widget
      actionComponent={
        <Button
          icon={isCashFlowLocked ? 'tabler:lock' : 'tabler:lock-open'}
          namespace="apps.jiahuiiiii$stock"
          variant="plain"
          onClick={() => setIsCashFlowLocked(!isCashFlowLocked)}
        >
          {isCashFlowLocked ? 'unlock' : 'lock'}
        </Button>
      }
      description={t('settings.cashFlow.description')}
      icon="tabler:coin"
      title={t('settings.cashFlow.title')}
    >
      <div className="divide-bg-200 dark:divide-bg-700 divide-y">
        {[
          {
            key: 'profit_inflow' as const,
            label: t('settings.cashFlow.profitInflow')
          },
          {
            key: 'profit_outflow' as const,
            label: t('settings.cashFlow.profitOutflow')
          },
          {
            key: 'loss_inflow' as const,
            label: t('settings.cashFlow.lossInflow')
          },
          {
            key: 'loss_outflow' as const,
            label: t('settings.cashFlow.lossOutflow')
          }
        ].map(item => (
          <Card key={item.key} className="flex items-center justify-between">
            <span className="text-bg-500">{item.label}</span>
            <div className="flex items-center gap-2">
              <NumberInput
                className="w-16"
                disabled={isCashFlowLocked}
                placeholder="0"
                size="small"
                value={settings[item.key]}
                variant="plain"
                onChange={e =>
                  updateTiers({
                    ...settings,
                    [item.key]: e
                  })
                }
              />
              <span className="text-bg-500">{t('settings.metrics.pts')}</span>
            </div>
          </Card>
        ))}
      </div>
    </Widget>
  )
}

export default CashFlowMetricEditor
