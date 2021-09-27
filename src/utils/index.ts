import { ADDRESS_ZERO, basicERC20Abi, BLOCK_SCAN } from './../constants';
import { GenericReactChild, MethodField, Network, StringMap } from '../types';
import { ethers, Contract } from 'ethers';
import { getNetworks, getWording } from '../config';
import { ParamType } from 'ethers/lib/utils';

export const toHexa = (value: string | number): string => ethers.utils.hexValue(Number(value));

export const toDecimals = (value: string | number): number => {
    const radix = ethers.utils.isHexString(value.toString()) ? 16 : 10;
    return parseInt(value?.toString(), radix);
}

export const formatAddr = (addr: string, leftLength = 4, rightLength = 4): string => {
    if (typeof addr !== 'string' || !addr) return '';
    return `${addr.slice(0, leftLength)}...${addr.slice(-rightLength)}`.toUpperCase();
};

export const getNetwork = (id: string | number): Network | undefined => {
    const decimalId = toDecimals(id).toString();
    return getNetworks().find(net => net.id === decimalId);
}

export const getNameFromNetVersion = (
    id: string | number,
): GenericReactChild => {
    const network = getNetwork(id);
    return network?.name || getWording().unsupportedNetwork;
}

export const getScanner = (id: string | number): string => id ? (getNetwork(id)?.scan || '') : BLOCK_SCAN;

export const getNativeCoinSymbol = (id: string | number): string => getNetwork(id)?.coinSymbol || '';

export const isReadOnlyMethod = (type = ''): boolean => ['view', 'pure'].includes(type);

export const isNativeCoin = (assetAd: string): boolean => !assetAd || assetAd === ADDRESS_ZERO;

export const setDeep = (obj: any, path: string | string[], value: any): any => {
    const paths = Array.isArray(path) ? path : ((path||'null').toString().match(/[^.[\]]+/g) || []);
    const last = paths[0];
    const isArray = /^[0-9]+/.test(last);

    const inputObj = obj === null ? (isArray ? [] : {}) : isArray ? [ ...obj] : { ...obj };

    if (paths.length === 0) {
        return inputObj;
    }

    if (paths.length === 1) {
        inputObj[last] = value;
        return isArray ? [...inputObj] : { ...inputObj };
    }

    const [currentPath, ...rest] = paths;
    const currentNode = inputObj[currentPath];

    const childNode = setDeep(currentNode, rest, value);
 

    return { ...inputObj, [currentPath]: childNode };
};

export const getDeep = (path: string, obj: Object, separator = '.') => {
    var properties = path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export const isFieldAlwaysRequired = (field: MethodField): boolean => {
    const solNumberReg = /^u?int*/;
    return solNumberReg.test(field.type);
}

export const formatValue = (field: MethodField, value: any, decimals?: number): any => {
    if(field.baseType === 'tuple') {
        return value;
    } else if(field.baseType === 'array') {
        return value;
    } else if(field.baseType.startsWith('uint')){
        return ethers.utils.formatUnits(value||'0', decimals ?? (field.decimals || 0));
    } else {
        return value?.toString() || '';
    }
}

export const toStateName = (field: ParamType | MethodField, index: number, isOutput?: boolean): string => {
    const prefix = isOutput ? 'output_' : 'input_';
    return field.name || `${prefix}${index}`;
};

export const getDecimalForField = async (field: MethodField, ethFields: string[] = [], tokenFieldsMapping: StringMap = {}): Promise<number> => {
    if(ethFields?.includes(field.statePath)){
        return 18;
    }
    else if (tokenFieldsMapping[field.statePath]) {
        let decimals: number;
        try {
            const tokenContract = new Contract(tokenFieldsMapping[field.statePath], basicERC20Abi, window.web3?.currentProvider);
            decimals = await tokenContract.decimals().catch(() => 18);
        } catch (e) {
            decimals = 18;
        }
        return decimals;
    } else {
        return 0;
    }
}

export default {
    toHexa,
    toDecimals,
    formatAddr,
    getNetwork,
    getNameFromNetVersion,
    getScanner,
    getNativeCoinSymbol,
    isReadOnlyMethod,
    setDeep,
    isFieldAlwaysRequired,
    toStateName,
}