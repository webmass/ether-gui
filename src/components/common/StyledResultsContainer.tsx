import { css } from '@emotion/css';
import useCustomStyles from '../../hooks/useCustomStyles';
import { StyledComponentsName } from '../../types';

const defaultClass = css({
    
});

const StyledResultsContainer = ({ children, ...props }) => {
    const classNames = useCustomStyles(StyledComponentsName.resultsContainer, defaultClass);
    return <div className={classNames} {...props}>{children}</div>
}

export default StyledResultsContainer;