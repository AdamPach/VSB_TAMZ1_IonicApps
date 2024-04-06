import React, {useContext, useEffect, useRef} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput} from "@ionic/react";
import {CurrenciesContext} from "../contexts/CurrenciesContext";

const CurrenciesCard: React.FC = ()  => {

    const inputCurrency = useRef<HTMLIonInputElement>(null);
    const outputCurrency = useRef<HTMLIonInputElement>(null);

    const {selectedCurrency} = useContext(CurrenciesContext);

    useEffect(() => {
        inputCurrency.current!.value = "";
        outputCurrency.current!.value = "";
    }, [selectedCurrency]);

    const onInputChange = (event: CustomEvent) => {

        const value: number = Number(event.detail.value);

        if(selectedCurrency !== null)
        {

            console.log(selectedCurrency);

            outputCurrency.current!.value = value / selectedCurrency.rate * selectedCurrency.unit;
        }

    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Currencies</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonInput
                    ref={inputCurrency}
                    fill="outline"
                    type={"number"}
                    label={"CZK"}
                    onIonInput={onInputChange}/>

                <br/>

                <IonInput
                    ref={outputCurrency}
                    fill="outline"
                    type={"number"}
                    disabled={true}
                    label={selectedCurrency?.code ?? "CUR"}/>
            </IonCardContent>
        </IonCard>
    );
}

export default CurrenciesCard;