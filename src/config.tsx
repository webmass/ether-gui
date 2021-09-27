import { BehaviorSubject } from 'rxjs';
import { DEFAULT_NETWORKS } from './constants';
import { CssProperties, Network, Wording, IconTheme } from './types';
import { toDecimals } from './utils';
import { Preferences } from './types/index';

const defaultWording: Wording = {
    submit: 'Submit',
    approve: 'Approve',
    send: 'Send',
    read: 'Read',
    refresh: 'Refresh',
    pending: 'Pending',
    waiting: 'Please confirm in wallet',
    success: 'Success',
    failed: 'Failed',
    error: 'Error',
    address: 'Address',
    transaction: 'transaction',
    true: 'yes',
    false: 'no',
    unsupportedNetwork: 'Unsupported Network',
    transactions: {
        pending: '⌛ Transaction pending...',
        success: '✅ Transaction success !',
        failed: '❌ Transaction failed !',
    },
    errors: {
        '4001': 'Action canceled',
        '-32000': 'Insufficient funds to cover spendings and / or gas fees',
    },
}

export const wording$ = new BehaviorSubject<Wording>(defaultWording);
export const customStyles$ = new BehaviorSubject<CssProperties>({});
export const networks$ = new BehaviorSubject<Network[]>(DEFAULT_NETWORKS);
export const defaultNetId$ = new BehaviorSubject<string>('1');
export const defaultIconTheme$ = new BehaviorSubject<IconTheme>('color');

export const getDefaultIconTheme = (): IconTheme => defaultIconTheme$.getValue();
export const setDefaultIconTheme = (theme: IconTheme): void => {
    defaultIconTheme$.next(theme);
}

export const getDefaultNetId = (): string => defaultNetId$.getValue();
export const setDefaultNetId = (netId: string): void => {
    defaultNetId$.next(toDecimals(netId).toString());
}

export const setNetworks = (newNetworks: Network[]) => {
    networks$.next(newNetworks);
}

export const getNetworks = (): Network[] => networks$.getValue();

export const addNetworks = (newNetworks: Network[]) => {
    networks$.next([...networks$.getValue(), ...newNetworks]);
}

export const setWording = (newTranslations: Partial<Wording>) => {
    wording$.next({ ...defaultWording, ...newTranslations });
}

export const getWording = (): Wording => {
    return wording$.getValue();
}

export const getStyles = (): CssProperties => customStyles$.getValue();

export const extendStyles = (customStyles: CssProperties) => {
    customStyles$.next({ ...customStyles$.getValue(), ...customStyles });
}

export const setStyles = (customStyles: CssProperties) => {
    customStyles$.next({ ...customStyles });
}

export const setPreferences = ({
    additionalNetworks,
    wording,
    styles,
    defaultNetId,
    defaultIconTheme,
}: Preferences) => {
    if(additionalNetworks) {
        addNetworks(additionalNetworks);
    }
    if (wording) {
        setWording(wording);
    }
    if (styles) {
        setStyles(styles);
    }
    if(defaultNetId) {
        setDefaultNetId(defaultNetId);
    }
    if(defaultIconTheme) {
        setDefaultIconTheme(defaultIconTheme);
    }
}

export default {
    wording$,
    customStyles$,
    setPreferences,
    setWording,
    getWording,
    extendStyles,
    setStyles,
    getStyles,
    getNetworks,
    setNetworks,
    addNetworks,
    getDefaultNetId,
    setDefaultNetId,
    getDefaultIconTheme,
    setDefaultIconTheme,
}



