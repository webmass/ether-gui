import { ChangeEvent, MouseEvent } from 'react';
import { Contract, ContractFunction, ethers, Signer } from 'ethers';
import { CSSInterpolation } from '@emotion/css';
import { FunctionFragment, ParamType } from 'ethers/lib/utils';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { PAYABLE_ABI } from '../constants';
import { getDeep, isFieldAlwaysRequired, toStateName } from '../utils';
import { isReadOnlyMethod, getDecimalForField } from '../utils/index';

export type GenericReactChild = React.ReactNode | React.ReactNode[];
export type GenericComponent = React.ComponentType<any>;
export type GenericChangeFunction = (e: ChangeEvent<HTMLInputElement>) => void;
export type GenericClickEvent = (e: MouseEvent<Element>) => void;

export type StringMap = { [key: string]: string };

export type MinContract = {
    address: string;
    signer: Signer;
    interface: {
        functions: { [name: string]: FunctionFragment | any };
    }
    [key: string]: ContractFunction | any;
}

export type InputComponentProps = {
    value?: any;
    placeholder?: GenericReactChild;
    onChange?: GenericChangeFunction;
    name?: string;
    disabled?: boolean;
    type?: string;
    fieldAbi?: ParamType;
}

export type InputTypeComponent = React.ComponentType<InputComponentProps | any>;
export interface ScannerLinkProps {
    scanUrl?: string;
    value?: string;
    label?: string;
    type?: 'address' | 'tx';
    shorten?: boolean;
    useBlockScan?: boolean;
    netId?: string;
    children?: GenericReactChild;
}

export type Network = {
    id: string;
    codename: string;
    name: string;
    coinSymbol: string;
    scan: string;
    rpcUrl: string;
    isTestnet: boolean;
}

export type FormattedError = {
    simple: string;
    detailed: string;
    code?: string;
}

export type SubmitError = {
    reason: string;
    message: string;
    error?: any;
    data?: any;
    code?: string | number;
}

export type FieldOnChange = (e: ChangeEvent<HTMLInputElement>, field: MethodField) => void;

interface FieldComponentsOptions {
    InputComponent?: InputTypeComponent;
    inputContainsLabel?: boolean;
    InputLabelComponent?: GenericComponent;
    InputContainerComponent?: GenericComponent;
    SubContainerComponent?: GenericComponent;
    ResultComponent?: GenericComponent;
}
export interface FieldOptions extends FieldComponentsOptions {
    id?: string;
    label?: GenericReactChild;
    required?: boolean;
    decimals?: number;
    placeholder?: GenericReactChild;
    onChange?: FieldOnChange;
}

export interface FieldsOptions { [key: string]: FieldOptions }
export interface MethodObjectOptions {
    contract: MinContract | Contract;
    title?: GenericReactChild;
    methodSignature: string;
    useSignerAddressAsDefault?: boolean;
    initialState?: {
        [key: string]: any;
    };
    initialStateGetters?: {
        [key: string]: string;
    };
    isSendMethod?: boolean;
    ethFields?: string[];
    hiddenFields?: string[];
    tokenFieldsMapping?: StringMap;
    fieldsOptions?: FieldsOptions;
}
export interface ContractMethodProps extends MethodObjectOptions, FieldComponentsOptions {
    isBtnDisabled?: boolean;
    btnLabel?: GenericReactChild;
    onLoad?: (isLoading: boolean, state: any) => any;
    onPending?: (state: any, interaction: TransactionResponse) => void;
    onSuccess?: (state: any, interaction: TransactionResponse | any, receipt?: ethers.providers.TransactionReceipt) => void;
    onFail?: (e: any, formattedError: FormattedError, state: any, interaction: TransactionResponse | any, receipt?: ethers.providers.TransactionReceipt) => void;
    HeaderComponent?: GenericComponent;
    BtnComponent?: GenericComponent;
    BtnContainerComponent?: GenericComponent;
    FieldsContainerComponent?: GenericComponent;
    ResultsContainerComponent?: GenericComponent;
    ContainerComponent?: GenericComponent;
    ScannerLinkComponent?: React.ComponentType<ScannerLinkProps>;
    ErrorContainerComponent?: GenericComponent;
    ErrorComponent?: GenericComponent;
    errorFormatter?: (error: SubmitError) => FormattedError;
    resultValueFormatter?: (field: MethodField, value: any, state: any) => any;
    detailedError?: boolean;
    collapsed?: boolean;
    enableCollapseOnClick?: boolean;
    enableErrorDetailsOnClick?: boolean;
    wording?: Partial<Wording>;
    isBtnOnly?: boolean;
    showTransactionLink?: boolean;
    children?: GenericReactChild;
    beforeFields?: GenericReactChild;
    afterFields?: GenericReactChild;
    beforeBtn?: GenericReactChild;
    afterBtn?: GenericReactChild;
}
export interface MethodItem {
    method: string;
    options: Partial<ContractMethodProps>;
}
export interface MethodsOptions {
    [key: string]: Partial<ContractMethodProps>;
}

