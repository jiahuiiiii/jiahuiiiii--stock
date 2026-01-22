import { Icon } from '@iconify/react'
import type { CashFlowOption } from '@server/utils/defaults'
import {
  Button,
  ListboxInput,
  ListboxOption,
  NumberInput,
  TextInput
} from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

import { CASH_FLOW_OPTIONS } from '@/pages/Analyzer/constants/cashFlow'

import ScoreBadge from '../../Toolbox/components/ScoreBadge'
import { useAnalyzer } from '../providers/AnalyzerProvider'

function Header({
  color,
  title,
  children
}: {
  color: string
  title: string
  children?: React.ReactNode
}) {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <header className="flex-between mb-4 w-full">
      <h2 className="text-bg-500 flex items-center gap-2 font-semibold tracking-wide">
        <span
          className="h-6 w-1 rounded-full"
          style={{ backgroundColor: color }}
        />
        {t(`calculators.categories.${title}`)}
      </h2>
      <div className="text-bg-500 font-medium">{children}</div>
    </header>
  )
}

function QuantitativeEntry() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const {
    baseInfo: { stockExchange, ticker, companyName },
    setBaseInfo,
    rawValues,
    setRawValues,
    derivedValues,
    setPhase,
    calculatorLogs
  } = useAnalyzer()

  const matchingLog = ticker.trim()
    ? calculatorLogs.find(
        log => log.ticker.toLowerCase() === ticker.trim().toLowerCase()
      )
    : null

  return (
    <>
      <div className="flex-1 space-y-6">
        <section className="mb-6 space-y-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <TextInput
              required
              icon="tabler:tag"
              label="stockTicker"
              namespace="apps.jiahuiiiii$stock"
              placeholder="e.g., AAPL"
              value={ticker}
              onChange={e => setBaseInfo(data => ({ ...data, ticker: e }))}
            />
            <TextInput
              icon="tabler:building"
              label="stockExchange"
              namespace="apps.jiahuiiiii$stock"
              placeholder="e.g., NASDAQ"
              value={stockExchange}
              onChange={e =>
                setBaseInfo(data => ({ ...data, stockExchange: e }))
              }
            />
          </div>
          <TextInput
            icon="tabler:building-bank"
            label="companyName"
            namespace="apps.jiahuiiiii$stock"
            placeholder="e.g., Apple Inc."
            value={companyName}
            onChange={e => setBaseInfo(data => ({ ...data, companyName: e }))}
          />
        </section>
        {matchingLog && (
          <Button
            className="mb-6 w-full"
            icon="tabler:file-import"
            namespace="apps.jiahuiiiii$stock"
            type="button"
            variant="secondary"
            onClick={() => {
              if (matchingLog.values_and_scores.cagr) {
                setRawValues(data => ({
                  ...data,
                  cagr:
                    Number(
                      matchingLog.values_and_scores.cagr.value?.toFixed(2)
                    ) || 0
                }))
              }

              if (matchingLog.values_and_scores.dy) {
                setRawValues(data => ({
                  ...data,
                  dy:
                    Number(
                      matchingLog.values_and_scores.dy.value?.toFixed(2)
                    ) || 0
                }))
              }

              if (matchingLog.values_and_scores.pe) {
                setRawValues(data => ({
                  ...data,
                  pe:
                    Number(
                      matchingLog.values_and_scores.pe.value?.toFixed(2)
                    ) || 0
                }))
              }

              if (matchingLog.values_and_scores.margin) {
                setRawValues(data => ({
                  ...data,
                  margin:
                    Number(
                      matchingLog.values_and_scores.margin.value?.toFixed(2)
                    ) || 0
                }))
              }

              if (matchingLog.values_and_scores.roe) {
                setRawValues(data => ({
                  ...data,
                  roe:
                    Number(
                      matchingLog.values_and_scores.roe.value?.toFixed(2)
                    ) || 0
                }))
              }

              // Also fill in stock info if empty
              if (!companyName && matchingLog.name) {
                setBaseInfo(data => ({
                  ...data,
                  companyName: matchingLog.name
                }))
              }

              if (!stockExchange && matchingLog.exchange) {
                setBaseInfo(data => ({
                  ...data,
                  stockExchange: matchingLog.exchange
                }))
              }
            }}
          >
            fetchFromLogbook
          </Button>
        )}
        <section>
          <Header color={COLORS.lime[500]} title="gdp">
            {t('analyzer.score')} {derivedValues.gdpScore}/100
          </Header>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.gCagr')}</span>
                <ScoreBadge maxScore={50} score={derivedValues.cagrScore} />
              </div>
              <NumberInput
                required
                icon="tabler:trending-up"
                label="cagr"
                namespace="apps.jiahuiiiii$stock"
                placeholder="e.g., 15"
                value={rawValues.cagr}
                onChange={value =>
                  setRawValues(data => ({ ...data, cagr: value }))
                }
              />
            </div>
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.dDividendYield')}</span>
                <ScoreBadge maxScore={40} score={derivedValues.dyScore} />
              </div>
              <NumberInput
                required
                icon="tabler:percentage"
                label="Dividend Yield"
                namespace="apps.jiahuiiiii$stock"
                placeholder="e.g., 3"
                value={rawValues.dy}
                onChange={value =>
                  setRawValues(data => ({ ...data, dy: value }))
                }
              />
            </div>
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.pPeRatio')}</span>
                <ScoreBadge maxScore={30} score={derivedValues.peScore} />
              </div>
              <NumberInput
                required
                icon="tabler:chart-bar"
                label="peRatio"
                namespace="apps.jiahuiiiii$stock"
                placeholder="e.g., 12"
                value={rawValues.pe}
                onChange={value =>
                  setRawValues(data => ({ ...data, pe: value }))
                }
              />
            </div>
          </div>
        </section>

        <section>
          <Header color={COLORS.blue[500]} title="prc">
            {t('analyzer.score')} {derivedValues.prcScore}/100
          </Header>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.pProfitMargin')}</span>
                <ScoreBadge maxScore={20} score={derivedValues.marginScore} />
              </div>
              <NumberInput
                required
                icon="tabler:chart-pie"
                label="profit margin"
                namespace="apps.jiahuiiiii$stock"
                placeholder="e.g., 20"
                value={rawValues.margin}
                onChange={value =>
                  setRawValues(data => ({ ...data, margin: value }))
                }
              />
            </div>
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.rRoe')}</span>
                <ScoreBadge maxScore={20} score={derivedValues.roeScore} />
              </div>
              <NumberInput
                required
                icon="tabler:activity"
                label="roe"
                namespace="apps.jiahuiiiii$stock"
                placeholder="e.g., 18"
                value={rawValues.roe}
                onChange={value =>
                  setRawValues(data => ({ ...data, roe: value }))
                }
              />
            </div>
            <div>
              <div className="text-bg-500 mb-1 flex items-center justify-between text-sm">
                <span>{t('analyzer.metrics.cCashFlow')}</span>
                <ScoreBadge maxScore={40} score={derivedValues.cashFlowScore} />
              </div>
              <ListboxInput
                buttonContent={
                  <span>
                    {t(`settings.cashFlow.${_.camelCase(rawValues.cashFlow)}`)}
                  </span>
                }
                icon="tabler:coin"
                label="cashFlow"
                namespace="apps.jiahuiiiii$stock"
                value={rawValues.cashFlow}
                onChange={value =>
                  setRawValues(data => ({
                    ...data,
                    cashFlow: value as CashFlowOption
                  }))
                }
              >
                {CASH_FLOW_OPTIONS.map(opt => (
                  <ListboxOption
                    key={opt.value}
                    label={t(`settings.cashFlow.${_.camelCase(opt.value)}`)}
                    value={opt.value}
                  />
                ))}
              </ListboxInput>
            </div>
          </div>
        </section>
        <section>
          <Header color={COLORS.purple[500]} title="supplementary" />
          <NumberInput
            icon="tabler:history"
            label="tenYearAvgPe"
            namespace="apps.jiahuiiiii$stock"
            placeholder="e.g., 20"
            value={rawValues.avgPE}
            onChange={value =>
              setRawValues(data => ({ ...data, avgPE: value }))
            }
          />
          <div className="mt-3 flex gap-4">
            {derivedValues.passedZulu && (
              <div className="flex items-center gap-1.5 text-sm text-green-500">
                <Icon icon="tabler:check" />
                {t('analyzer.zuluPass')}
              </div>
            )}
            {derivedValues.undervaluedPe && (
              <div className="flex items-center gap-1.5 text-sm text-green-500">
                <Icon icon="tabler:check" />
                {t('analyzer.undervalued')}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="flex gap-3">
        <Button
          icon="tabler:arrow-left"
          namespace="apps.jiahuiiiii$stock"
          variant="secondary"
          onClick={() => setPhase(1)}
        >
          back
        </Button>
        <Button
          className="flex-1"
          disabled={!ticker.trim()}
          icon="tabler:arrow-right"
          namespace="apps.jiahuiiiii$stock"
          onClick={() => setPhase(3)}
        >
          viewVerdict
        </Button>
      </div>
    </>
  )
}

export default QuantitativeEntry
