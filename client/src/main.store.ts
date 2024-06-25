import { defineStore } from 'pinia';

export declare type ApiContext = {
    systemLanguageId: string;
    languageId: string;
};

export declare type SwagCeToRiseUpsellingState = {
    apiContext: ApiContext | null;
    context: URLSearchParams | null;
    plan: Plan | null;
};

export declare type Plan = {
    name: string;
    gmv?: number;
};

export const useMainStore = defineStore('main', {
    state: (): SwagCeToRiseUpsellingState => ({
        apiContext: null,
        context: null,
        plan: null,
    }),

    actions: {
        setApiContext(apiContext: SwagCeToRiseUpsellingState['apiContext']): void {
            this.apiContext = apiContext;
        },

        setContext(context: SwagCeToRiseUpsellingState['context']): void {
            this.context = context;
        },

        setPlan(plan: SwagCeToRiseUpsellingState['plan']): void {
            this.plan = plan;
        },
    },
});
