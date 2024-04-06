import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent, IonDatetime,
    IonHeader, IonLabel,
    IonModal, IonSegment, IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";

import './Settings.tsx.css'

import {useContext, useRef} from "react";
import {Language} from "../models/currenciesModels";
import {CurrenciesContext} from "../contexts/CurrenciesContext";

const Settings: React.FC = () => {

    const {date, setDate, language, setLanguage} = useContext(CurrenciesContext);

    const modal = useRef<HTMLIonModalElement>(null);

    const onDateChange = (event: CustomEvent) => {
        setDate(new Date(event.detail.value));
    }

    const onLanguageChange = (event: CustomEvent) => {
        setLanguage(event.detail.value);
    }

    return (
        <div>
            <IonCard>
                <IonCardContent>
                    <IonButton
                        id="open-modal"
                        expand="block">
                        SETTINGS
                    </IonButton>
                </IonCardContent>
            </IonCard>

            <IonModal
                ref={modal}
                trigger={"open-modal"}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Settings</IonTitle>
                        <IonButtons slot={"end"}>
                            <IonButton
                                onClick={() => modal.current?.dismiss()}>
                                CLOSE
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardContent>
                            <div className={"date-select-center"}>
                                <IonDatetime
                                    value={date?.toISOString().split('T')[0]}
                                    onIonChange={onDateChange}
                                    max={new Date().toISOString()}
                                    presentation={"date"}/>
                            </div>
                        </IonCardContent>
                    </IonCard>

                    <IonCard>
                        <div className={"ion-margin"}>
                            <IonSegment
                                value={language}
                                onIonChange={onLanguageChange}>
                                <IonSegmentButton value={Language.CS}>
                                    <IonLabel>Čeština</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value={Language.EN}>
                                    <IonLabel>English</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                    </IonCard>
                </IonContent>
            </IonModal>
        </div>
    );
}

export default Settings;