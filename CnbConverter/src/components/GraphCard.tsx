import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import React, {useContext} from "react";
import {CurrenciesContext} from "../contexts/CurrenciesContext";
import GraphView from "./GraphView";

const GraphCard: React.FC = () => {

    const  {selectedCurrency} = useContext(CurrenciesContext);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Graph</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>

                {selectedCurrency !== null
                    ? <GraphView selectedCurrency={selectedCurrency}/>
                    : <div><p>Select a currency</p></div>}

            </IonCardContent>
        </IonCard>
    )
}

export default GraphCard;