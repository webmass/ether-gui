import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  color: 'darkred'
});

const StyledButtonContainer = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.error, defaultClass);
  return <span className={classNames} {...props}>{children}</span>
}

export default StyledButtonContainer;