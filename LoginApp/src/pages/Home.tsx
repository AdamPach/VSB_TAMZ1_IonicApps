import {
    IonAlert,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader, IonInput, IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React from "react";

const Home: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const [url, setUrl] = React.useState<string>("");
    const [login, setLogin] = React.useState<string>("");

    const [code, setCode] = React.useState<string>("");
    const [decodedCode, setDecodedCode] = React.useState<string>("");

    const [message, setMessage] = React.useState<string>("");

    const getCode = async () => {
        if(url === "" || login === "")
        {
            setIsOpen(true);
            return;
        }

        const response = await fetch(`${url}?user=${login}&timestamp=${Date.now()}`);

        if(!response.ok)
        {
            setIsOpen(true);
            return;
        }

        const text = await response.text();

        setCode(text);
        setDecodedCode(atob(text));
    };

    const getMessage = async () =>
    {
        const response = await fetch(
            `${url}?timestamp=${Date.now()}`,
            {
                method:"GET",
                headers: {
                    'Authorization' : `Bearer ${code}`,
                }
            });

        if(!response.ok)
        {
            setIsOpen(true);
            return;
        }

        const text = await response.text();

        setMessage(text);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Login</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonInput
                        onIonChange={({detail}) => {setUrl(detail.value ?? "")}}
                        value={url}
                        label="URL"
                        labelPlacement={"stacked"}
                        placeholder="Enter a URL"/>
                </IonItem>

                <IonItem>
                    <IonInput
                        onIonChange={({detail}) => {setLogin(detail.value ?? "")}}
                        value={login}
                        label="Login"
                        labelPlacement={"stacked"}
                        placeholder="Enter a Login"/>
                </IonItem>
            </IonCardContent>
        </IonCard>

          <IonCard>
              <IonCardContent>
                  <IonItem>
                      <IonInput
                          disabled={true}
                          value={code}
                          label="Recieved data"
                          labelPlacement={"stacked"}/>
                  </IonItem>

                  <IonItem>
                      <IonInput
                          disabled={true}
                          value={decodedCode}
                          label="Decoded data"
                          labelPlacement={"stacked"}/>
                  </IonItem>

                  <IonItem>
                      <IonInput
                          disabled={true}
                          value={message}
                          label="Finall message"
                          labelPlacement={"stacked"}/>
                  </IonItem>
              </IonCardContent>
          </IonCard>

          <IonCard>
              <IonCardContent>
                  <IonButton
                      color={"primary"}
                      expand={"block"}
                      onClick={getCode}>
                      Get code
                  </IonButton>

                  <IonButton
                    color={"primary"}
                    expand={"block"}
                    disabled={code === ""}
                    onClick={getMessage}>
                      Get message
                  </IonButton>
              </IonCardContent>
          </IonCard>

          <IonAlert
            isOpen={isOpen}
            header={"Fetch failed"}
            message={"Auth request failed"}
            buttons={["Dismiss"]}
            onDidDismiss={() => setIsOpen(false)}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
