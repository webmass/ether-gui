import { useState, useEffect } from 'react';
import ContractMethod from './ContractMethod';
import { ContractInteractorProps } from '../../types';
import { isReadOnlyMethod } from '../../utils';

const ContractInteractor = ({
    contract,
    methods,
    excludeMethods,
    methodsOptions,
    readOnlyFirst = true,
    defaultMethodOptions = {},
    ContractMethodComponent = ContractMethod
 }: ContractInteractorProps) => {
    const [methodsSignatures, setMethodsSignatures] = useState<string[]>([]);

    useEffect(() => {
        if(!contract?.interface) { 
            return;
        }
        
        let methodsSignatures = methods || Object.keys(contract?.interface?.functions).sort() || [];
        if(excludeMethods?.length){ 
            methodsSignatures = methodsSignatures.filter(method => !excludeMethods.includes(method));
        }

        if(readOnlyFirst) {
            const isPriorityOrder = (method: string) => {
                const fun = contract.interface.functions[method];
                return isReadOnlyMethod(fun.stateMutability) && fun.inputs.length === 0;
            }
    
            const read = methodsSignatures.filter(isPriorityOrder).sort();
            const write  = methodsSignatures.filter(method => !isPriorityOrder(method)).sort();
            methodsSignatures = read.concat(write);
        }

        setMethodsSignatures(methodsSignatures);
    }, [contract, methods, excludeMethods, readOnlyFirst]);

    if(!contract?.interface) {
        return <></>;
    }

    const cards = methodsSignatures.map(methodSignature => {
        const specificOptions = methodsOptions? methodsOptions[methodSignature] : {};
        const options = { ...defaultMethodOptions, ...specificOptions };

        return <ContractMethodComponent
            key={methodSignature}
            contract={contract}
            methodSignature={methodSignature}
            {...options}
        />
    }
    );

    return (
        <>{cards}</>
    )
}

export default ContractInteractor;