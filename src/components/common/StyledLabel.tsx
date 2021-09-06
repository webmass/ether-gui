import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  color: '#212121',
  fontWeight: 'bold',
  display: 'block',
});

const StyledLabel = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.label, defaultClass);
  return <label className={classNames} {...props}>{children}</label>;
}

export default StyledLabel;
