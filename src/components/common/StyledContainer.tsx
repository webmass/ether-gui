import { css } from '@emotion/css';
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '0.3rem',
  margin: '1rem 0',
  '> * ': {
    marginBottom: '1rem'
  },
  '> *:last-child': {
    marginBottom: 0
  }
});

const StyledContainer = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.container, defaultClass);
  return <fieldset className={classNames} {...props}>{children}</fieldset>
}

export default StyledContainer;