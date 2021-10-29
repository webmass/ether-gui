
import { ContractMethod, ScannerLink } from 'ether-gui';
import { useState, useRef } from 'react';
import { useToast } from "@chakra-ui/react"

import { Button, Input, Box, FormControl, Alert, AlertIcon, AlertDescription, Checkbox, Heading, Progress, Divider } from '@chakra-ui/react';

// Example of customization with Semantic UI components for ContractMethod
export const ChakraUIStyledMethod = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const toastRef = useRef(null);

    const MainContainer = ({ children }) => <Box
        borderWidth="1px"
        borderRadius="lg"
        justifyContent="left"
        p="5"
        mb="5"
        mt="5"
    >
        {children}
    </Box>;

    const HeaderComponent = ({ children, ...props }) => <Box>
        <Heading
            cursor="pointer"
            as="h6"
            size="lg"
            color="blue.500"
            {...props}
        >
            {children}
        </Heading>
    </Box>

    const FieldsContainer = ({ children }) => <Box mt="2">
        <Divider mt="2" mb="2" />
        {children}
    </Box>;

    const ResultsContainer = ({ children }) => <Box mt="2">
        {children}
    </Box>;

    const BtnContainerComponent = ({ children, ...props }) => <Box mt="4" {...props}>
        <Divider mt="2" mb="4" />
        {children}
    </Box>;

    const InputComponent = ({ methodField, ...props }) => {
        return methodField?.type === 'bool' ?
            <Checkbox mt="2" mb="2" {...props} />
            :
            <Input mt="2" mb="2" {...props} />;
    }

    const InputContainerComponent = ({ children, ...props }) => <FormControl {...props}>{children}</FormControl>;

    const handleLoading = (isLoading) => setIsLoading(isLoading);

    const ErrorContainerComponent = ({ children, ...props }) => <Box mt="4" mb="4" {...props}>
        <Alert status="error" cursor="pointer">
            <AlertIcon />
            <AlertDescription>
                {children}
            </AlertDescription>
        </Alert>
    </Box>;

    const showToast = (txHash, status, toastStatus) => {
        const options = {
            id: txHash,
            title: `Transaction ${status}`,
            description: <ScannerLink type="tx" value={txHash} />,
            status: toastStatus || status,
            duration: null,
            isClosable: true,
        }
        if (toast.isActive(txHash)) {
            toast.update(toastRef.current, options);
        } else {
            toastRef.current = toast(options);
        }
    }

    return (
        <ContractMethod
            useSignerAddressAsDefault={true}
            onLoad={handleLoading}
            HeaderComponent={HeaderComponent}
            ContainerComponent={MainContainer}
            BtnComponent={Button}
            BtnContainerComponent={BtnContainerComponent}
            FieldsContainerComponent={FieldsContainer}
            ResultsContainerComponent={ResultsContainer}
            // ResultComponent={ResultComponent}
            InputComponent={InputComponent}
            InputContainerComponent={InputContainerComponent}
            ErrorContainerComponent={ErrorContainerComponent}
            afterBtn={isLoading ? <Progress size="xs" mt="4" isIndeterminate /> : null}

            showTransactionLink={false}
            onSuccess={(tx) => showToast(tx.hash, "success")}
            onFail={(tx) => showToast(tx.hash, "failed", "error")}
            onPending={(tx) => showToast(tx.hash, "pending", "info")}
            // ErrorComponent={AlertDescription}
            {...props}
        />
    )
}

export default ChakraUIStyledMethod;