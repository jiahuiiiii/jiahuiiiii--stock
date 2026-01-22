export interface StockLog {
  id: string
  ticker: string
  stockExchange?: string
  companyName?: string
  date: string
  values: {
    cagr: number
    dy: number
    pe: number
    margin: number
    roe: number
    cashFlow: string
  }
  scores: {
    gdp: number // G + D + P
    prc: number // P + R + C
    total: number
  }
  quantitative: {
    passedZulu: boolean
    undervaluedPe: boolean
    valueChain: boolean
    dividendPolicy: boolean
    management: boolean
    moat: boolean
  }
}
