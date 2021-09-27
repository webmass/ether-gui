import { useEffect, useState, useMemo } from 'react';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import ContractField from './ContractField';
import ContractResult from './ContractResult';
import ScannerLink from '../Scanner/ScannerLink';
import { ContractMethodProps, FieldsOptions, FormattedError, MethodField, MethodObject, SubmitError, TxStatus, TxStatusList } from '../../types';
import StyledButton from '../common/StyledButton';
import StyledContainer from '../common/StyledContainer';
import StyledHeader from '../common/StyledHeader';
import StyledButtonContainer from '../common/StyledButtonContainer';
import StyledResultsContainer from '../common/StyledResultsContainer';
import StyledFieldsContainer from '../common/StyledFieldsContainer';
import StyledErrorContainer from '../common/StyledErrorContainer';
import StyledError from '../common/StyledError';
import ContractError from './ContractError';
import useWording from '../../hooks/useWording';
import { setDeep } from '../../utils';
import { ethers } from 'ethers';
import { formatValue } from '../../utils/index';

const BtnComponentDefault = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;

const errorFormatterDefault = (error: SubmitError): FormattedError => {
    const simple = error.error?.message || error?.data?.message || error.reason || error.message;
    const code = (error.error?.code || error?.data?.code || error.code || '').toString();
    return ({ simple, detailed: error.message || simple, code });
};

const resultValueFormatterDefault = (field: MethodField, value: any) => {
    return formatValue(field, value);
}

const emptyObject: any = {};
const noError: FormattedError = { simple: '', detailed: '' };

