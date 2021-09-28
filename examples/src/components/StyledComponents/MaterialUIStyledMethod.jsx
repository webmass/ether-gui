
import { ContractMethod } from 'ether-gui';
import { useState } from 'react';

import { Button, Card, Checkbox, CardContent, Typography, Container, InputLabel, TextField, LinearProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

// Example of customization with Material UI components for ContractMethod
export const MaterialUIStyledMethod = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const MainContainer = ({ children }) => <Card variant="elevation" style={{ margin: '1rem 0' }}>
        <CardContent>
            <Container>
                {children}
            </Container>
        </CardContent>
    </Card>;

    const HeaderComponent = ({ children, ...props }) => <div
        style={{ cursor: 'pointer' }}
        {...props}
    >
        <Typography gutterBottom={true} color="primary" variant="h6">{children}</Typography>
    </div>;

    const FieldsContainer = ({ children }) => <div style={{ display: 'grid', gap: '1rem' }}>
        {children}
    </div>;

    const ResultsContainer = ({ children }) => <div style={{ marginTop: '1rem' }}>
        {children}
    </div>;

    const BtnContainerComponent = ({ children, ...props }) => <div style={{ marginTop: '1rem' }} {...props}>{children}</div>;
    
    const InputComponent = ({ methodField, min, max, ...props }) => {
        const label = methodField?.label || (!methodField?.isArray ? methodField?.stateName : props.name);
        return methodField?.type === 'bool' ? 
         <Checkbox {...props} /> 
        : 
         <TextField variant="standard" fullWidth={true} label={label} inputProps={{ min, max }} {...props} />;
    }

    const InputContainerComponent = ({ children, ...props }) => <div {...props}>{children}</div>;

    const handleLoading = (isLoading) => setIsLoading(isLoading);

    const ErrorContainerComponent = ({ children, ...props }) => <div style={{ marginTop: '1rem' }} {...props}>
        <Alert
            severity="error"
            style={{ cursor: 'pointer' }}
        >
            {children}
        </Alert>
    </div>;

    const BtnComponent = ({ children, ...props }) => <Button color="primary" variant="contained" {...props}>{children}</Button>

    return (
        <ContractMethod
            useSignerAddressAsDefault={true}
            onLoad={handleLoading}
            HeaderComponent={HeaderComponent}
            ContainerComponent={MainContainer}
            BtnComponent={BtnComponent}
            BtnContainerComponent={BtnContainerComponent}
            FieldsContainerComponent={FieldsContainer}
            ResultsContainerComponent={ResultsContainer}
            // ResultComponent={ResultComponent}
            InputComponent={InputComponent}
            inputContainsLabel={true}
            InputLabelComponent={InputLabel}
            InputContainerComponent={InputContainerComponent}
            ErrorContainerComponent={ErrorContainerComponent}
            ErrorComponent={AlertTitle}
            afterBtn={isLoading ? <LinearProgress style={{ marginTop: '1rem' }} /> : null}
            {...props}
        />
    )
}

export default MaterialUIStyledMethod;