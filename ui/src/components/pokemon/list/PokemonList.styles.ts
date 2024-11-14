import {css} from '../../../../styled-system/css'

export const galleryStyles = css({
  display: 'grid',
  gap: '.5rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(30%, 1fr))',
  gridAutoFlow: 'dense',
})