export type MethodsType = (string | MethodItem)[];

export type ContractInteractorProps = {
    contract: MinContract | Contract;
    methods?: string[];
    excludeMethods?: string[];
    methodsOptions?: MethodsOptions;
    readOnlyFirst?: boolean;
    defaultMethodOptions?: Partial<ContractMethodProps>;
    ContractMethodComponent?: React.ComponentType<ContractMethodProps>;
}

export type Wording = {
    submit: GenericReactChild;
    approve: GenericReactChild;
    send: GenericReactChild;
    refresh: GenericReactChild;
    read: GenericReactChild;
    waiting: GenericReactChild;
    pending: GenericReactChild;
    success: GenericReactChild;
    failed: GenericReactChild;
    error: GenericReactChild;
    address: GenericReactChild;
    transaction: GenericReactChild;
    true: GenericReactChild;
    false: GenericReactChild;
    unsupportedNetwork: GenericReactChild;
    transactions: {
        success?: GenericReactChild;
        pending?: GenericReactChild;
        failed?: GenericReactChild;
    };
    errors: {
        [key: string]: GenericReactChild | undefined;
    };
    [key: string]: GenericReactChild | undefined | { [key: string]: GenericReactChild; };
}

export type CssProperties = { [key: string]: CSSInterpolation };

export enum StyledComponentsName {
    container = 'container',
    subcontainer = 'subcontainer',
    button = 'button',
    buttonContainer = 'buttonContainer',
    error = 'error',
    errorContainer = 'errorContainer',
    fieldsContainer = 'fieldsContainer',
    header = 'header',
    input = 'input',
    inputContainer = 'inputContainer',
    label = 'label',
    resultsContainer = 'resultsContainer',
}

export type CustomStyles = Partial<{
    [StyledComponentsName.container]: CssProperties;
    [StyledComponentsName.subcontainer]: CssProperties;
    [StyledComponentsName.button]: CssProperties;
    [StyledComponentsName.buttonContainer]: CssProperties;
    [StyledComponentsName.error]: CssProperties;
    [StyledComponentsName.errorContainer]: CssProperties;
    [StyledComponentsName.fieldsContainer]: CssProperties;
    [StyledComponentsName.header]: CssProperties;
    [StyledComponentsName.input]: CssProperties;
    [StyledComponentsName.inputContainer]: CssProperties;
    [StyledComponentsName.label]: CssProperties;
    [StyledComponentsName.resultsContainer]: CssProperties;
}>

export enum TxStatusList {
    pending = 'pending',
    failed = 'failed',
    success = 'success',
    null = '',
}

export type TxStatus = 'pending' | 'failed' | 'success' | '';

export type IconTheme = 'color' | 'white' | 'black';
export interface Preferences {
    wording?: Partial<Wording>;
    styles?: CustomStyles;
    defaultNetId?: string;
    defaultIconTheme?: IconTheme;
    additionalNetworks?: Network[];
}

export type InitParameters = {
    preferences?: Preferences;
}

export type SimpleFunctionAbi = {
    name: string;
    type: string;
    constant: boolean;
    payable: boolean;
    stateMutability: string;
    inputs: ParamType[];
    outputs?: ParamType[];
};
export class MethodObject {
    public name: string;
    public type: string;
    public constant: boolean;
    public payable: boolean;
    public stateMutability: string;
    public inputs: MethodField[];
    public outputs?: MethodField[];
    public parameters: MethodObjectOptions;
    public isReadOnly: boolean;
    public isSendMethod: boolean;
    public isPayable: boolean;
    public hasInputs: boolean;
    public hasVisibleInputs: boolean;
    public hasOutputs: boolean;
    public hasMultipleOutputs: boolean;

    constructor(abi: FunctionFragment, parameters: MethodObjectOptions) {
        const src = abi || PAYABLE_ABI;
        this.name = src.name;
        this.type = src.type;
        this.constant = src.constant;
        this.payable = src.payable;
        this.stateMutability = src.stateMutability;
        this.parameters = parameters;
        this.isReadOnly = isReadOnlyMethod(this.stateMutability);
        this.isSendMethod = !!parameters?.isSendMethod;
        this.isPayable = abi?.payable || !!parameters?.isSendMethod;

        const inputs = [...src.inputs];
        if (this.isPayable && !inputs.find(i => i.name === 'value')) {
            inputs.push(PAYABLE_ABI.inputs[0]);
        }

        this.inputs = inputs.map((c, index) => new MethodField(c, index, this));
        this.outputs = src.outputs?.map((c, index) => new MethodField(c, index, this, true));

        this.hasInputs = !!this?.inputs.length;
        this.hasOutputs = !!this?.outputs?.length;
        this.hasMultipleOutputs = !!abi?.outputs?.length && abi?.outputs?.length > 1;
        this.hasVisibleInputs = !!this?.inputs.filter(field => !parameters?.hiddenFields?.includes(field.statePath)).length;
    }

