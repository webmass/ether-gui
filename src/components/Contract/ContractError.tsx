import { useState } from 'react';

const ContractError = ({
    error,
    enableErrorDetailsOnClick,
    showDetailedError,
    ErrorComponent,
    ErrorContainerComponent,
    wording,
}) => {
    const [isDetailed, setIsDetailed] = useState(showDetailedError);
    const errorWording = wording?.errors;
    
    const text = isDetailed ? error.detailed : errorWording[error.code] || errorWording[error.simple] || error.simple;
    const Error = () => <ErrorComponent>{text}</ErrorComponent>;
    return (
        <>
            {
                enableErrorDetailsOnClick ?
                    <ErrorContainerComponent onClick={() => setIsDetailed(!isDetailed)}><Error /></ErrorContainerComponent>
                    :
                    <ErrorContainerComponent><Error /></ErrorContainerComponent>
            }
        </>
    )
}

export default ContractError;