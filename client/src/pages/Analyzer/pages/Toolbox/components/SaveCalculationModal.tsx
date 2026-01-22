import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { FormModal, defineForm } from 'lifeforge-ui'
import { toast } from 'react-toastify'

import forgeAPI from '@/utils/forgeAPI'

export default function SaveCalculationModal({
  onClose,
  data: { results }
}: {
  onClose: () => void
  data: {
    results: {
      values_and_scores: Record<
        string,
        {
          value: number | undefined
          score: number
        }
      >
      total_score: number
    }
  }
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    forgeAPI.analyzer.logs.calculator.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: forgeAPI.analyzer.logs.calculator.list.key
        })
      },
      onError: error => {
        console.error('Error saving calculation log:', error)
        toast.error('Failed to save calculation log.')
      }
    })
  )

  const { formProps } = defineForm<{
    ticker: string
    name: string
    exchange: string
    date: string
  }>({
    icon: 'tabler:device-floppy',
    onClose,
    title: 'Save Calculation',
    submitButton: {
      icon: 'tabler:device-floppy',
      children: 'Save'
    },
    namespace: 'apps.jiahuiiiii$stock'
  })
    .typesMap({
      ticker: 'text',
      name: 'text',
      exchange: 'text',
      date: 'datetime'
    })
    .setupFields({
      ticker: {
        label: 'Stock Ticker',
        icon: 'tabler:currency-dollar',
        placeholder: 'e.g., AAPL',
        required: true
      },
      name: {
        label: 'Company Name',
        icon: 'tabler:building',
        placeholder: 'e.g., Apple Inc.'
      },
      exchange: {
        label: 'Stock Exchange',
        icon: 'tabler:status-change',
        placeholder: 'e.g., NASDAQ'
      },
      date: {
        label: 'Date',
        icon: 'tabler:calendar',
        required: true
      }
    })
    .autoFocusField('ticker')
    .initialData({
      date: dayjs().toDate()
    })
    .onSubmit(async data => {
      await mutation.mutateAsync({
        ...data,
        values_and_scores: results.values_and_scores,
        total_score: results.total_score
      })
    })
    .build()

  return <FormModal {...formProps} />
}
