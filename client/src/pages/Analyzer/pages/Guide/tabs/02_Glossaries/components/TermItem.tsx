import { Widget } from 'lifeforge-ui'
import COLORS from 'tailwindcss/colors'

import Formula from './Formlula'

function TermItem({
  term,
  description,
  latex,
  color,
  icon
}: {
  term: string
  description: string
  latex: string
  color: keyof typeof COLORS
  icon: string
}) {
  return (
    <Widget icon={icon} iconColor={COLORS[color][500]} title={term}>
      <p className="text-bg-500">{description}</p>
      <Formula latex={latex} />
    </Widget>
  )
}

export default TermItem
