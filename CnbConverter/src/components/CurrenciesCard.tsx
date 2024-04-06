import React, {useContext} from "react";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput} from "@ionic/react";
import {CurrenciesContext} from "../contexts/CurrenciesContext";

const CurrenciesCard: React.FC = ()  => {

    const {selectedCurrency} = useContext(CurrenciesContext);

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
                    disabled={true}
                    label={selectedCurrency?.code ?? "CUR"}/>
            </IonCardContent>
        </IonCard>
    );
}

export default CurrenciesCard;