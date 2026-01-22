import { createElement } from 'react'
import { useTranslation } from 'react-i18next'

import { AnalyzerSettingsProvider } from '../../providers/useAnalyzerSettings'
import HorizontalStepper from './components/HorizontalStepper'
import QualitativeGate from './phases/01_QualitativeGate'
import QuantitativeEntry from './phases/02_QuantitativeEntry'
import Verdict from './phases/03_Verdict'
import AnalyzerProvider, { useAnalyzer } from './providers/AnalyzerProvider'

export const PHASE_KEYS = [
  'sleepStrategyGate',
  'quantitativeEntry',
  'verdict'
] as const

export const PHASE_COMPONENTS = [QualitativeGate, QuantitativeEntry, Verdict]

export function AnalyzerContent() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const { phase } = useAnalyzer()

  const phaseKey = PHASE_KEYS[phase - 1]

  return (
    <div className="flex flex-1 flex-col">
      <HorizontalStepper />
      <p className="text-custom-500 font-semibold tracking-widest uppercase">
        {t('analyzer.phase')} {phase}
      </p>
      <h2 className="mb-2 text-2xl font-semibold">
        {t(`analyzer.phases.${phaseKey}.name`)}
      </h2>
      <p className="text-bg-500 mb-6">
        {t(`analyzer.phases.${phaseKey}.description`)}
      </p>
      <div className="mb-12 flex flex-1 flex-col">
        {createElement(PHASE_COMPONENTS[phase - 1])}
      </div>
    </div>
  )
}

export default function Analyzer() {
  return (
    <AnalyzerSettingsProvider>
      <AnalyzerProvider>
        <AnalyzerContent />
      </AnalyzerProvider>
    </AnalyzerSettingsProvider>
  )
}
