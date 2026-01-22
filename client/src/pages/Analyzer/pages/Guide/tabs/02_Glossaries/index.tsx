import { useTranslation } from 'react-i18next'

import TermItem from './components/TermItem'

const TERM_KEYS = [
  'cagr',
  'peRatio',
  'pegRatio',
  'dividendYield',
  'netProfitMargin',
  'roe',
  'psRatio'
] as const

const TERM_CONFIG = {
  cagr: {
    latex:
      '\\left(\\dfrac{\\text{End Value}}{\\text{Start Value}}\\right)^{\\frac{1}{n}} - 1',
    color: 'green' as const,
    icon: 'tabler:letter-c'
  },
  peRatio: {
    latex: '\\dfrac{\\text{Stock Price}}{\\text{EPS}}',
    color: 'blue' as const,
    icon: 'tabler:letter-p'
  },
  pegRatio: {
    latex: '\\dfrac{\\text{PE Ratio}}{\\text{CAGR}}',
    color: 'purple' as const,
    icon: 'tabler:letter-p'
  },
  dividendYield: {
    latex:
      '\\dfrac{\\text{Annual Dividend}}{\\text{Stock Price}} \\times 100\\%',
    color: 'orange' as const,
    icon: 'tabler:letter-d'
  },
  netProfitMargin: {
    latex: '\\dfrac{\\text{Net Profit}}{\\text{Revenue}} \\times 100\\%',
    color: 'teal' as const,
    icon: 'tabler:letter-n'
  },
  roe: {
    latex:
      '\\dfrac{\\text{Net Income}}{\\text{Shareholder Equity}} \\times 100\\%',
    color: 'pink' as const,
    icon: 'tabler:letter-r'
  },
  psRatio: {
    latex: '\\dfrac{\\text{Market Cap}}{\\text{Total Revenue}}',
    color: 'indigo' as const,
    icon: 'tabler:letter-p'
  }
}

function GlossaryTab() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {TERM_KEYS.map(key => (
        <TermItem
          key={key}
          color={TERM_CONFIG[key].color}
          description={t(`guide.glossary.${key}.description`)}
          icon={TERM_CONFIG[key].icon}
          latex={TERM_CONFIG[key].latex}
          term={t(`guide.glossary.${key}.fullName`)}
        />
      ))}
    </div>
  )
}

export default GlossaryTab
