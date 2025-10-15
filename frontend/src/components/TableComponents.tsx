interface TableHeaderProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableCellProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function TableHeader({ children, align = 'left' }: TableHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <th className={`px-4 py-3 ${alignClass} text-sm font-semibold`}>
      {children}
    </th>
  )
}

export function TableCell({ children, align = 'left', className = '' }: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  return (
    <td className={`px-4 py-3 text-sm ${alignClass} ${className}`}>
      {children}
    </td>
  )
}
