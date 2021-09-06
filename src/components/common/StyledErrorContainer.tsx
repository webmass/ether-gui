import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  backgroundColor: 'pink',
  padding: '1rem',
  borderRadius: '0.3rem',
  maxWidth: 'fit-content',
  overflow: 'auto',
  textTransform: 'capitalize',
  cursor: 'pointer',
});

const StyledErrorContainer = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.errorContainer, defaultClass);
  return <div className={classNames} {...props}>{children}</div>
}

export default StyledErrorContainer;
