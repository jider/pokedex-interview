import {css, cva} from '../../../styled-system/css'

export const baseHeaderStyles = cva({
  base: {
    width: '100%',
    gap: 0,
    paddingInline: '3'
  },
  variants: {
    visual: {
      solid: {backgroundColor: 'yellow.400'},
      translucent: {backgroundColor: 'gray.800/20'}
    }
  },
  defaultVariants: {
    visual: 'solid'
  }
})

export const mainHeaderStyles = css({
  width: '100%',
  justifyContent: 'space-between',
  minHeight: '12',
})

export const bottomHeaderStyles = css({
  borderTopWidth: '1px',
  borderTopColor: 'slate.800'
})
