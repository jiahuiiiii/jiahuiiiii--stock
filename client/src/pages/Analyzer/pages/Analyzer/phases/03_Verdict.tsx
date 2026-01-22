import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { type InferInput, anyColorToHex } from 'shared'

import { VERDICTS, getVerdict } from '@/pages/Analyzer/constants/verdict'
import forgeAPI from '@/utils/forgeAPI'

import { useAnalyzer } from '../providers/AnalyzerProvider'

function Verdict() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const {
    setPhase,
    baseInfo,
    qualitative,
    rawValues,
    derivedValues,
    resetValues
  } = useAnalyzer()

  const queryClient = useQueryClient()

  const mutation = useMutation(
    forgeAPI.analyzer.logs.analyzer.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: forgeAPI.analyzer.logs.analyzer.list.key
        })
      },
      onError: error => {
        console.error('Failed to save log:', error)
        toast.error(t('errors.analyzer.saveFailed'))
      }
    })
  )

  const verdict = getVerdict(derivedValues.gdpScore, derivedValues.prcScore)

  const handleSaveLog = async () => {
    const log: InferInput<
      typeof forgeAPI.analyzer.logs.analyzer.create
    >['body'] = {
      ticker: baseInfo.ticker.toUpperCase(),
      stock_exchange: baseInfo.stockExchange.toUpperCase(),
      company_name: baseInfo.companyName,
      date: new Date().toISOString(),
      values: {
        cagr: rawValues.cagr,
        dy: rawValues.dy,
        pe: rawValues.pe,
        margin: rawValues.margin,
        roe: rawValues.roe,
        cashFlow: rawValues.cashFlow
      },
      scores: {
        gdp: derivedValues.gdpScore,
        prc: derivedValues.prcScore
      },
      quantitative: {
        passedZulu: derivedValues.passedZulu,
        undervaluedPe: derivedValues.undervaluedPe,
        ...qualitative
      }
    }

    await mutation.mutateAsync(log)

    resetValues()
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="mb-8 flex flex-col items-center rounded-2xl border-2 px-10 py-6"
          style={{
            borderColor: VERDICTS[verdict].color,
            backgroundColor: `${anyColorToHex(VERDICTS[verdict].color)}20`
          }}
        >
          <div
            className={`text-6xl font-bold tracking-widest`}
            style={{
              color: VERDICTS[verdict].color
            }}
          >
            {verdict}
          </div>
          <div
            className={`mt-1 text-xl font-semibold ${VERDICTS[verdict].color}`}
          >
            {t(`analyzer.verdicts.${verdict.toLowerCase()}.label`)}
          </div>
          <div className="text-bg-500 mt-1 text-center">
            {t(`analyzer.verdicts.${verdict.toLowerCase()}.description`)}
          </div>
        </div>

        {/* Stock Info */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-semibold">
            {baseInfo.stockExchange &&
              `${baseInfo.stockExchange.toUpperCase()}:`}
            {baseInfo.ticker.toUpperCase()}
          </div>
          {baseInfo.companyName && (
            <div className="text-bg-500 mt-1 text-lg font-medium">
              {baseInfo.companyName}
            </div>
          )}
        </div>

        {/* Score Cards */}
        <div className="grid w-full grid-cols-3 gap-4">
          <div
            className={`rounded-xl p-5 text-center transition-colors ${
              derivedValues.gdpScore >= 50
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            <div className="font-semibold tracking-wide uppercase">
              {t('analyzer.metrics.gdp')}
            </div>
            <div className="mt-1 text-4xl font-bold">
              {derivedValues.gdpScore}
            </div>
            <div className="mt-1 text-sm font-bold uppercase">
              {derivedValues.gdpScore >= 50
                ? t('analyzer.pass')
                : t('analyzer.fail')}
            </div>
          </div>
          <div
            className={`rounded-xl p-5 text-center transition-colors ${
              derivedValues.prcScore >= 50
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            <div className="font-semibold tracking-wide uppercase">
              {t('analyzer.metrics.prc')}
            </div>
            <div className="mt-1 text-4xl font-bold">
              {derivedValues.prcScore}
            </div>
            <div className="mt-1 text-sm font-bold uppercase">
              {derivedValues.prcScore >= 50
                ? t('analyzer.pass')
                : t('analyzer.fail')}
            </div>
          </div>
          <div className="bg-bg-100 dark:bg-bg-800 rounded-xl p-5 text-center">
            <div className="text-bg-500 font-semibold tracking-wide uppercase">
              {t('analyzer.total')}
            </div>
            <div className="mt-1 text-4xl font-bold">
              {derivedValues.gdpScore + derivedValues.prcScore}
            </div>
            <div className="text-bg-400 mt-1 text-sm font-bold uppercase">
              {t('analyzer.points')}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-3">
        <Button
          icon="tabler:arrow-left"
          namespace="apps.jiahuiiiii$stock"
          variant="secondary"
          onClick={() => setPhase(2)}
        >
          back
        </Button>
        <Button
          className="flex-1"
          icon="tabler:device-floppy"
          namespace="apps.jiahuiiiii$stock"
          onClick={handleSaveLog}
        >
          saveToLogbook
        </Button>
      </div>
    </>
  )
}

export default Verdict
