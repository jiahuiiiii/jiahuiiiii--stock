/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyStateScreen } from 'lifeforge-ui'
import React from 'react'

function ItemListing({
  emptyStateId,
  logs,
  component
}: {
  emptyStateId: string
  logs: any[]
  component: React.FC<{ log: any }>
}) {
  const Component = component

  if (logs.length === 0)
    return (
      <div className="flex-1">
        <EmptyStateScreen
          icon="tabler:book-off"
          message={{
            id: emptyStateId,
            namespace: 'apps.jiahuiiiii$stock'
          }}
        />
      </div>
    )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {logs.map(log => (
        <Component key={log.id} log={log} />
      ))}
    </div>
  )
}

export default ItemListing
