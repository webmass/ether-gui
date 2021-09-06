import { InitParameters } from './types';
import config from './config';
import * as utils from './utils';
import * as ethers from 'ethers';
declare global {
    interface Window { ethereum: any; web3: any; }
}

const init = ({
    preferences,
}: InitParameters): void => {
    if(preferences){
        config.setPreferences(preferences);
    }
}

export { default as ScannerLink } from './components/Scanner/ScannerLink'

export { default as ContractInteractor } from './components/Contract/ContractInteractor'
export { default as ContractMethod } from './components/Contract/ContractMethod'

export { default as utils } from './utils'

export default {
    init,
    config,
    utils,
    ethers,
}

export {
    TxStatusList
} from './types';

export type {
    ContractInteractorProps,
    ContractMethodProps,
    GenericChangeFunction,
    GenericReactChild,
    GenericComponent,
    GenericClickEvent,
    CssProperties,
    CustomStyles,
    Wording,
    Network,
    ScannerLinkProps,
    InputComponentProps,
    InputTypeComponent,
    FieldOptions,
    MethodItem,
    MethodsOptions,
    MethodsType,
    TxStatus, IconTheme,
    Preferences,
    InitParameters,
    MethodField,
    MethodObject,
} from './types';

