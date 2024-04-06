export type Currency = {
    country_label: string;
    curr_label: string;
    unit: number;
    code: string;
    rate: number;
}

export type CurrenciesContextType = {
    currenciesList: Currency[];
    selectedCurrency: Currency | null;
    setSelectedCurrency: (currency: Currency) => void;
    date: Date | null;
    setDate: (date: Date) => void;
    language: Language;
    setLanguage: (language: Language) => void
};

export enum Language {
    CS = "cs", EN = "en"
}