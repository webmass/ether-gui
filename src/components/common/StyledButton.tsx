import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  padding: '0.6rem 1.2rem',
  cursor: 'pointer',
  color: '#fff',
  border: 'none',
  borderRadius: '0.3rem',
  transition: 'background 250ms ease-out, opacity 250ms ease-out, box-shadow 250ms ease-out',
  letterSpacing: '0.2rem',
  fontSize: '1rem',
  background: 'linear-gradient(225.1deg,#7e50ec,#6c5bf3 23.47%,#5665f8 49.62%,#3b6efc 74.96%,#0076ff)',
  '&:hover': {
    boxShadow: '0 0 5px -1px #0076ff',
  },
  '&:disabled': {
    opacity: 0.8,
    cursor: 'default',
    background: '#ccc',
    boxShadow: 'none',
  },
})

const StyledButton = ({ children, ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.button, defaultClass);
  return <button className={classNames} {...props}>{children}</button>
}

export default StyledButton;