    public hasInvalidFields = (state: any, fields: MethodField[]): boolean => {
        if (!fields?.length) { return false }

        return !!fields
            .filter(input => input.type !== 'bool')
            .filter(input => input.isVisibleField)
            .find((input) => {
                return (input.required && !getDeep(input.statePath, state)) || this.hasInvalidFields(state, input.components)
            })
    }

    public initValues = async () => {
        const { contract, initialStateGetters, useSignerAddressAsDefault, initialState = {} } = this.parameters;
        const signerAd = await contract?.signer?.getAddress() || '';

        const values = {};

        for (const field of this.inputs) {
            const initialStateGetter = initialStateGetters ? contract[initialStateGetters[field.stateName]] : null;
            const shouldUseSignerAd = field.type === 'address' && useSignerAddressAsDefault;
            const defaultValue = field.isArray ? [] : field.isTuple ? {} : '';

            const initialValue = (initialState[field.stateName] || (initialStateGetter ? await initialStateGetter().catch(() => defaultValue) : defaultValue));

            const value = !initialValue && shouldUseSignerAd ? signerAd : initialValue;
            values[field.stateName] = field.isArray || field.isTuple ? value : (value?.toString ? value.toString() : value);
        }
        return values;
    }

    public submit = async (state: any) => {
        const { contract, ethFields, tokenFieldsMapping, methodSignature } = this.parameters;
        let interaction: TransactionResponse | any;

        if (this.isSendMethod) {
            interaction = await contract.signer.sendTransaction({
                ...state,
                to: state.to || contract.address,
                value: ethers.utils.parseEther(state.value || '0'),
            })
        }
        else {
            const args = await Promise.all(
                this.inputs
                    .filter(f => !this.isPayable || (f.stateName !== 'value' && this.isPayable))
                    .map(async (field) => {
                        if (field.type.includes('uint')) {
                            const decimals = field.decimals ?? await getDecimalForField(field, ethFields, tokenFieldsMapping);
                            return ethers.utils.parseUnits(state[field.stateName] || '0', decimals);
                        }
                        return state[field.stateName];
                    })
            );
            if (this.isPayable) {
                const overrides = {
                    value: ethers.utils.parseEther(state.value || '0'),
                };
                interaction = await contract[methodSignature](...args, overrides);
            } else {
                interaction = await contract[methodSignature](...args);
            }
        }
        return interaction;
    }
}
export class MethodField {
    public id: string;
    public name: string;
    public stateName: string;
    public statePath: string;
    public label: GenericReactChild;
    public type: string;
    public baseType: string;
    public inputType: string;
    public components: MethodField[];
    public arrayLength: number;
    public required: boolean;
    public isArray: boolean;
    public isTuple: boolean;
    public isVisibleField: boolean;
    public placeholder?: GenericReactChild;
    public onChange?: FieldOnChange;
    public decimals?: number;
    public options?: FieldOptions;

    public static fieldIndex = 0;

    constructor(param: ParamType, index: number, method: MethodObject, isOutput?: boolean, parent?: MethodField) {
        this.name = param.name;
        this.type = param.type;
        this.baseType = param.baseType;
        this.arrayLength = param.arrayLength;
        this.stateName = toStateName(param, index, isOutput);
        this.isArray = param.baseType === 'array';
        this.isTuple = param.baseType === 'tuple';
        this.statePath = this.isArray ? `${parent?.statePath || this.stateName}` : `${parent?.statePath ? parent?.statePath + '.' : ''}${this.stateName}`;
        this.components = param.components?.map((c, sub_index) => new MethodField(c, sub_index, method, isOutput, this));

        this.options = method.parameters?.fieldsOptions ? method.parameters?.fieldsOptions[this.statePath] : {};

        const ethFields = method.parameters?.ethFields || [];

        this.id = this.options?.id || `methField_${MethodField.fieldIndex++}`;
        this.label = this.options?.label;
        this.required = this.options?.required ?? ((method.isPayable && this.name === 'value') || isFieldAlwaysRequired(this));
        this.decimals = this.options?.decimals || (ethFields.includes(this.statePath) ? 18 : undefined);
        this.placeholder = this.options?.placeholder;
        this.onChange = this.options?.onChange;
        this.inputType = this.type === 'bool' ? 'checkbox' : 'text';
        this.isVisibleField = !method.parameters.hiddenFields?.length || !method.parameters.hiddenFields.includes(this.statePath);
    }
}