import {createContext, useEffect, useState} from "react";
import {CurrenciesContextType, Currency, Language} from "../models/currenciesModels";

export const CurrenciesContext = createContext<CurrenciesContextType>(
    {
        currenciesList: [],
        selectedCurrency: null,
        setSelectedCurrency: () => {},
        date: null,
        setDate: () => {},
        language: Language.EN,
        setLanguage: () => {}
    });

type Props = {
    children: JSX.Element;
}

const CurrenciesContextProvider: React.FC<Props> = ({children} : Props) =>
{
    const [currenciesList, setCurrenciesList] = useState<Currency[]>([]);

    const [date, setDate] = useState<Date | null>(null);
    const [language, setLanguage] = useState<Language>(Language.EN);

    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

    useEffect( () => {

        const fetchCurrencies = async () => {

            const dateParam = date !== null ? `&date=${date.toISOString().split('T')[0]}` : "";

            const response = await fetch(`http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php?lang=${language}${dateParam}`);

            if(response.ok)
            {
                const data = await response.json();

                const newCurrenciesList: Currency[] = [];

                data.data.forEach((currency: Currency) => {
                    newCurrenciesList.push(currency);
                });

                const selectedCurrencyIndex = newCurrenciesList.findIndex(currency => currency.code === selectedCurrency?.code);

                if(selectedCurrencyIndex !== -1)
                {
                    console.log("Selected currency found");
                    setSelectedCurrency(newCurrenciesList[selectedCurrencyIndex]);
                }

                setCurrenciesList(newCurrenciesList);
            }
        }

        fetchCurrencies()
            .catch(console.error);
    }, [date, language]);

    const contextValue: CurrenciesContextType = {
        currenciesList,
        selectedCurrency,
        setSelectedCurrency,
        date,
        setDate,
        language,
        setLanguage
    };

    return (
        <CurrenciesContext.Provider value={contextValue}>
            {children}
        </CurrenciesContext.Provider>
    );
}

export default CurrenciesContextProvider;