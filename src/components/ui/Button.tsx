import type { ComponentPropsWithoutRef } from 'react'

export function Button({ className = '', type = 'button', ...props }: ComponentPropsWithoutRef<'button'>) {
  return <button className={`button ${className}`.trim()} type={type} {...props} />
}
