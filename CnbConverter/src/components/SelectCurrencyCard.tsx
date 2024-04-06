import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSelect,
    IonSelectOption,
    SelectChangeEventDetail
} from "@ionic/react";
import {useContext} from "react";
import {CurrenciesContext} from "../contexts/CurrenciesContext";
import {IonSelectCustomEvent} from "@ionic/core/dist/types/components";

const SelectCurrencyCard: React.FC = () => {

    const {currenciesList, selectedCurrency, setSelectedCurrency} = useContext(CurrenciesContext);

    const onSelectChange = (event: IonSelectCustomEvent<SelectChangeEventDetail>) => {
        setSelectedCurrency(event.detail.value);
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Select Currency
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonSelect
                    value={selectedCurrency}
                    onIonChange={onSelectChange}
                    label={"Currency"}>
                    {currenciesList.map((currency, index) => (
                        <IonSelectOption
                            key={index}
                            value={currency}>
                            {`${currency.country_label} - ${currency.curr_label}`}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonCardContent>
        </IonCard>
    )
}

export default SelectCurrencyCard;