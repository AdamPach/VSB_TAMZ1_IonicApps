import {createContext, useEffect, useState} from "react";

type CurrenciesContextType = {
    currencyName: string;
    setCurrencyName: (currencyName: string) => void;
    currenciesList: string[];
};

export const CurrenciesContext = createContext<CurrenciesContextType>(
    {
        currencyName: "",
        setCurrencyName: () => {},
        currenciesList: []
    });

type Props = {
    children: JSX.Element;
}


const CurrenciesContextProvider: React.FC<Props> = ({children} : Props) =>
{
    const [currencyName, setCurrencyName] = useState<string>("CZK");
    const [currenciesList, setCurrenciesList] = useState<string[]>([]);

    useEffect( () => {

        const fetchCurrencies = async () => {
            const response = await fetch("http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php");

            if(response.ok)
            {
                const data = await response.json();

                const newCurrenciesList: string[] = [];

                data.data.forEach(({code}: any) => {
                    newCurrenciesList.push(code);
                });

                setCurrencyName(newCurrenciesList[0]);

                setCurrenciesList(newCurrenciesList);
            }
        }

        fetchCurrencies()
            .catch(console.error);
    }, [currencyName]);

    const contextValue: CurrenciesContextType = {
        currencyName,
        setCurrencyName,
        currenciesList
    };

    return (
        <CurrenciesContext.Provider value={contextValue}>
            {children}
        </CurrenciesContext.Provider>
    );
}

export default CurrenciesContextProvider;