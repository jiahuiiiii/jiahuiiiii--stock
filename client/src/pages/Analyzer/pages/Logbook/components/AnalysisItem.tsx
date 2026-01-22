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
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import type { InferOutput } from 'shared'
import COLORS from 'tailwindcss/colors'

import { VERDICTS, getVerdict } from '@/pages/Analyzer/constants/verdict'
import forgeAPI from '@/utils/forgeAPI'

type AnalyzerLogItem = InferOutput<
  typeof forgeAPI.analyzer.logs.analyzer.list
>[number]

function AnalysisItem({ log }: { log: AnalyzerLogItem }) {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const queryClient = useQueryClient()

  const { open } = useModalStore()

  const deleteMutation = useMutation(
    forgeAPI.analyzer.logs.analyzer.remove
      .input({
        id: log.id
      })
      .mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: forgeAPI.analyzer.logs.analyzer.list.key
          })
        },
        onError: error => {
          console.error('Failed to delete analysis', error)
          toast.error(t('errors.analyzer.deleteFailed'))
        }
      })
  )

  const verdict = getVerdict(log.scores.gdp, log.scores.prc)

  const totalScore = Object.values(log.scores).reduce((a, b) => a + b, 0)

  const LABELS_MAP = {
    cagr: { key: 'cagr', format: (v: number) => `${v.toFixed(1)}%` },
    dy: { key: 'dy', format: (v: number) => `${v.toFixed(1)}%` },
    pe: { key: 'pe', format: (v: number) => `${v.toFixed(1)}x` },
    margin: { key: 'margin', format: (v: number) => `${v.toFixed(1)}%` },
    roe: { key: 'roe', format: (v: number) => `${v.toFixed(1)}%` },
    cashFlow: {
      key: 'cashFlow',
      format: () =>
        t(`settings.cashFlow.${_.camelCase(log.values.cashFlow as string)}`)
    }
  } as const

  return (
    <Card className="flex flex-col">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-xl font-semibold">{log.ticker}</div>
          {log.company_name && (
            <div className="text-custom-500">{log.company_name}</div>
          )}
          <div className="text-bg-500 mt-1 text-sm">
            {dayjs(log.date).format('DD MMM YYYY')}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TagChip
            className="text-xs!"
            color={VERDICTS[verdict].color}
            icon={VERDICTS[verdict].icon}
            label={`${verdict} (${totalScore})`}
          />
          <ContextMenu
            classNames={{
              button: 'p-2!'
            }}
          >
            <ContextMenuItem
              dangerous
              icon="tabler:trash"
              label={t('modals.deleteAnalysis.confirm')}
              onClick={() => {
                open(ConfirmationModal, {
                  title: t('modals.deleteAnalysis.title'),
                  description: t('modals.deleteAnalysis.description', {
                    ticker: log.ticker
                  }),
                  confirmButtonText: t('modals.deleteAnalysis.confirm'),
                  onConfirm: async () => {
                    await deleteMutation.mutateAsync({})
                  }
                })
              }}
            />
          </ContextMenu>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div
            className={`rounded-lg p-2 ${
              log.scores.gdp >= 50
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            <div className="text-sm font-medium">{t('logbook.labels.gdp')}</div>
            <div className="text-lg font-semibold">{log.scores.gdp}</div>
          </div>
          <div
            className={`rounded-lg p-2 ${
              log.scores.prc >= 50
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            <div className="text-sm font-medium">{t('logbook.labels.prc')}</div>
            <div className="text-lg font-semibold">{log.scores.prc}</div>
          </div>
          <div className="bg-bg-100 dark:bg-bg-800 rounded-lg p-2">
            <div className="text-bg-500 text-sm">
              {t('logbook.labels.total')}
            </div>
            <div className="text-lg font-semibold">{totalScore}</div>
          </div>
        </div>

        <div className="space-y-1">
          {(Object.keys(LABELS_MAP) as (keyof typeof LABELS_MAP)[]).map(key => (
            <div key={key} className="flex justify-between">
              <span className="text-bg-500">{t(`logbook.labels.${key}`)}</span>
              <span>
                {LABELS_MAP[key].format(Number(log.values[key]) || 0)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {log.quantitative.passedZulu && (
            <TagChip
              color={COLORS.green[500]}
              icon="tabler:check"
              label={t('logbook.tags.zuluPass')}
            />
          )}
          {log.quantitative.undervaluedPe && (
            <TagChip
              color={COLORS.green[500]}
              icon="tabler:check"
              label={t('logbook.tags.undervalued')}
            />
          )}
          <TagChip
            color={VERDICTS[verdict].color}
            icon={VERDICTS[verdict].icon}
            label={VERDICTS[verdict].label}
          />
        </div>
      </div>
    </Card>
  )
}

export default AnalysisItem
