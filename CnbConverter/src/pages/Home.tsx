import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import CurrenciesCard from "../components/CurrenciesCard";
import Settings from "../components/Settings";
import SelectCurrencyCard from "../components/SelectCurrencyCard";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CNB Converter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <CurrenciesCard/>
          <SelectCurrencyCard/>
        <Settings/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
