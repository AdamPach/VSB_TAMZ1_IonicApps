import {createContext, useEffect, useState} from "react";

type Currency = {
    country_label: string;
    curr_label: string;
    unit: number;
    code: string;
    rate: number;
}

type CurrenciesContextType = {
    setCurrencyName: (currencyName: string) => void;
    currenciesList: Currency[];
    selectedCurrency: Currency | null;
    setSelectedCurrency: (currency: Currency) => void;
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
    {
        setCurrencyName: () => {},
        currenciesList: [],
        selectedCurrency: null,
        setSelectedCurrency: () => {}
    });

type Props = {
    children: JSX.Element;
}


const CurrenciesContextProvider: React.FC<Props> = ({children} : Props) =>
{
    const [currencyName, setCurrencyName] = useState<string>("CZK");
    const [currenciesList, setCurrenciesList] = useState<Currency[]>([]);

    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

    useEffect( () => {

        const fetchCurrencies = async () => {
            const response = await fetch("http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php");

            if(response.ok)
            {
                const data = await response.json();

                const newCurrenciesList: Currency[] = [];

                data.data.forEach((currency: Currency) => {
                    newCurrenciesList.push(currency);
                });

                setCurrenciesList(newCurrenciesList);
            }
        }

        fetchCurrencies()
            .catch(console.error);
    }, [currencyName]);

    const contextValue: CurrenciesContextType = {
        setCurrencyName,
        currenciesList,
        selectedCurrency,
        setSelectedCurrency
    };

    return (
        <CurrenciesContext.Provider value={contextValue}>
            {children}
        </CurrenciesContext.Provider>
    );
}

export default CurrenciesContextProvider;