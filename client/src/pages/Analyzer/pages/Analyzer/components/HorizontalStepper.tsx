import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'
import tinycolor from 'tinycolor2'

import { PHASE_KEYS } from '..'
import { useAnalyzer } from '../providers/AnalyzerProvider'

function HorizontalStepper() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const { phase, setPhase } = useAnalyzer()

  const { derivedThemeColor } = usePersonalization()

  return (
    <div className="mb-8 flex w-full items-center justify-center">
      {PHASE_KEYS.map((key, index) => {
        const stepNumber = index + 1

        const isCompleted = phase > stepNumber

        const isCurrent = phase === stepNumber

        return (
          <div key={index} className="flex items-center">
            <button
              className="flex items-center gap-3"
              onClick={() => setPhase(stepNumber)}
            >
              <div
                className={`relative flex size-10 shrink-0 items-center justify-center rounded-full font-semibold transition-all ${
                  isCompleted
                    ? 'bg-custom-500/20 text-custom-500'
                    : isCurrent
                      ? clsx(
                          'bg-custom-500',
                          tinycolor(derivedThemeColor).isDark()
                            ? 'text-bg-100'
                            : 'text-bg-900'
                        )
                      : 'bg-bg-200 text-bg-500 dark:bg-bg-700/50'
                }`}
              >
                {isCompleted ? <Icon icon="tabler:check" /> : stepNumber}
              </div>
              <span
                className={`hidden text-left font-medium transition-colors sm:block ${
                  isCurrent
                    ? 'text-custom-500'
                    : isCompleted
                      ? 'text-bg-800 dark:text-bg-100'
                      : 'text-bg-500'
                }`}
              >
                {t(`analyzer.phases.${key}.name`)}
              </span>
            </button>
            {index < PHASE_KEYS.length - 1 && (
              <div
                className={`mx-4 h-0.5 w-12 transition-colors sm:w-16 ${
                  isCompleted
                    ? 'bg-custom-500/20'
                    : 'bg-bg-200 dark:bg-bg-700/50'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HorizontalStepper
