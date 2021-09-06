import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const StyledButtonContainer = ({ children, ...props }) => {
    const classNames = useCustomStyles(StyledComponentsName.buttonContainer);
    return <div className={classNames} {...props}>{children}</div>
}

export default StyledButtonContainer;