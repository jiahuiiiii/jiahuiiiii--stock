import {
  Button,
  Card,
  Checkbox,
  ConfirmationModal,
  useModalStore
} from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'

import { useAnalyzer } from '../providers/AnalyzerProvider'

const QUALITATIVE_IDS = [
  'valueChain',
  'dividendPolicy',
  'management',
  'moat'
] as const

function QualitativeGate() {
  const { t } = useTranslation('apps.jiahuiiiii$stock')

  const { open } = useModalStore()

  const { qualitative, setQualitative, setPhase } = useAnalyzer()

  const allQualitativePass = Object.values(qualitative).every(v => v)

  return (
    <>
      <div className="flex-1">
        <div className="mb-6 space-y-4">
          {QUALITATIVE_IDS.map(id => (
            <Card key={id} className="component-bg-lighter flex-between">
              <div>
                <div className="text-lg font-medium">
                  {t(`analyzer.qualitative.${id}.label`)}
                </div>
                <div className="text-bg-500 text-sm">
                  {t(`analyzer.qualitative.${id}.description`)}
                </div>
              </div>
              <Checkbox
                checked={qualitative[id]}
                onCheckedChange={checked =>
                  setQualitative(prev => ({
                    ...prev,
                    [id]: checked
                  }))
                }
              />
            </Card>
          ))}
        </div>
      </div>
      <Button
        className="w-full"
        icon="tabler:arrow-right"
        iconPosition="end"
        namespace="apps.jiahuiiiii$stock"
        variant={allQualitativePass ? 'primary' : 'secondary'}
        onClick={() => {
          if (allQualitativePass) {
            setPhase(2)

            return
          }

          open(ConfirmationModal, {
            title: t('modals.proceedWithCaution.title'),
            description: t('modals.proceedWithCaution.description'),
            onConfirm: async () => setPhase(2)
          })
        }}
      >
        {allQualitativePass ? 'proceed' : 'skip'}
      </Button>
    </>
  )
}

export default QualitativeGate
