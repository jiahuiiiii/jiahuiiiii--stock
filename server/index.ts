import { forgeRouter } from '@lifeforge/server-utils'

import * as analyzerLogsRoutes from './routes/analyzerLogs'
import * as analyzerSettingsRoutes from './routes/analyzerSettings'
import * as calculatorLogsRoutes from './routes/calculatorLogs'
import * as dataRoutes from './routes/data'
import * as diaryRoutes from './routes/diary'
import * as portfolioHoldingsRoutes from './routes/portfolioHoldings'
import * as portfoliosRoutes from './routes/portfolios'

export default forgeRouter({
  data: dataRoutes,
  portfolios: {
    ...portfoliosRoutes,
    holdings: portfolioHoldingsRoutes
  },
  diary: diaryRoutes,
  analyzer: {
    settings: analyzerSettingsRoutes,
    logs: {
      calculator: calculatorLogsRoutes,
      analyzer: analyzerLogsRoutes
    }
  }
})
