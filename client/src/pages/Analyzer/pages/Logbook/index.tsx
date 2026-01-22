import { useQuery } from '@tanstack/react-query'
import { ModuleHeader, Tabs, WithQuery } from 'lifeforge-ui'
import { useState } from 'react'

import forgeAPI from '@/utils/forgeAPI'

import AnalysisItem from './components/AnalysisItem'
import CalculatorItem from './components/CalculatorItem'
import ItemListing from './components/ItemListing'

export default function Logbook() {
  const calculatorLogsQuery = useQuery(
    forgeAPI.analyzer.logs.calculator.list.queryOptions()
  )

  const analyzerLogsQuery = useQuery(
    forgeAPI.analyzer.logs.analyzer.list.queryOptions()
  )

  const tabs = {
    analyses: {
      name: 'Stock Analyses',
      icon: 'tabler:chart-line',
      component: AnalysisItem,
      query: analyzerLogsQuery,
      emptyStateId: 'savedAnalysisLog'
    },
    calculators: {
      name: 'Calculations',
      icon: 'tabler:calculator',
      component: CalculatorItem,
      query: calculatorLogsQuery,
      emptyStateId: 'savedCalculatorLog'
    }
  }

  const [activeTab, setActiveTab] = useState<keyof typeof tabs>('calculators')

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
        enabled={Object.keys(tabs) as (keyof typeof tabs)[]}
        items={Object.entries(tabs).map(([id, { name, icon, query }]) => ({
          id,
          name,
          icon,
          amount: query.data?.length
        }))}
        onTabChange={setActiveTab}
      />
      <WithQuery query={tabs[activeTab].query as never}>
        {logs => (
          <ItemListing
            component={tabs[activeTab].component}
            emptyStateId={tabs[activeTab].emptyStateId}
            logs={logs as never}
          />
        )}
      </WithQuery>
    </>
  )
}
