import { GenericChangeFunction, InputTypeComponent } from '../../types';
import StyledInput from '../common/StyledInput';
import { MethodField } from '../../types/index';

const InputComponentDefault = ({ methodField, ...props }) => <StyledInput {...props} />;

type props = {
    methodField: MethodField;
    value: any;
    handleStateValue: (path: string, value: any) => void;
    isArray?: boolean;
    isCommaList?: boolean;
    disabled?: boolean;
    onChange?: GenericChangeFunction | any;
    InputComponent?: InputTypeComponent;
};

const ContractFieldInputs = ({
    methodField,
    value,
    handleStateValue = () => {},
    isArray,
    isCommaList,
    disabled = false,
    onChange = () => {},
    InputComponent = InputComponentDefault,
}: props) => {
    const commonProps = {
        disabled,
        required: methodField.required,
        type: methodField.inputType,
        methodField,
        min: methodField.min,
    }
    
    const inputs = (!isArray || isCommaList) ? <InputComponent
        id={methodField.id}
        name={methodField.stateName}
        placeholder={methodField.placeholder}
        value={value}
        onChange={(e, ...args) => {
            const isCheckbox = methodField.inputType === 'checkbox';
            const target = e?.currentTarget?.nodeName === 'INPUT' ? e?.currentTarget : document.getElementById(methodField.id) || e?.currentTarget;
            const val = isCheckbox ? target.checked : !isCommaList ? target.value : target.value.split(',');
            handleStateValue(methodField.statePath, val);
            onChange(e, ...args);
        }}
        {...commonProps}
    /> :
    value.map((v, i) => {
        return <InputComponent
            key={i}
            id={`${methodField.id}_[${i}]`}
            name={`${methodField.statePath}[${i}]`}
            value={v}
            onChange={(e, ...args) => {
                const newVal = [...value];
                newVal[i] = e.currentTarget.value;
                handleStateValue(`${methodField.statePath}[${i}]`, newVal[i]);
                onChange(e, ...args);
            }}
            {...commonProps}
        />
    })

    return inputs;
}

export default ContractFieldInputs;