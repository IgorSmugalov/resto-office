import Link, { LinkProps } from 'next/link'
import { FC, ReactNode } from 'react'
import styles from './next-link.module.scss'

export const NextLink: FC<LinkProps & { children: ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Link className={styles.nextLink} {...props}>
      {children}
    </Link>
  )
}
