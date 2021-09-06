import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  color: '#0076ff',
  fontSize: '1.6rem',
  fontWeight: 'bold',
  padding: '0.3rem 1rem',
  width: 'fit-content',
  cursor: 'pointer',
  marginBottom: 0,
});

const StyledHeader = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.header, defaultClass);
  return <legend className={classNames} {...props}>{children}</legend>
}

export default StyledHeader;
