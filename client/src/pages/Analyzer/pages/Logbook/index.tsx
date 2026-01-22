import { useQuery } from '@tanstack/react-query'
import { ModuleHeader, Tabs, WithQuery } from 'lifeforge-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import forgeAPI from '@/utils/forgeAPI'

import AnalysisItem from './components/AnalysisItem'
import CalculatorItem from './components/CalculatorItem'
import ItemListing from './components/ItemListing'

const TAB_KEYS = ['analyses', 'calculators'] as const

const TAB_CONFIG = {
  analyses: {
    icon: 'tabler:chart-line',
    component: AnalysisItem,
    emptyStateId: 'savedAnalysisLog'
  },
  calculators: {
    icon: 'tabler:calculator',
    component: CalculatorItem,
    emptyStateId: 'savedCalculatorLog'
  }
}

export default function Logbook() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const calculatorLogsQuery = useQuery(
    forgeAPI.analyzer.logs.calculator.list.queryOptions()
  )

  const analyzerLogsQuery = useQuery(
    forgeAPI.analyzer.logs.analyzer.list.queryOptions()
  )

  const queries = {
    analyses: analyzerLogsQuery,
    calculators: calculatorLogsQuery
  }

  const [activeTab, setActiveTab] =
    useState<(typeof TAB_KEYS)[number]>('calculators')

  return (
    <>
      <ModuleHeader
        icon="tabler:book"
        namespace="apps.jiahuiiiii$stock"
        title="logbook"
        tKey="subsectionsTitleAndDesc"
      />
      <Tabs
        className="mb-4"
        currentTab={activeTab}
        enabled={[...TAB_KEYS]}
        items={TAB_KEYS.map(key => ({
          id: key,
          name: t(`logbook.tabs.${key}`),
          icon: TAB_CONFIG[key].icon,
          amount: queries[key].data?.length
        }))}
        onTabChange={setActiveTab}
      />
      <WithQuery query={queries[activeTab] as never}>
        {logs => (
          <ItemListing
            component={TAB_CONFIG[activeTab].component}
            emptyStateId={TAB_CONFIG[activeTab].emptyStateId}
            logs={logs as never}
          />
        )}
      </WithQuery>
    </>
  )
}
