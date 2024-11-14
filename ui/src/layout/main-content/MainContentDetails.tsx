import {ReactNode} from 'react'
import {mainContentDetailsStyles} from './MainContentDetails.styles'

interface MainContentDetailProps {
  children: ReactNode,
  bgColor: string
}

function MainContentDetails({bgColor, children}: MainContentDetailProps) {
  return (
    <section
      className={mainContentDetailsStyles}
      style={{backgroundColor: `${bgColor || 'gray'}`}}
    >
      {children}
    </section>
  );
}

export default MainContentDetails;
