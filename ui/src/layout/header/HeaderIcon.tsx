import {Link} from 'react-router-dom'
import {BaseIcon} from '../../components/common'
import {baseIcon} from '../../styles/recipes'

interface HeaderIconProps {
  disable?: boolean
  icon: string
  onClick?: () => void,
  to?: string
}

function HeaderIcon({disable, icon, onClick, to}: HeaderIconProps) {
  return (
    <>
      {!!to
        ? (
          <Link to={to} className={baseIcon({link: true})}>
            <BaseIcon icon={icon}/>
          </Link>
        )
        : (
          <BaseIcon
            icon={icon}
            className={disable ? baseIcon({disabled: true}) : baseIcon()}
            onClick={onClick}
          />
        )
      }
    </>
  );
}

export default HeaderIcon;
