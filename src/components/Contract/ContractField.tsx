import { useState, useEffect } from 'react';
import StyledLabel from '../common/StyledLabel';
import StyledInputContainer from '../common/StyledInputContainer';
import { GenericChangeFunction, GenericComponent, InputTypeComponent, Wording } from '../../types';
import ContractFieldInputs from './ContractFieldInputs';
import { MethodField } from '../../types/index';
import StyledSubContainer from '../common/StyledSubContainer';

const InputLabelComponentDefault = ({ children, ...props }) => <StyledLabel {...props}>{children}</StyledLabel>;

const baseTypeDefaults = {
    string: '',
    array: [],
    tuple: {},
}

const getCleanInitialValue = (methodField: MethodField, value: any, isMultipleInputs: boolean) => {
    if (!methodField.isArray && !methodField.isTuple) return value || '';

    const arraySize = methodField.arrayLength > 0 ? methodField.arrayLength : 1;
    let initialVal: any;

    if (methodField.isTuple) {
        initialVal = { ...value };
        methodField.components.forEach((subField, i) => {
            if (initialVal[subField.stateName || `${i}`] === undefined) {
                initialVal[subField.stateName || `${i}`] = baseTypeDefaults[subField.type] || baseTypeDefaults.string;
            }
        })
    } else if (methodField.isArray) {
        if (isMultipleInputs) {
            initialVal = value || new Array(arraySize);
            const defaultEmptyVal = baseTypeDefaults[methodField.type] || baseTypeDefaults.string;
            for (let i = 0; i < arraySize; i++) {
                if (initialVal[i] === undefined) {
                    initialVal[i] = defaultEmptyVal;
                }
            }
        } else {
            initialVal = value?.join(',') || '';
        }
    }
    return initialVal;
}

type props = {
    methodField: MethodField;
    value: any;
    handleStateValue: (path: string, value: any) => void;
    onChange?: GenericChangeFunction | any;
    disabled?: boolean;
    wording: Partial<Wording>;
    inputContainsLabel?: boolean;
    InputComponent?: InputTypeComponent;
    InputLabelComponent?: GenericComponent | null;
    InputContainerComponent?: GenericComponent;
    SubContainerComponent?: GenericComponent;
};

const ContractField = ({
    methodField,
    value,
    handleStateValue = () => { },
    disabled = false,
    wording,
    inputContainsLabel,
    SubContainerComponent = StyledSubContainer,
    InputComponent,
    InputLabelComponent = InputLabelComponentDefault,
    InputContainerComponent = StyledInputContainer,
}: props) => {
    const isMultipleInputs = methodField.arrayLength !== -1;
    const isCommaList = methodField.isArray && !isMultipleInputs;

    const initVal = getCleanInitialValue(methodField, value, isMultipleInputs);
    const [val, setVal] = useState(initVal);

    useEffect(() => {
        setVal(getCleanInitialValue(methodField, value, isMultipleInputs));
    }, [value, methodField]);

    const name = wording[methodField.stateName] || methodField.stateName;
    const typeLabel = wording[methodField.type] || methodField.type;
    const fieldLabel = methodField.label || `${name || ''} (${typeLabel}) :`.trim();

    const commonProps = {
        disabled,
        onChange: methodField.options?.onChange,
        InputComponent,
        handleStateValue,
    }

    const inputs = methodField.isTuple ? <SubContainerComponent>
        {
            methodField.components.map((subField, i) => {
                return <ContractField
                    key={i}
                    methodField={subField}
                    value={val[subField.stateName || `${i}`]}
                    wording={wording}
                    InputContainerComponent={InputContainerComponent}
                    inputContainsLabel={inputContainsLabel}
                    InputLabelComponent={InputLabelComponent}
                    {...commonProps}
                />
            })
        }
    </SubContainerComponent> :
        <ContractFieldInputs
            value={val}
            methodField={methodField}
            isCommaList={isCommaList}
            isArray={methodField.isArray}
            {...commonProps}
        />

    return (
        <>
            <InputContainerComponent>
                {
                    InputLabelComponent && (!inputContainsLabel || methodField.isTuple) ?
                        <InputLabelComponent>
                            {fieldLabel}
                        </InputLabelComponent>
                        : null
                }
                {inputs}
            </InputContainerComponent>
        </>
    );
}

export default ContractField;