import { css } from '@emotion/css';
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  padding: '1rem',
  border: '1px dashed #ccc',
  borderRadius: '0.3rem',
  margin: '1rem 0',
  '> * ': {
    marginBottom: '1rem'
  },
  '> *:last-child': {
    marginBottom: 0
  }
});

const StyledSubContainer = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.subcontainer, defaultClass);
  return <fieldset className={classNames} {...props}>{children}</fieldset>
}

export default StyledSubContainer;