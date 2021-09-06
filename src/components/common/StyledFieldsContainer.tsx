import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  '> * ': {
    marginTop: '0.5rem',
    '> * ': {
      marginTop: '0.5rem',
    },
    '> *:first-child': {
      marginTop: 0
    },
  },
  '> *:first-child': {
    marginTop: 0
  },
  '> *:last-child': {
    paddingBottom: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
  }
});

const StyledFieldsContainer = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.fieldsContainer, defaultClass);
  return <div className={classNames} {...props}>{children}</div>;
}

export default StyledFieldsContainer;
