import type { CashFlowOption, MetricConfig } from '@server/utils/defaults'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  ConfirmationModal,
  ModuleHeader,
  WithQuery,
  useModalStore
} from 'lifeforge-ui'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import forgeAPI from '@/utils/forgeAPI'

import CashFlowMetricEditor from './components/CashFlowMetricEditor'
import MetricEditor, { METRIC_ICONS } from './components/MetricEditor'

export default function Settings() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const { open } = useModalStore()

  const queryClient = useQueryClient()

  const settingsQuery = useQuery(forgeAPI.analyzer.settings.list.queryOptions())

  const [localSettings, setLocalSettings] = useState<Record<
    string,
    MetricConfig
  > | null>(null)

  useEffect(() => {
    if (settingsQuery.data && !localSettings) {
      setLocalSettings(settingsQuery.data as Record<string, MetricConfig>)
    }
  }, [settingsQuery.data, localSettings])

  const hasChanges = useMemo(() => {
    if (!localSettings || !settingsQuery.data) return false

    return JSON.stringify(localSettings) !== JSON.stringify(settingsQuery.data)
  }, [localSettings, settingsQuery.data])

  const updateMutation = useMutation({
    mutationFn: async (settings: Record<string, MetricConfig>) => {
      return forgeAPI.analyzer.settings.update.mutate({
        settings: settings as Record<
          string,
          {
            label: string
            unit: '%' | 'x' | 'pts'
            isInverse?: boolean
            tiers:
              | { threshold: number; score: number }[]
              | Record<CashFlowOption, number>
          }
        >
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: forgeAPI.analyzer.settings.list.key
      })
    }
  })

  const resetMutation = useMutation({
    mutationFn: async () => {
      return forgeAPI.analyzer.settings.reset.mutate({})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: forgeAPI.analyzer.settings.list.key
      })
      setLocalSettings(null)
    }
  })

  return (
    <>
      <ModuleHeader
        icon="tabler:settings"
        namespace="apps.jiahuiiiii$stock"
        title="settings"
        tKey="subsectionsTitleAndDesc"
      />
      <WithQuery query={settingsQuery}>
        {() => (
          <>
            <div className="mb-12 space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {localSettings &&
                  (
                    Object.keys(METRIC_ICONS) as (keyof typeof METRIC_ICONS)[]
                  ).map(id => (
                    <MetricEditor
                      key={id}
                      config={localSettings[id]}
                      localSettings={localSettings}
                      metricId={id}
                      setLocalSettings={setLocalSettings}
                    />
                  ))}
                {localSettings && (
                  <CashFlowMetricEditor
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    settings={
                      localSettings.cashflow.tiers as Record<
                        CashFlowOption,
                        number
                      >
                    }
                  />
                )}
              </div>
              <Button
                className="w-full"
                disabled={!hasChanges || updateMutation.isPending}
                icon="tabler:device-floppy"
                loading={updateMutation.isPending}
                namespace="apps.jiahuiiiii$stock"
                onClick={() => {
                  if (localSettings) {
                    updateMutation.mutate(localSettings)
                  }
                }}
              >
                saveChanges
              </Button>
              <Button
                dangerous
                className="w-full"
                disabled={resetMutation.isPending}
                icon="tabler:refresh"
                loading={resetMutation.isPending}
                namespace="apps.jiahuiiiii$stock"
                variant="secondary"
                onClick={() =>
                  open(ConfirmationModal, {
                    title: t('modals.resetToDefaults.title'),
                    description: t('modals.resetToDefaults.description'),
                    confirmationButton: 'confirm',
                    onConfirm: async () => {
                      resetMutation.mutate()
                    }
                  })
                }
              >
                resetDefaults
              </Button>
            </div>
          </>
        )}
      </WithQuery>
    </>
  )
}
