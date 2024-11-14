import {cva} from '../../styled-system/css'

export const baseIcon = cva({
  base: {
    color: 'black',
    cursor: 'pointer',
  },
  variants: {
    link: {
      true: {
        display: 'flex',
        textDecoration: 'none',
        '& ion-icon': {
          color: 'black',
        }
      }
    },
    disabled: {
      true: {opacity: .5, cursor: 'not-allowed'},
    },
    size: {
      small: {fontSize: '1.2rem'},
      medium: {fontSize: '1.5rem'}
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})
