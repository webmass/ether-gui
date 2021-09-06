
import { ContractMethod } from 'ether-gui';
import { useState } from 'react';

import { Button, Input, Form, Card, Message, Checkbox } from 'semantic-ui-react';

// Example of customization with Semantic UI components for ContractMethod
export const SemanticUIStyledMethod = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const MainContainer = ({ children }) => <Card fluid>
        { children }
    </Card>;

    const HeaderComponent = ({ children, ...props }) => <Card.Content 
        style={{cursor:'pointer'}}
        {...props}
    >
        <Card.Header>
            {children}
        </Card.Header>
    </Card.Content>;

    const FieldsContainer = ({ children }) => <Card.Content>
        <Card.Description>
            <Form loading={isLoading}>
                {children}
            </Form>
        </Card.Description>
    </Card.Content>;

    const ResultsContainer = ({ children }) => <Card.Content>
        <Card.Description>
            {children}
        </Card.Description>
    </Card.Content>;

    const ExtraContent = ({ children, ...props }) => <Card.Content extra {...props}>{children}</Card.Content>;

    const InputComponent = ({ methodField, ...props }) => {
        return methodField?.type === 'bool' ?
         <Checkbox toggle {...props} /> 
         : 
         <Input {...props}  />;
    }

    const InputContainerComponent = ({ children, ...props }) => <Form.Field {...props}>{children}</Form.Field>;

    const handleLoading = (isLoading) => setIsLoading(isLoading); 

    const ErrorContainerComponent = ({ children, ...props }) => <ExtraContent {...props}>
        <Message 
         negative
         style={{cursor:'pointer'}}
         >
             {children}
        </Message>
    </ExtraContent>;

    return (
        <ContractMethod
        useSignerAddressAsDefault={true}
        onLoad={handleLoading}
        HeaderComponent={HeaderComponent}
        ContainerComponent={MainContainer}
        BtnComponent={Button}
        BtnContainerComponent={ExtraContent}
        FieldsContainerComponent={FieldsContainer}
        ResultsContainerComponent={ResultsContainer}
        // ResultComponent={ResultComponent}
        InputComponent={InputComponent}
        InputContainerComponent={InputContainerComponent}
        ErrorContainerComponent={ErrorContainerComponent}
        ErrorComponent={Message.Header}
        {...props}
        />
    )
}

export default SemanticUIStyledMethod;