const ContractMethod = (props: ContractMethodProps) => {
    const {
        contract,
        title = '',
        methodSignature,
        useSignerAddressAsDefault = false,
        initialState = emptyObject,
        initialStateGetters,
        isSendMethod = false,
        ethFields,
        tokenFieldsMapping,
        hiddenFields,
        fieldsOptions = emptyObject as FieldsOptions,

        isBtnDisabled,
        btnLabel,
        InputComponent,
        inputContainsLabel,
        InputContainerComponent,
        InputLabelComponent,
        HeaderComponent = StyledHeader,
        BtnComponent = BtnComponentDefault,
        BtnContainerComponent = StyledButtonContainer,
        FieldsContainerComponent = StyledFieldsContainer,
        ResultComponent,
        ResultsContainerComponent = StyledResultsContainer,
        ContainerComponent = StyledContainer,
        SubContainerComponent,
        ErrorContainerComponent = StyledErrorContainer,
        ErrorComponent = StyledError,
        errorFormatter = errorFormatterDefault,
        ScannerLinkComponent = ScannerLink,
        detailedError,
        collapsed,
        enableCollapseOnClick = true,
        enableErrorDetailsOnClick = true,
        wording,
        isBtnOnly,
        children,
        beforeFields,
        afterFields,
        beforeBtn,
        afterBtn,
        showTransactionLink = true,
        resultValueFormatter = resultValueFormatterDefault,
        onLoad,
        onPending,
        onSuccess,
        onFail,
    } = props;

    const [state, setState] = useState(initialState);
    const [isInvalid, setIsInvalid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [outputResults, setOutputResults] = useState<any>([]);
    const [error, setError] = useState<FormattedError>(noError);
    const [transaction, setTransaction] = useState<TransactionResponse | null>(null);
    const [transactionStatus, setTransactionStatus] = useState<TxStatus>(TxStatusList.null);
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const _wording = useWording(wording);

    const functionInterface = contract?.interface.functions[methodSignature];

    const methodObj: MethodObject | undefined = useMemo(() => {
        return new MethodObject(functionInterface, {
            contract,
            title,
            hiddenFields,
            methodSignature,
            isSendMethod,
            useSignerAddressAsDefault,
            initialState,
            initialStateGetters,
            ethFields,
            tokenFieldsMapping,
            fieldsOptions,
        })
    }, [
        functionInterface,
        contract,
        title,
        hiddenFields,
        methodSignature,
        isSendMethod,
        useSignerAddressAsDefault,
        initialState,
        initialStateGetters,
        ethFields,
        tokenFieldsMapping,
        fieldsOptions,
    ]);

    const { isReadOnly, hasInputs, hasVisibleInputs, hasOutputs, hasMultipleOutputs } = methodObj;

    const checkValidity = () => {
        setIsInvalid(methodObj.hasInvalidFields(state, methodObj.inputs));
    }

    useEffect(() => {
        setIsCollapsed(collapsed);
    }, [collapsed]);

    useEffect(() => {
        checkValidity();
    }, [state]);

    useEffect(() => {
        if (onLoad) {
            onLoad(isLoading, state);
        }
    }, [isLoading]);

    useEffect(() => {
        let isMounted = true;
        const init = async () => {
            if (methodObj?.inputs) {
                const values = await methodObj.initValues();
                if (!isMounted) { return }
                setState(values);
                checkValidity();

                if (!hasInputs && hasOutputs && isReadOnly) handleSubmit();
            }
        }
        init();
        return () => {
            isMounted = false;
        }
    }, [contract, methodSignature, initialState, initialStateGetters, useSignerAddressAsDefault]);

    if (!methodObj) {
        console.warn(`No contract method "${methodSignature}"`);
        return <></>;
    }

    const handleSubmit = async () => {
        setError(noError);
        setIsLoading(true);
        setTransactionStatus(TxStatusList.null);
        setTransaction(null);

        let interaction: TransactionResponse | any;
        let receipt: ethers.providers.TransactionReceipt | undefined;

        const exec = async () => {
            interaction = await methodObj.submit(state);

            // transaction case =>
            if (interaction?.wait) {
                const tx = (interaction as TransactionResponse);
                setTransactionStatus(TxStatusList.pending);
                setTransaction(tx);
                if (onPending) {
                    onPending(state, tx);
                }

                receipt = await tx.wait();
                if (receipt.status === 0) {
                    setError(
                        errorFormatter({
                            reason: 'Transaction failed', message: 'transaction failed'
                        })
                    );
                }
            }
            else if (hasOutputs) {
                setOutputResults(hasMultipleOutputs ? interaction : [interaction]);
            }
        }

        try {
            await exec();
            setTransactionStatus(TxStatusList.success);
            try {
                if (onSuccess) onSuccess(state, interaction, receipt);
            } catch (e) {
                console.warn('Tx success but onSuccess function failed');
            }
        } catch (e: any) {
            const error = e as SubmitError;
            const formattedError = errorFormatter(error);

            setError(formattedError);
            setTransactionStatus(TxStatusList.failed);
            setOutputResults([]);
            if (onFail) onFail(e, formattedError, state, interaction, receipt);
        }

        setIsLoading(false);
    }

    const handleStateValue = (path: string, value: any) => {
        const newState = setDeep({ ...state }, path, value);
        setState(newState);
    }

    const inputs = methodObj.inputs
        .filter(field => field.isVisibleField)
        .map((field, i) => {
            return (
                <ContractField
                    key={i}
                    methodField={field}
                    handleStateValue={handleStateValue}
                    value={state[field.stateName]}
                    disabled={isLoading}
                    wording={_wording}
                    onChange={field.options?.onChange}
                    SubContainerComponent={field.options?.SubContainerComponent || SubContainerComponent}
                    InputComponent={field.options?.InputComponent || InputComponent}
                    inputContainsLabel={field.options?.inputContainsLabel || inputContainsLabel}
                    InputLabelComponent={field.options?.InputLabelComponent || InputLabelComponent}
                    InputContainerComponent={field.options?.InputContainerComponent || InputContainerComponent}
                />
            )
        });

    const outputs = methodObj.outputs?.map((field, index) => {
        const value = resultValueFormatter(field, outputResults[index], state);
        const resultComponent = field.options?.ResultComponent || ResultComponent || (field.type.startsWith('address') ? ScannerLinkComponent : undefined);

        return <ContractResult
            key={index}
            methodField={field}
            methodObj={methodObj}
            value={value}
            wording={_wording}
            ResultComponent={resultComponent}
        />;
    }) || null;

    const hasResults = !!outputResults.length;

    const label = title || _wording[methodSignature] || methodSignature;
    const buttonLabel = btnLabel || (isReadOnly ? _wording.read : isSendMethod ? _wording.send : _wording.submit);

    if (isReadOnly && !hasInputs) {
        return <>{outputs}</>;
    }

    const isBtnHidden = isLoading && transaction && showTransactionLink;

    const buttonZone = <BtnContainerComponent>
        {beforeBtn}
        {
            isBtnHidden ?
                null
                :
                <BtnComponent disabled={isBtnDisabled || isLoading || isInvalid} onClick={() => handleSubmit()}>
                    {isLoading ? (isReadOnly ? _wording.pending : transaction ? _wording.pending : _wording.waiting) : buttonLabel}
                </BtnComponent>
        }
        {afterBtn}
    </BtnContainerComponent>;

    if (isBtnOnly) { return buttonZone }

    const isBtnZoneVisible = beforeBtn || afterBtn || !isBtnHidden;

    const body = <>
        {children}

        {
            !hasVisibleInputs && !beforeFields && !afterFields ?
                null
                :
                <FieldsContainerComponent>{beforeFields}{inputs}{afterFields}</FieldsContainerComponent>
        }

        {
            (!hasOutputs || !hasResults) && !transaction ?
                null
                :
                <ResultsContainerComponent>
                    {!transaction ?
                        outputs
                        :
                        !showTransactionLink ? null : <ScannerLinkComponent value={transaction.hash} type="tx" label={_wording.transactions[transactionStatus]} />
                    }
                </ResultsContainerComponent>
        }

        {!error?.simple ?
            null :
            <ContractError
                error={error}
                showDetailedError={detailedError}
                enableErrorDetailsOnClick={enableErrorDetailsOnClick}
                wording={_wording}
                ErrorComponent={ErrorComponent}
                ErrorContainerComponent={ErrorContainerComponent}
            />
        }

        {
            isBtnZoneVisible ?  buttonZone : null
        }

    </>;

    const Header = ({ children }) => enableCollapseOnClick ?
        <HeaderComponent onClick={() => setIsCollapsed(!isCollapsed)}>{children}</HeaderComponent>
        :
        <HeaderComponent>{children}</HeaderComponent>;

    return (
        <ContainerComponent>
            <Header>{label}</Header>
            {isCollapsed ? null : body}
        </ContainerComponent>
    )
}

export default ContractMethod;