import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  Card,
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  TagChip,
  useModalStore
} from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import type { InferOutput } from 'shared'

import forgeAPI from '@/utils/forgeAPI'

type CalculatorLogItem = InferOutput<
  typeof forgeAPI.analyzer.logs.calculator.list
>[number]

const METRIC_KEYS = ['cagr', 'dy', 'pe', 'margin', 'roe'] as const

const METRIC_CONFIG = {
  cagr: { labelKey: 'cagr', suffix: '%' },
  dy: { labelKey: 'dividendYield', suffix: '%' },
  pe: { labelKey: 'peRatio', suffix: 'x' },
  margin: { labelKey: 'profitMargin', suffix: '%' },
  roe: { labelKey: 'roe', suffix: '%' }
}

function CalculatorItem({ log }: { log: CalculatorLogItem }) {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const { open } = useModalStore()

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    forgeAPI.analyzer.logs.calculator.remove
      .input({
        id: log.id
      })
      .mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: forgeAPI.analyzer.logs.calculator.list.key
          })
        },
        onError: error => {
          console.error('Error deleting calculator log:', error)
          toast.error(t('errors.calculator.deleteFailed'))
        }
      })
  )

  return (
    <Card className="flex flex-col">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-xl font-semibold">{log.ticker}</div>
          {log.name && <div className="text-custom-500">{log.name}</div>}
          <div className="text-bg-500 mt-2 text-xs">
            {dayjs(log.date).format('YYYY-MM-DD')}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {log.exchange && <TagChip className="text-xs" label={log.exchange} />}
          <ContextMenu
            classNames={{
              button: 'p-2!'
            }}
          >
            <ContextMenuItem
              dangerous
              icon="tabler:trash"
              label={t('modals.deleteCalculation.confirm')}
              onClick={() => {
                open(ConfirmationModal, {
                  title: t('modals.deleteCalculation.title'),
                  description: t('modals.deleteCalculation.description', {
                    ticker: log.ticker
                  }),
                  confirmButtonText: t('modals.deleteCalculation.confirm'),
                  onConfirm: async () => {
                    await deleteMutation.mutateAsync({})
                  }
                })
              }}
            />
          </ContextMenu>
        </div>
      </div>
      <div className="space-y-1">
        {METRIC_KEYS.map(key => (
          <div key={key} className="flex justify-between">
            <span className="text-bg-500">
              {t(`logbook.labels.${METRIC_CONFIG[key].labelKey}`)}
            </span>
            {log.values_and_scores[key]?.value ? (
              <span>
                {log.values_and_scores[key].value.toFixed(2)}
                {METRIC_CONFIG[key].suffix}
              </span>
            ) : (
              <span className="text-bg-400 dark:text-bg-600">
                {t('logbook.labels.na')}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default CalculatorItem
