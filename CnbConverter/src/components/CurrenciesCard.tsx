import React, {useContext} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput} from "@ionic/react";
import {CurrenciesContext} from "../contexts/CurrenciesContext";

const CurrenciesCard: React.FC = ()  => {

    const {currencyName} = useContext(CurrenciesContext);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Currencies</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonInput
                    fill="outline"
                    type={"number"}
                    label={"CZK"}/>

                <br/>

                <IonInput
                    fill="outline"
                    type={"number"}
                    label={currencyName}/>
            </IonCardContent>
        </IonCard>
    );
}

export default CurrenciesCard;