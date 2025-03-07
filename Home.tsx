import React, { useState, useEffect } from 'react';
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonRange, IonButton, IonGrid, IonRow, IonCol, IonMenu, IonPage, IonMenuButton, IonButtons } from '@ionic/react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '@ionic/react/css/core.css';

const SIPCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [returns, setReturns] = useState(0);

  const calculateSIP = () => {
    const P = monthlyInvestment;
    const i = expectedReturn / 100 / 12;
    const n = timePeriod * 12;
    const FV = P * (((1 + i) ** n - 1) * (1 + i)) / i;
    
    const totalInvested = P * n;
    const estReturns = FV - totalInvested;

    setFutureValue(parseFloat(FV.toFixed(2)));
    setInvestedAmount(parseFloat(totalInvested.toFixed(2)));
    setReturns(parseFloat(estReturns.toFixed(2)));
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const data = [
    { name: 'Invested Amount', value: investedAmount },
    { name: 'Est. Returns', value: returns }
  ];
  
  const COLORS = ['#A9C8FF', '#5273E0'];

  return (
    <>
      {/* Side Menu */}
      <IonMenu side="end" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
           <div className='img-class'>  <IonItem><img src="grow.png" alt="" /></IonItem></div> 
            <IonButton expand="short" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px',color:'blue'}}>Login/Register</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem><IonLabel>Filter Stocks</IonLabel></IonItem>
          <IonItem><IonLabel>Filter Mutual Stocks</IonLabel></IonItem>
          <IonItem><IonLabel>Filter US Stocks</IonLabel></IonItem>
          <IonItem>Smart Save</IonItem>
          <IonItem>Compare Funds</IonItem>
          <IonItem>Credits</IonItem>
          <IonItem>View in App</IonItem>
          <IonItem>Help and Support</IonItem>
        </IonContent>
      </IonMenu>

      {/* Main Page */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>SIP Calculator</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          
          {/* Input Controls */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Monthly Investment (₹): {monthlyInvestment}</IonLabel>
                  <IonRange min={1000} max={100000} step={500} value={monthlyInvestment} onIonChange={e => setMonthlyInvestment(Number(e.detail.value))} />
                </IonItem>
                <IonItem>
                  <IonLabel>Expected Return Rate (p.a) %: {expectedReturn}</IonLabel>
                  <IonRange min={1} max={20} step={0.5} value={expectedReturn} onIonChange={e => setExpectedReturn(Number(e.detail.value))} />
                </IonItem>
                <IonItem>
                  <IonLabel>Time Period (Years): {timePeriod}</IonLabel>
                  <IonRange min={1} max={30} step={1} value={timePeriod} onIonChange={e => setTimePeriod(Number(e.detail.value))} />
                </IonItem>
                <IonButton expand="block" onClick={calculateSIP}>Calculate</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Investment Summary */}
          <IonGrid className="Chartdiv">
            <IonRow>
              <IonCol>
                <IonItem><IonLabel>Invested Amount: ₹{investedAmount}</IonLabel></IonItem>
                <IonItem><IonLabel>Est. Returns: ₹{returns}</IonLabel></IonItem>
                <IonItem><IonLabel>Total Value: ₹{futureValue}</IonLabel></IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Pie Chart */}
          <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <PieChart width={300} height={300}>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            {/* Centered Start SIP Button */}
            <IonButton expand="block" color="success" style={{ marginTop: '20px' }}>START SIP</IonButton>
          </div>

        </IonContent>
      </IonPage>
    </>
  );
};

export default SIPCalculator;
