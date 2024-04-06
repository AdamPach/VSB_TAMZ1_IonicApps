import {IonButton, IonButtons, IonCard, IonCardContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/react";
import {useContext, useRef} from "react";

const Settings: React.FC = () => {

    const modal = useRef<HTMLIonModalElement>(null);

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
            </IonModal>
        </div>
    );
}

export default Settings;