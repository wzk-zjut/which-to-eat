import { provide, inject } from 'vue';
import { Func, isArray, isUndef } from '../utils';

const TOKEN = Symbol();
const RESULT = Symbol();
const SINGLETON = Symbol();
const IS_PROVIDER = Symbol();

export type Tokens = { [TOKEN]?: Symbol;[RESULT]?: any;[SINGLETON]?: boolean };
export type Infer<T extends TProvider> = T extends Constructor<infer P>
    ? P
    : T extends Func<infer V>
    ? V
    : never;

type SingleParams<T> = T extends [any] ? (T extends [any[]] ? T : T[0] | T) : T;
export type InterArgs<T extends TProvider> = T extends Constructor<any, infer P>
    ? SingleParams<P>
    : T extends Func<any, infer V>
    ? SingleParams<V>
    : void;

export type TProvider = (Func | Constructor) & Tokens;
export interface Constructor<T extends object = Record<string, any>, A extends any[] = any[]> {
    new(...args: A): T;
}

interface ProviderOpts {
    singleton?: boolean;
}

const isConstructor = (provider: TProvider): provider is Constructor =>
    provider.prototype?.[IS_PROVIDER];

const initProvider = (provider: TProvider, args?: any[]) => {
    args = isArray(args) ? args : [args];

    return isConstructor(provider) ? new provider(...args) : provider(...args);
};

export const useProvider = <T extends TProvider>(
    provider: T,
    args?: InterArgs<T>,
    { singleton = true }: ProviderOpts = {}
): Infer<T> => {
    if (!provider[TOKEN]) {
        provider[TOKEN] = Symbol(provider.name);
    }

    if (singleton && provider[RESULT] !== void 0) return provider[RESULT];

    const result = initProvider(provider, args);

    if (singleton) {
        provider[SINGLETON] = true;
        provider[RESULT] = result;
    }

    provide(provider[TOKEN]!, result);

    return result;
};

export const useInjector = <T extends TProvider>(provider: T) => {
    const token = provider[TOKEN];
    if (!token) {
        throw new ReferenceError(`未进行useProvider`);
    }

    const singleton = provider[SINGLETON];
    const result = singleton ? provider[RESULT] : inject(token);
    if (isUndef(result)) {
        throw new ReferenceError(`未在Provider的子孙组件中使用`);
    }

    return result as Infer<T>;
};

export const Provider = (function () { } as unknown) as { new(): {} };
Provider.prototype[IS_PROVIDER] = true;
