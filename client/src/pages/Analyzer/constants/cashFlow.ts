
export const CASH_FLOW_OPTIONS = [
  { value: 'profit_inflow', label: 'Profit + Net Inflow' },
  { value: 'profit_outflow', label: 'Profit + Net Outflow' },
  { value: 'loss_inflow', label: 'Loss + Net Inflow' },
  { value: 'loss_outflow', label: 'Loss + Net Outflow' }
] as const

export type CashFlowOption = (typeof CASH_FLOW_OPTIONS)[number]['value']
