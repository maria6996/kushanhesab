import * as vue from 'vue';
import { PropType, JSXComponent, ComputedRef, Ref, nextTick } from 'vue';

declare const block: readonly ["top", "bottom"];
declare const inline: readonly ["start", "end", "left", "right"];
declare type Tblock = typeof block[number];
declare type Tinline = typeof inline[number];
declare type Anchor = Tblock | Tinline | 'center' | 'center center' | `${Tblock} ${Tinline | 'center'}` | `${Tinline} ${Tblock | 'center'}`;

declare function deepEqual(a: any, b: any): boolean;
declare type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
declare type EventProp<T = (...args: any[]) => any> = T | T[];
declare const EventProp: PropType<EventProp<(...args: any[]) => any>>;

interface LoaderSlotProps {
    color: string | undefined;
    isActive: boolean;
}

declare type IconValue = string | JSXComponent;
declare const IconValue: PropType<IconValue>;

declare type Density = null | 'default' | 'comfortable' | 'compact';

declare type ValidationResult = string | boolean;
declare type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>);

interface VInputSlot {
    id: ComputedRef<string>;
    isDirty: ComputedRef<boolean>;
    isDisabled: ComputedRef<boolean>;
    isReadonly: ComputedRef<boolean>;
    isPristine: Ref<boolean>;
    isValid: ComputedRef<boolean | null>;
    isValidating: Ref<boolean>;
    reset: () => void;
    resetValidation: () => void;
    validate: () => void;
}

interface DefaultInputSlot {
    isActive: Ref<boolean>;
    isFocused: Ref<boolean>;
    controlRef: Ref<HTMLElement | undefined>;
    focus: () => void;
    blur: () => void;
}

interface ScrollStrategyData {
    root: Ref<HTMLElement | undefined>;
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    updateLocation: Ref<((e: Event) => void) | undefined>;
}
declare type ScrollStrategyFn = (data: ScrollStrategyData, props: StrategyProps$1) => void;
declare const scrollStrategies: {
    none: null;
    close: typeof closeScrollStrategy;
    block: typeof blockScrollStrategy;
    reposition: typeof repositionScrollStrategy;
};
interface StrategyProps$1 {
    scrollStrategy: keyof typeof scrollStrategies | ScrollStrategyFn;
    contained: boolean | undefined;
}
declare function closeScrollStrategy(data: ScrollStrategyData): void;
declare function blockScrollStrategy(data: ScrollStrategyData, props: StrategyProps$1): void;
declare function repositionScrollStrategy(data: ScrollStrategyData): void;

interface LocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>;
    activatorEl: Ref<HTMLElement | undefined>;
    isActive: Ref<boolean>;
    isRtl: Ref<boolean>;
}
declare type LocationStrategyFn = (data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>) => undefined | {
    updateLocation: (e: Event) => void;
};
declare const locationStrategies: {
    static: typeof staticLocationStrategy;
    connected: typeof connectedLocationStrategy;
};
interface StrategyProps {
    locationStrategy: keyof typeof locationStrategies | LocationStrategyFn;
    location: Anchor;
    origin: Anchor | 'auto' | 'overlap';
    offset?: number | string | number[];
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
}
declare function staticLocationStrategy(): void;
declare function connectedLocationStrategy(data: LocationStrategyData, props: StrategyProps, contentStyles: Ref<Record<string, string>>): {
    updateLocation: () => void;
};

interface InternalItem<T = any> {
    title: string;
    value: any;
    props: {
        [key: string]: any;
        title: string;
        value: any;
    };
    children?: InternalItem<T>[];
    raw: T;
}

/**
 * - match without highlight
 * - single match (index), length already known
 * - single match (start, end)
 * - multiple matches (start, end), probably shouldn't overlap
 */
declare type FilterMatch = boolean | number | [number, number] | [number, number][];
declare type FilterFunction = (value: string, query: string, item?: any) => FilterMatch;
declare type FilterKeyFunctions = Record<string, FilterFunction>;
declare type FilterKeys = string | string[];
declare type FilterMode = 'some' | 'every' | 'union' | 'intersection';

