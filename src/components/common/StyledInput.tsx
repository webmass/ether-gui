import { css } from '@emotion/css'
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
  color: '#212121',
  padding: '0.6rem',
  border: '1px solid #ddd',
  borderRadius: '0.3rem',
  outlineWidth: 0,
  boxSizing: 'border-box',
  '&[type="text"],&[type="number"]': {
    width: '100%',
  },
  '&:focus': {
    borderColor: '#0076ff',
    boxShadow: '0 0 4px -1px #0076ff',
  },
});

const StyledInput = ({ ...props }) => {
  const classNames = useCustomStyles(StyledComponentsName.input, defaultClass);
  return <input className={classNames} {...props} />
}

export default StyledInput;
