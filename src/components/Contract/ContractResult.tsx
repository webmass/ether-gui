import { GenericComponent, GenericReactChild, MethodObject, Wording } from '../../types';
import StyledResultsContainer from '../common/StyledResultsContainer';
import { MethodField } from '../../types/index';

const ResultComponentDefault = ({ children, methodField, methodObj, ...props }) => <span {...props} >{children}</span>;
const ResultLabelComponentDefault = ({ children, ...props }) => <label {...props}>{children}</label>;

type props = {
    methodField: MethodField;
    value: any;
    methodObj: MethodObject;
    wording: Partial<Wording>;
    label?: GenericReactChild;
    ResultComponent?: GenericComponent;
    ResultLabelComponent?: GenericComponent | null;
    ResultContainerComponent?: GenericComponent;
};

const ContractResult = ({
    methodField,
    value,
    label,
    methodObj,
    wording,
    ResultComponent = ResultComponentDefault,
    ResultLabelComponent = ResultLabelComponentDefault,
    ResultContainerComponent = StyledResultsContainer,
}: props) => {
    const methName = wording[methodObj.name] || methodObj.name;
    const type = wording[methodField.type] || methodField.type;
    const displayedValue = typeof value === 'string' ? wording[value] || value?.toString() : value;
    const resultLabel = label || methodField.label || (methodObj.isReadOnly && !methodObj.hasInputs ? `${methName} (${type}) : ` : `${methodField.stateName} : `);

    const results = methodField.isArray || methodField.isTuple ?
        <ul>
            {
                methodField.isArray ?
                    value?.map((v: any, i: number) => {
                        return <li key={i}>
                            <ResultComponent value={v} methodField={methodField} methodObj={methodObj}>
                                {v}
                            </ResultComponent>
                        </li>;
                    })
                    :
                    methodField.components.map((f, i) => {
                        return <li key={i}>
                            <ContractResult
                                label={f.label || `${f.name} : `}
                                methodField={f}
                                methodObj={methodObj}
                                value={value[f.name]}
                                wording={wording}
                                ResultComponent={ResultComponent}
                                ResultLabelComponent={ResultComponent}
                                ResultContainerComponent={ResultComponent}
                            />
                        </li>
                    })
            }
        </ul>
        :
        <ResultComponent value={value} methodField={methodField} methodObj={methodObj}>
            {displayedValue}
        </ResultComponent>

    return (
        <>
            <ResultContainerComponent>
                {
                    ResultLabelComponent ?
                        <ResultLabelComponent>
                            {resultLabel}
                        </ResultLabelComponent>
                        :
                        null
                }
                {results}
            </ResultContainerComponent>
        </>
    );
}

export default ContractResult;