declare type Primitive = string | number | boolean | symbol;
declare type Val<T, ReturnObject extends boolean> = T extends Primitive ? T : (ReturnObject extends true ? T : any);
declare type Value<T, ReturnObject extends boolean, Multiple extends boolean> = Multiple extends true ? readonly Val<T, ReturnObject>[] : Val<T, ReturnObject>;
declare const VAutocomplete: {
    new (...args: any[]): {
        $: vue.ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            messages: string | string[];
            noDataText: string;
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: SelectItemKey;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: (string & {}) | FilterKeys;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                });
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: vue.PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            messages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            counter: vue.PropType<string | number | true>;
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: vue.PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: vue.PropType<IconValue>;
            appendIcon: vue.PropType<IconValue>;
            clearIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: vue.PropType<IconValue>;
            'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: vue.PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: vue.PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: vue.PropType<(value: any) => number>;
            items: {
                type: vue.PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: vue.PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: vue.PropType<SelectItemKey>;
                default: SelectItemKey;
            };
            itemProps: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: vue.PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    }) | {
                        component: vue.DefineComponent<{
                            target: vue.PropType<HTMLElement>;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                            target: vue.PropType<HTMLElement>;
                        }>>, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: string | number;
                    openDelay: string | number;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined);
                    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: string | boolean;
                }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
                    offset: vue.PropType<string | number | number[] | undefined>;
                    location: {
                        type: vue.PropType<Anchor>;
                        default: string;
                    };
                    origin: {
                        type: vue.PropType<"auto" | Anchor | "overlap">;
                        default: string;
                    };
                    height: (StringConstructor | NumberConstructor)[];
                    width: (StringConstructor | NumberConstructor)[];
                    maxHeight: (StringConstructor | NumberConstructor)[];
                    maxWidth: (StringConstructor | NumberConstructor)[];
                    minHeight: (StringConstructor | NumberConstructor)[];
                    minWidth: (StringConstructor | NumberConstructor)[];
                    transition: Omit<{
                        type: vue.PropType<string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        })>;
                        default: string;
                        validator: (val: unknown) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        }) | {
                            component: vue.DefineComponent<{
                                target: vue.PropType<HTMLElement>;
                            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                                target: vue.PropType<HTMLElement>;
                            }>>, {}>;
                        }>;
                        default: string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        }) | {
                            component: vue.DefineComponent<{
                                target: vue.PropType<HTMLElement>;
                            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                                target: vue.PropType<HTMLElement>;
                            }>>, {}>;
                        };
                    };
                    zIndex: {
                        type: (StringConstructor | NumberConstructor)[];
                        default: number;
                    };
                    eager: BooleanConstructor;
                    disabled: BooleanConstructor;
                    theme: StringConstructor;
                    contentClass: null;
                    modelValue: BooleanConstructor;
                    activator: vue.PropType<string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined>;
                    closeDelay: {
                        type: vue.PropType<string | number>;
                        default: string | number;
                    };
                    openDelay: {
                        type: vue.PropType<string | number>;
                        default: string | number;
                    };
                    activatorProps: {
                        type: vue.PropType<Record<string, any>>;
                        default: () => {};
                    };
                    openOnClick: {
                        type: BooleanConstructor;
                        default: undefined;
                    };
                    openOnHover: BooleanConstructor;
                    openOnFocus: {
                        type: BooleanConstructor;
                        default: undefined;
                    };
                    closeOnContentClick: {
                        type: vue.PropType<boolean>;
                        default: boolean;
                    };
                    locationStrategy: Omit<{
                        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined)>;
                        default: string;
                        validator: (val: any) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined)>;
                        default: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined);
                    };
                    scrollStrategy: Omit<{
                        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                        default: string;
                        validator: (val: any) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                        default: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                    };
                    closeOnBack: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    contained: BooleanConstructor;
                    contentProps: null;
                    noClickAnimation: BooleanConstructor;
                    persistent: BooleanConstructor;
                    scrim: Omit<{
                        type: (StringConstructor | BooleanConstructor)[];
                        default: boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<string | boolean>;
                        default: string | boolean;
                    };
                    attach: vue.PropType<string | boolean | Element>;
                    id: StringConstructor;
                }, "$children" | "v-slots" | "v-slot:default" | "v-slot:activator">>> & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim"> & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                }>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: vue.PropType<FilterFunction>;
            customKeyFilter: vue.PropType<FilterKeyFunctions>;
            filterKeys: {
                type: vue.PropType<(string & {}) | FilterKeys>;
                default: (string & {}) | FilterKeys;
            };
            filterMode: {
                type: vue.PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            search: StringConstructor;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "onUpdate:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: any) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "reverse" | "type" | "error" | "active" | "direction" | "transition" | "menu" | "autofocus" | "eager" | "disabled" | "readonly" | "messages" | "noDataText" | "density" | "variant" | "clearIcon" | "focused" | "errorMessages" | "maxErrors" | "rules" | "clearable" | "persistentClear" | "singleLine" | "persistentHint" | "persistentPlaceholder" | "persistentCounter" | "valueComparator" | "itemTitle" | "itemValue" | "itemChildren" | "itemProps" | "chips" | "closableChips" | "hideNoData" | "hideSelected" | "menuIcon" | "openOnClear" | "filterMode" | "noFilter" | "filterKeys">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: vue.Slot | undefined;
        }>;
        $root: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "update:menu", val: boolean) => void) & ((event: "update:search", val: any) => void);
        $el: any;
        $options: vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
            transition: Omit<{
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                });
            };
            reverse: BooleanConstructor;
            type: {
                type: StringConstructor;
                default: string;
            };
            error: BooleanConstructor;
            id: StringConstructor;
            active: BooleanConstructor;
            name: StringConstructor;
            color: StringConstructor;
            direction: {
                type: vue.PropType<"horizontal" | "vertical">;
                default: string;
                validator: (v: any) => boolean;
            };
            loading: (StringConstructor | BooleanConstructor)[];
            label: StringConstructor;
            prefix: StringConstructor;
            autofocus: BooleanConstructor;
            disabled: BooleanConstructor;
            readonly: BooleanConstructor;
            placeholder: StringConstructor;
            theme: StringConstructor;
            messages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            counter: vue.PropType<string | number | true>;
            density: {
                type: vue.PropType<Density>;
                default: string;
                validator: (v: any) => boolean;
            };
            variant: {
                type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
                default: string;
                validator: (v: any) => boolean;
            };
            modelValue: {
                type: vue.PropType<any>;
                default: any;
            };
            bgColor: StringConstructor;
            prependIcon: vue.PropType<IconValue>;
            appendIcon: vue.PropType<IconValue>;
            clearIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            prependInnerIcon: vue.PropType<IconValue>;
            'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
            focused: BooleanConstructor;
            validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
            errorMessages: {
                type: vue.PropType<string | string[]>;
                default: () => never[];
            };
            maxErrors: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            rules: {
                type: vue.PropType<ValidationRule[]>;
                default: () => never[];
            };
            hideDetails: vue.PropType<boolean | "auto">;
            clearable: BooleanConstructor;
            persistentClear: BooleanConstructor;
            singleLine: BooleanConstructor;
            hint: StringConstructor;
            persistentHint: BooleanConstructor;
            persistentPlaceholder: BooleanConstructor;
            persistentCounter: BooleanConstructor;
            suffix: StringConstructor;
            counterValue: vue.PropType<(value: any) => number>;
            items: {
                type: vue.PropType<any[]>;
                default: () => never[];
            };
            itemTitle: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemValue: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            itemChildren: Omit<{
                type: vue.PropType<SelectItemKey>;
                default: string;
            }, "type" | "default"> & {
                type: vue.PropType<SelectItemKey>;
                default: SelectItemKey;
            };
            itemProps: {
                type: vue.PropType<SelectItemKey>;
                default: string;
            };
            returnObject: BooleanConstructor;
            chips: BooleanConstructor;
            closableChips: BooleanConstructor;
            eager: BooleanConstructor;
            hideNoData: BooleanConstructor;
            hideSelected: BooleanConstructor;
            menu: BooleanConstructor;
            menuIcon: {
                type: vue.PropType<IconValue>;
                default: string;
            };
            menuProps: {
                type: vue.PropType<Partial<{
                    location: Anchor;
                    origin: "auto" | Anchor | "overlap";
                    transition: string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    }) | {
                        component: vue.DefineComponent<{
                            target: vue.PropType<HTMLElement>;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                            target: vue.PropType<HTMLElement>;
                        }>>, {}>;
                    };
                    zIndex: string | number;
                    eager: boolean;
                    disabled: boolean;
                    modelValue: boolean;
                    closeDelay: string | number;
                    openDelay: string | number;
                    activatorProps: Record<string, any>;
                    openOnClick: boolean;
                    openOnHover: boolean;
                    openOnFocus: boolean;
                    closeOnContentClick: boolean;
                    locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined);
                    scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                    closeOnBack: boolean;
                    contained: boolean;
                    noClickAnimation: boolean;
                    persistent: boolean;
                    scrim: string | boolean;
                }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
                    offset: vue.PropType<string | number | number[] | undefined>;
                    location: {
                        type: vue.PropType<Anchor>;
                        default: string;
                    };
                    origin: {
                        type: vue.PropType<"auto" | Anchor | "overlap">;
                        default: string;
                    };
                    height: (StringConstructor | NumberConstructor)[];
                    width: (StringConstructor | NumberConstructor)[];
                    maxHeight: (StringConstructor | NumberConstructor)[];
                    maxWidth: (StringConstructor | NumberConstructor)[];
                    minHeight: (StringConstructor | NumberConstructor)[];
                    minWidth: (StringConstructor | NumberConstructor)[];
                    transition: Omit<{
                        type: vue.PropType<string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        })>;
                        default: string;
                        validator: (val: unknown) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        }) | {
                            component: vue.DefineComponent<{
                                target: vue.PropType<HTMLElement>;
                            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                                target: vue.PropType<HTMLElement>;
                            }>>, {}>;
                        }>;
                        default: string | boolean | (vue.TransitionProps & {
                            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                        }) | {
                            component: vue.DefineComponent<{
                                target: vue.PropType<HTMLElement>;
                            }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                                target: vue.PropType<HTMLElement>;
                            }>>, {}>;
                        };
                    };
                    zIndex: {
                        type: (StringConstructor | NumberConstructor)[];
                        default: number;
                    };
                    eager: BooleanConstructor;
                    disabled: BooleanConstructor;
                    theme: StringConstructor;
                    contentClass: null;
                    modelValue: BooleanConstructor;
                    activator: vue.PropType<string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined>;
                    closeDelay: {
                        type: vue.PropType<string | number>;
                        default: string | number;
                    };
                    openDelay: {
                        type: vue.PropType<string | number>;
                        default: string | number;
                    };
                    activatorProps: {
                        type: vue.PropType<Record<string, any>>;
                        default: () => {};
                    };
                    openOnClick: {
                        type: BooleanConstructor;
                        default: undefined;
                    };
                    openOnHover: BooleanConstructor;
                    openOnFocus: {
                        type: BooleanConstructor;
                        default: undefined;
                    };
                    closeOnContentClick: {
                        type: vue.PropType<boolean>;
                        default: boolean;
                    };
                    locationStrategy: Omit<{
                        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined)>;
                        default: string;
                        validator: (val: any) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined)>;
                        default: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                            updateLocation: (e: Event) => void;
                        } | undefined);
                    };
                    scrollStrategy: Omit<{
                        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                        default: string;
                        validator: (val: any) => boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                        default: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                    };
                    closeOnBack: {
                        type: BooleanConstructor;
                        default: boolean;
                    };
                    contained: BooleanConstructor;
                    contentProps: null;
                    noClickAnimation: BooleanConstructor;
                    persistent: BooleanConstructor;
                    scrim: Omit<{
                        type: (StringConstructor | BooleanConstructor)[];
                        default: boolean;
                    }, "type" | "default"> & {
                        type: vue.PropType<string | boolean>;
                        default: string | boolean;
                    };
                    attach: vue.PropType<string | boolean | Element>;
                    id: StringConstructor;
                }, "$children" | "v-slots" | "v-slot:default" | "v-slot:activator">>> & {
                    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
                } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim"> & {
                    $children?: {} | vue.VNodeChild | {
                        default?: ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    };
                    'v-slots'?: {
                        default?: false | ((args_0: {
                            isActive: vue.Ref<boolean>;
                        }) => vue.VNodeChild) | undefined;
                        activator?: false | ((args_0: {
                            isActive: boolean;
                            props: Record<string, any>;
                        }) => vue.VNodeChild) | undefined;
                    } | undefined;
                } & {
                    "v-slot:default"?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    "v-slot:activator"?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                }>;
            };
            multiple: BooleanConstructor;
            noDataText: {
                type: StringConstructor;
                default: string;
            };
            openOnClear: BooleanConstructor;
            valueComparator: {
                type: vue.PropType<typeof deepEqual>;
                default: typeof deepEqual;
            };
            customFilter: vue.PropType<FilterFunction>;
            customKeyFilter: vue.PropType<FilterKeyFunctions>;
            filterKeys: {
                type: vue.PropType<(string & {}) | FilterKeys>;
                default: (string & {}) | FilterKeys;
            };
            filterMode: {
                type: vue.PropType<FilterMode>;
                default: string;
            };
            noFilter: BooleanConstructor;
            search: StringConstructor;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "onUpdate:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
            "onUpdate:menu"?: ((val: boolean) => any) | undefined;
            "onUpdate:search"?: ((val: any) => any) | undefined;
        }, {
            isFocused: vue.Ref<boolean>;
            isPristine: vue.Ref<boolean>;
            menu: vue.Ref<boolean> & {
                readonly externalValue: boolean;
            };
            search: vue.Ref<string | undefined> & {
                readonly externalValue: string | undefined;
            };
            filteredItems: vue.Ref<InternalItem<any>[]>;
            select: (item: InternalItem) => void;
        } & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
            'update:search': (val: any) => boolean;
            'update:modelValue': (val: any) => boolean;
            'update:menu': (val: boolean) => boolean;
        }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "update:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
            reverse: boolean;
            type: string;
            error: boolean;
            active: boolean;
            direction: "horizontal" | "vertical";
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
            menu: boolean;
            autofocus: boolean;
            eager: boolean;
            disabled: boolean;
            readonly: boolean;
            messages: string | string[];
            noDataText: string;
            density: Density;
            variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
            clearIcon: IconValue;
            focused: boolean;
            errorMessages: string | string[];
            maxErrors: string | number;
            rules: ValidationRule[];
            clearable: boolean;
            persistentClear: boolean;
            singleLine: boolean;
            persistentHint: boolean;
            persistentPlaceholder: boolean;
            persistentCounter: boolean;
            valueComparator: typeof deepEqual;
            itemTitle: SelectItemKey;
            itemValue: SelectItemKey;
            itemChildren: SelectItemKey;
            itemProps: SelectItemKey;
            chips: boolean;
            closableChips: boolean;
            hideNoData: boolean;
            hideSelected: boolean;
            menuIcon: IconValue;
            openOnClear: boolean;
            filterMode: FilterMode;
            noFilter: boolean;
            filterKeys: (string & {}) | FilterKeys;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: vue.DebuggerEvent) => void) | ((e: vue.DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof nextTick;
        $watch(source: string | Function, cb: Function, options?: vue.WatchOptions<boolean> | undefined): vue.WatchStopHandle;
    } & Readonly<vue.ExtractPropTypes<Omit<{
        transition: Omit<{
            type: vue.PropType<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            default: string;
            validator: (val: unknown) => boolean;
        }, "type" | "default"> & {
            type: vue.PropType<string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            })>;
            default: string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            });
        };
        reverse: BooleanConstructor;
        type: {
            type: StringConstructor;
            default: string;
        };
        error: BooleanConstructor;
        id: StringConstructor;
        active: BooleanConstructor;
        name: StringConstructor;
        color: StringConstructor;
        direction: {
            type: vue.PropType<"horizontal" | "vertical">;
            default: string;
            validator: (v: any) => boolean;
        };
        loading: (StringConstructor | BooleanConstructor)[];
        label: StringConstructor;
        prefix: StringConstructor;
        autofocus: BooleanConstructor;
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        placeholder: StringConstructor;
        theme: StringConstructor;
        messages: {
            type: vue.PropType<string | string[]>;
            default: () => never[];
        };
        counter: vue.PropType<string | number | true>;
        density: {
            type: vue.PropType<Density>;
            default: string;
            validator: (v: any) => boolean;
        };
        variant: {
            type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
            default: string;
            validator: (v: any) => boolean;
        };
        modelValue: {
            type: vue.PropType<any>;
            default: any;
        };
        bgColor: StringConstructor;
        prependIcon: vue.PropType<IconValue>;
        appendIcon: vue.PropType<IconValue>;
        clearIcon: {
            type: vue.PropType<IconValue>;
            default: string;
        };
        prependInnerIcon: vue.PropType<IconValue>;
        'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
        'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
        focused: BooleanConstructor;
        validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
        errorMessages: {
            type: vue.PropType<string | string[]>;
            default: () => never[];
        };
        maxErrors: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        rules: {
            type: vue.PropType<ValidationRule[]>;
            default: () => never[];
        };
        hideDetails: vue.PropType<boolean | "auto">;
        clearable: BooleanConstructor;
        persistentClear: BooleanConstructor;
        singleLine: BooleanConstructor;
        hint: StringConstructor;
        persistentHint: BooleanConstructor;
        persistentPlaceholder: BooleanConstructor;
        persistentCounter: BooleanConstructor;
        suffix: StringConstructor;
        counterValue: vue.PropType<(value: any) => number>;
        items: {
            type: vue.PropType<any[]>;
            default: () => never[];
        };
        itemTitle: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        itemValue: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        itemChildren: Omit<{
            type: vue.PropType<SelectItemKey>;
            default: string;
        }, "type" | "default"> & {
            type: vue.PropType<SelectItemKey>;
            default: SelectItemKey;
        };
        itemProps: {
            type: vue.PropType<SelectItemKey>;
            default: string;
        };
        returnObject: BooleanConstructor;
        chips: BooleanConstructor;
        closableChips: BooleanConstructor;
        eager: BooleanConstructor;
        hideNoData: BooleanConstructor;
        hideSelected: BooleanConstructor;
        menu: BooleanConstructor;
        menuIcon: {
            type: vue.PropType<IconValue>;
            default: string;
        };
        menuProps: {
            type: vue.PropType<Partial<{
                location: Anchor;
                origin: "auto" | Anchor | "overlap";
                transition: string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                }) | {
                    component: vue.DefineComponent<{
                        target: vue.PropType<HTMLElement>;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                        target: vue.PropType<HTMLElement>;
                    }>>, {}>;
                };
                zIndex: string | number;
                eager: boolean;
                disabled: boolean;
                modelValue: boolean;
                closeDelay: string | number;
                openDelay: string | number;
                activatorProps: Record<string, any>;
                openOnClick: boolean;
                openOnHover: boolean;
                openOnFocus: boolean;
                closeOnContentClick: boolean;
                locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined);
                scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                closeOnBack: boolean;
                contained: boolean;
                noClickAnimation: boolean;
                persistent: boolean;
                scrim: string | boolean;
            }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
                offset: vue.PropType<string | number | number[] | undefined>;
                location: {
                    type: vue.PropType<Anchor>;
                    default: string;
                };
                origin: {
                    type: vue.PropType<"auto" | Anchor | "overlap">;
                    default: string;
                };
                height: (StringConstructor | NumberConstructor)[];
                width: (StringConstructor | NumberConstructor)[];
                maxHeight: (StringConstructor | NumberConstructor)[];
                maxWidth: (StringConstructor | NumberConstructor)[];
                minHeight: (StringConstructor | NumberConstructor)[];
                minWidth: (StringConstructor | NumberConstructor)[];
                transition: Omit<{
                    type: vue.PropType<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    })>;
                    default: string;
                    validator: (val: unknown) => boolean;
                }, "type" | "default"> & {
                    type: vue.PropType<string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    }) | {
                        component: vue.DefineComponent<{
                            target: vue.PropType<HTMLElement>;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                            target: vue.PropType<HTMLElement>;
                        }>>, {}>;
                    }>;
                    default: string | boolean | (vue.TransitionProps & {
                        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                    }) | {
                        component: vue.DefineComponent<{
                            target: vue.PropType<HTMLElement>;
                        }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                            target: vue.PropType<HTMLElement>;
                        }>>, {}>;
                    };
                };
                zIndex: {
                    type: (StringConstructor | NumberConstructor)[];
                    default: number;
                };
                eager: BooleanConstructor;
                disabled: BooleanConstructor;
                theme: StringConstructor;
                contentClass: null;
                modelValue: BooleanConstructor;
                activator: vue.PropType<string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined>;
                closeDelay: {
                    type: vue.PropType<string | number>;
                    default: string | number;
                };
                openDelay: {
                    type: vue.PropType<string | number>;
                    default: string | number;
                };
                activatorProps: {
                    type: vue.PropType<Record<string, any>>;
                    default: () => {};
                };
                openOnClick: {
                    type: BooleanConstructor;
                    default: undefined;
                };
                openOnHover: BooleanConstructor;
                openOnFocus: {
                    type: BooleanConstructor;
                    default: undefined;
                };
                closeOnContentClick: {
                    type: vue.PropType<boolean>;
                    default: boolean;
                };
                locationStrategy: Omit<{
                    type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    default: string;
                    validator: (val: any) => boolean;
                }, "type" | "default"> & {
                    type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined)>;
                    default: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                        updateLocation: (e: Event) => void;
                    } | undefined);
                };
                scrollStrategy: Omit<{
                    type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                    default: string;
                    validator: (val: any) => boolean;
                }, "type" | "default"> & {
                    type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                    default: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
                };
                closeOnBack: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                contained: BooleanConstructor;
                contentProps: null;
                noClickAnimation: BooleanConstructor;
                persistent: BooleanConstructor;
                scrim: Omit<{
                    type: (StringConstructor | BooleanConstructor)[];
                    default: boolean;
                }, "type" | "default"> & {
                    type: vue.PropType<string | boolean>;
                    default: string | boolean;
                };
                attach: vue.PropType<string | boolean | Element>;
                id: StringConstructor;
            }, "$children" | "v-slots" | "v-slot:default" | "v-slot:activator">>> & {
                "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
            } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim"> & {
                $children?: {} | vue.VNodeChild | {
                    default?: ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                };
                'v-slots'?: {
                    default?: false | ((args_0: {
                        isActive: vue.Ref<boolean>;
                    }) => vue.VNodeChild) | undefined;
                    activator?: false | ((args_0: {
                        isActive: boolean;
                        props: Record<string, any>;
                    }) => vue.VNodeChild) | undefined;
                } | undefined;
            } & {
                "v-slot:default"?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                "v-slot:activator"?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            }>;
        };
        multiple: BooleanConstructor;
        noDataText: {
            type: StringConstructor;
            default: string;
        };
        openOnClear: BooleanConstructor;
        valueComparator: {
            type: vue.PropType<typeof deepEqual>;
            default: typeof deepEqual;
        };
        customFilter: vue.PropType<FilterFunction>;
        customKeyFilter: vue.PropType<FilterKeyFunctions>;
        filterKeys: {
            type: vue.PropType<(string & {}) | FilterKeys>;
            default: (string & {}) | FilterKeys;
        };
        filterMode: {
            type: vue.PropType<FilterMode>;
            default: string;
        };
        noFilter: BooleanConstructor;
        search: StringConstructor;
    }, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "onUpdate:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
        "onUpdate:menu"?: ((val: boolean) => any) | undefined;
        "onUpdate:search"?: ((val: any) => any) | undefined;
    } & vue.ShallowUnwrapRef<{
        isFocused: vue.Ref<boolean>;
        isPristine: vue.Ref<boolean>;
        menu: vue.Ref<boolean> & {
            readonly externalValue: boolean;
        };
        search: vue.Ref<string | undefined> & {
            readonly externalValue: string | undefined;
        };
        filteredItems: vue.Ref<InternalItem<any>[]>;
        select: (item: InternalItem) => void;
    } & Omit<any, string | number | symbol>> & {} & vue.ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & vue.ComponentOptionsBase<Readonly<vue.ExtractPropTypes<Omit<{
    transition: Omit<{
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string;
        validator: (val: unknown) => boolean;
    }, "type" | "default"> & {
        type: vue.PropType<string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        })>;
        default: string | boolean | (vue.TransitionProps & {
            component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
        });
    };
    reverse: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    error: BooleanConstructor;
    id: StringConstructor;
    active: BooleanConstructor;
    name: StringConstructor;
    color: StringConstructor;
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: string;
        validator: (v: any) => boolean;
    };
    loading: (StringConstructor | BooleanConstructor)[];
    label: StringConstructor;
    prefix: StringConstructor;
    autofocus: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    placeholder: StringConstructor;
    theme: StringConstructor;
    messages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    counter: vue.PropType<string | number | true>;
    density: {
        type: vue.PropType<Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    variant: {
        type: vue.PropType<"filled" | "outlined" | "plain" | "underlined" | "solo">;
        default: string;
        validator: (v: any) => boolean;
    };
    modelValue: {
        type: vue.PropType<any>;
        default: any;
    };
    bgColor: StringConstructor;
    prependIcon: vue.PropType<IconValue>;
    appendIcon: vue.PropType<IconValue>;
    clearIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    prependInnerIcon: vue.PropType<IconValue>;
    'onClick:clear': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:append': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prepend': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:appendInner': vue.PropType<EventProp<(...args: any[]) => any>>;
    'onClick:prependInner': vue.PropType<EventProp<(...args: any[]) => any>>;
    focused: BooleanConstructor;
    validateOn: vue.PropType<"input" | "blur" | "submit" | undefined>;
    errorMessages: {
        type: vue.PropType<string | string[]>;
        default: () => never[];
    };
    maxErrors: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    rules: {
        type: vue.PropType<ValidationRule[]>;
        default: () => never[];
    };
    hideDetails: vue.PropType<boolean | "auto">;
    clearable: BooleanConstructor;
    persistentClear: BooleanConstructor;
    singleLine: BooleanConstructor;
    hint: StringConstructor;
    persistentHint: BooleanConstructor;
    persistentPlaceholder: BooleanConstructor;
    persistentCounter: BooleanConstructor;
    suffix: StringConstructor;
    counterValue: vue.PropType<(value: any) => number>;
    items: {
        type: vue.PropType<any[]>;
        default: () => never[];
    };
    itemTitle: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemValue: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    itemChildren: Omit<{
        type: vue.PropType<SelectItemKey>;
        default: string;
    }, "type" | "default"> & {
        type: vue.PropType<SelectItemKey>;
        default: SelectItemKey;
    };
    itemProps: {
        type: vue.PropType<SelectItemKey>;
        default: string;
    };
    returnObject: BooleanConstructor;
    chips: BooleanConstructor;
    closableChips: BooleanConstructor;
    eager: BooleanConstructor;
    hideNoData: BooleanConstructor;
    hideSelected: BooleanConstructor;
    menu: BooleanConstructor;
    menuIcon: {
        type: vue.PropType<IconValue>;
        default: string;
    };
    menuProps: {
        type: vue.PropType<Partial<{
            location: Anchor;
            origin: "auto" | Anchor | "overlap";
            transition: string | boolean | (vue.TransitionProps & {
                component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
            }) | {
                component: vue.DefineComponent<{
                    target: vue.PropType<HTMLElement>;
                }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                    target: vue.PropType<HTMLElement>;
                }>>, {}>;
            };
            zIndex: string | number;
            eager: boolean;
            disabled: boolean;
            modelValue: boolean;
            closeDelay: string | number;
            openDelay: string | number;
            activatorProps: Record<string, any>;
            openOnClick: boolean;
            openOnHover: boolean;
            openOnFocus: boolean;
            closeOnContentClick: boolean;
            locationStrategy: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                updateLocation: (e: Event) => void;
            } | undefined);
            scrollStrategy: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
            closeOnBack: boolean;
            contained: boolean;
            noClickAnimation: boolean;
            persistent: boolean;
            scrim: string | boolean;
        }> & Omit<Readonly<vue.ExtractPropTypes<Omit<{
            offset: vue.PropType<string | number | number[] | undefined>;
            location: {
                type: vue.PropType<Anchor>;
                default: string;
            };
            origin: {
                type: vue.PropType<"auto" | Anchor | "overlap">;
                default: string;
            };
            height: (StringConstructor | NumberConstructor)[];
            width: (StringConstructor | NumberConstructor)[];
            maxHeight: (StringConstructor | NumberConstructor)[];
            maxWidth: (StringConstructor | NumberConstructor)[];
            minHeight: (StringConstructor | NumberConstructor)[];
            minWidth: (StringConstructor | NumberConstructor)[];
            transition: Omit<{
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                })>;
                default: string;
                validator: (val: unknown) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                }) | {
                    component: vue.DefineComponent<{
                        target: vue.PropType<HTMLElement>;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                        target: vue.PropType<HTMLElement>;
                    }>>, {}>;
                }>;
                default: string | boolean | (vue.TransitionProps & {
                    component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
                }) | {
                    component: vue.DefineComponent<{
                        target: vue.PropType<HTMLElement>;
                    }, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
                        target: vue.PropType<HTMLElement>;
                    }>>, {}>;
                };
            };
            zIndex: {
                type: (StringConstructor | NumberConstructor)[];
                default: number;
            };
            eager: BooleanConstructor;
            disabled: BooleanConstructor;
            theme: StringConstructor;
            contentClass: null;
            modelValue: BooleanConstructor;
            activator: vue.PropType<string | Element | vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | undefined>;
            closeDelay: {
                type: vue.PropType<string | number>;
                default: string | number;
            };
            openDelay: {
                type: vue.PropType<string | number>;
                default: string | number;
            };
            activatorProps: {
                type: vue.PropType<Record<string, any>>;
                default: () => {};
            };
            openOnClick: {
                type: BooleanConstructor;
                default: undefined;
            };
            openOnHover: BooleanConstructor;
            openOnFocus: {
                type: BooleanConstructor;
                default: undefined;
            };
            closeOnContentClick: {
                type: vue.PropType<boolean>;
                default: boolean;
            };
            locationStrategy: Omit<{
                type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                default: string;
                validator: (val: any) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<"connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined)>;
                default: "connected" | "static" | ((data: LocationStrategyData, props: StrategyProps, contentStyles: vue.Ref<Record<string, string>>) => {
                    updateLocation: (e: Event) => void;
                } | undefined);
            };
            scrollStrategy: Omit<{
                type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                default: string;
                validator: (val: any) => boolean;
            }, "type" | "default"> & {
                type: vue.PropType<"none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition">;
                default: "none" | "block" | "close" | ((data: ScrollStrategyData, props: StrategyProps$1) => void) | "reposition";
            };
            closeOnBack: {
                type: BooleanConstructor;
                default: boolean;
            };
            contained: BooleanConstructor;
            contentProps: null;
            noClickAnimation: BooleanConstructor;
            persistent: BooleanConstructor;
            scrim: Omit<{
                type: (StringConstructor | BooleanConstructor)[];
                default: boolean;
            }, "type" | "default"> & {
                type: vue.PropType<string | boolean>;
                default: string | boolean;
            };
            attach: vue.PropType<string | boolean | Element>;
            id: StringConstructor;
        }, "$children" | "v-slots" | "v-slot:default" | "v-slot:activator">>> & {
            "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
        } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "location" | "origin" | "transition" | "zIndex" | "eager" | "disabled" | "modelValue" | "closeDelay" | "openDelay" | "activatorProps" | "openOnClick" | "openOnHover" | "openOnFocus" | "closeOnContentClick" | "locationStrategy" | "scrollStrategy" | "closeOnBack" | "contained" | "noClickAnimation" | "persistent" | "scrim"> & {
            $children?: {} | vue.VNodeChild | {
                default?: ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            };
            'v-slots'?: {
                default?: false | ((args_0: {
                    isActive: vue.Ref<boolean>;
                }) => vue.VNodeChild) | undefined;
                activator?: false | ((args_0: {
                    isActive: boolean;
                    props: Record<string, any>;
                }) => vue.VNodeChild) | undefined;
            } | undefined;
        } & {
            "v-slot:default"?: false | ((args_0: {
                isActive: vue.Ref<boolean>;
            }) => vue.VNodeChild) | undefined;
            "v-slot:activator"?: false | ((args_0: {
                isActive: boolean;
                props: Record<string, any>;
            }) => vue.VNodeChild) | undefined;
        }>;
    };
    multiple: BooleanConstructor;
    noDataText: {
        type: StringConstructor;
        default: string;
    };
    openOnClear: BooleanConstructor;
    valueComparator: {
        type: vue.PropType<typeof deepEqual>;
        default: typeof deepEqual;
    };
    customFilter: vue.PropType<FilterFunction>;
    customKeyFilter: vue.PropType<FilterKeyFunctions>;
    filterKeys: {
        type: vue.PropType<(string & {}) | FilterKeys>;
        default: (string & {}) | FilterKeys;
    };
    filterMode: {
        type: vue.PropType<FilterMode>;
        default: string;
    };
    noFilter: BooleanConstructor;
    search: StringConstructor;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "onUpdate:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">>> & {
    "onUpdate:menu"?: ((val: boolean) => any) | undefined;
    "onUpdate:search"?: ((val: any) => any) | undefined;
}, {
    isFocused: vue.Ref<boolean>;
    isPristine: vue.Ref<boolean>;
    menu: vue.Ref<boolean> & {
        readonly externalValue: boolean;
    };
    search: vue.Ref<string | undefined> & {
        readonly externalValue: string | undefined;
    };
    filteredItems: vue.Ref<InternalItem<any>[]>;
    select: (item: InternalItem) => void;
} & Omit<any, string | number | symbol>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, Omit<{
    'update:search': (val: any) => boolean;
    'update:modelValue': (val: any) => boolean;
    'update:menu': (val: boolean) => boolean;
}, "multiple" | "$children" | "items" | "v-slots" | "v-slot:prepend" | "v-slot:append" | "modelValue" | "update:modelValue" | "v-slot:details" | "v-slot:clear" | "v-slot:prepend-inner" | "v-slot:append-inner" | "v-slot:label" | "v-slot:loader" | "v-slot:item" | "returnObject" | "v-slot:chip" | "v-slot:selection" | "v-slot:prepend-item" | "v-slot:append-item" | "v-slot:no-data">, string, {
    reverse: boolean;
    type: string;
    error: boolean;
    active: boolean;
    direction: "horizontal" | "vertical";
    transition: string | boolean | (vue.TransitionProps & {
        component?: vue.Component<any, any, any, vue.ComputedOptions, vue.MethodOptions> | undefined;
    });
    menu: boolean;
    autofocus: boolean;
    eager: boolean;
    disabled: boolean;
    readonly: boolean;
    messages: string | string[];
    noDataText: string;
    density: Density;
    variant: "filled" | "outlined" | "plain" | "underlined" | "solo";
    clearIcon: IconValue;
    focused: boolean;
    errorMessages: string | string[];
    maxErrors: string | number;
    rules: ValidationRule[];
    clearable: boolean;
    persistentClear: boolean;
    singleLine: boolean;
    persistentHint: boolean;
    persistentPlaceholder: boolean;
    persistentCounter: boolean;
    valueComparator: typeof deepEqual;
    itemTitle: SelectItemKey;
    itemValue: SelectItemKey;
    itemChildren: SelectItemKey;
    itemProps: SelectItemKey;
    chips: boolean;
    closableChips: boolean;
    hideNoData: boolean;
    hideSelected: boolean;
    menuIcon: IconValue;
    openOnClear: boolean;
    filterMode: FilterMode;
    noFilter: boolean;
    filterKeys: (string & {}) | FilterKeys;
}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new <T, ReturnObject extends boolean = false, Multiple extends boolean = false, V extends Value<T, ReturnObject, Multiple> = Value<T, ReturnObject, Multiple>>() => {
    $props: {
        items?: readonly T[] | undefined;
        returnObject?: ReturnObject | undefined;
        multiple?: Multiple | undefined;
        modelValue?: V | undefined;
        'onUpdate:modelValue'?: ((val: V) => void) | undefined;
    } & {
        $children?: {} | vue.VNodeChild | {
            clear?: (() => vue.VNodeChild) | undefined;
            details?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: ((args_0: {
                item: InternalItem<T>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: ((args_0: {
                item: InternalItem<T>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: ((args_0: {
                item: InternalItem<T>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: (() => vue.VNodeChild) | undefined;
            'append-item'?: (() => vue.VNodeChild) | undefined;
            'no-data'?: (() => vue.VNodeChild) | undefined;
        };
        'v-slots'?: {
            clear?: false | (() => vue.VNodeChild) | undefined;
            details?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            label?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            append?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            prepend?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
            loader?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
            'prepend-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            'append-inner'?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
            item?: false | ((args_0: {
                item: InternalItem<T>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            chip?: false | ((args_0: {
                item: InternalItem<T>;
                index: number;
                props: Record<string, unknown>;
            }) => vue.VNodeChild) | undefined;
            selection?: false | ((args_0: {
                item: InternalItem<T>;
                index: number;
            }) => vue.VNodeChild) | undefined;
            'prepend-item'?: false | (() => vue.VNodeChild) | undefined;
            'append-item'?: false | (() => vue.VNodeChild) | undefined;
            'no-data'?: false | (() => vue.VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:clear"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:details"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:label"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:prepend"?: false | ((args_0: VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:loader"?: false | ((args_0: LoaderSlotProps) => vue.VNodeChild) | undefined;
        "v-slot:prepend-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:append-inner"?: false | ((args_0: DefaultInputSlot & VInputSlot) => vue.VNodeChild) | undefined;
        "v-slot:item"?: false | ((args_0: {
            item: InternalItem<T>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:chip"?: false | ((args_0: {
            item: InternalItem<T>;
            index: number;
            props: Record<string, unknown>;
        }) => vue.VNodeChild) | undefined;
        "v-slot:selection"?: false | ((args_0: {
            item: InternalItem<T>;
            index: number;
        }) => vue.VNodeChild) | undefined;
        "v-slot:prepend-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:append-item"?: false | (() => vue.VNodeChild) | undefined;
        "v-slot:no-data"?: false | (() => vue.VNodeChild) | undefined;
    };
});
declare type VAutocomplete = InstanceType<typeof VAutocomplete>;

export { VAutocomplete };
