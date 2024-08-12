import React, { useState, useEffect } from "react";
import MainPage from "../mainPage/mainPage";

function FirstPage() {
  const [isAdult, setIsAdult] = useState(null);

  useEffect(() => {
    const storedAgeConfirmation = localStorage.getItem("isAdult");
    if (storedAgeConfirmation) {
      setIsAdult(JSON.parse(storedAgeConfirmation));
    }
  }, []);

  const handleAgeConfirmation = (confirmation) => {
    if (confirmation) {
      localStorage.setItem("isAdult", JSON.stringify(confirmation));
    }
    setIsAdult(true); // Устанавливаем состояние в true независимо от выбора
  };

  return (
    <>
      {isAdult === null ? (
        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingTop: '200px' }}>
          <h1>Лицам до 18 лет вход на сайт воспрещен! ВНИМАНИЕ!</h1>
          <p className="years" style={{ paddingTop: '30px' }}>Сайт содержит информацию о сигаретах, сигарах, кальянах, сигариллах, табаке, трубках. Находиться на сайте имеют право только совершеннолетние лица.</p>
          <h3 style={{ paddingTop: '30px' }}>Вам больше <span style={{ color: ' #212395', fontWeight: '700' }}>18 лет?</span></h3>
          <div style={{ display: "flex", justifyContent: 'center', paddingTop: '30px' }}>
            <div className="btn_ss btn_buy" style={{ marginRight: '20px' }} onClick={() => handleAgeConfirmation(true)}>Да</div>
            <div className="btn_ss btn_buy2" onClick={() => handleAgeConfirmation(false)}>Нет</div>
          </div>
        </div>
      ) : isAdult ? (
        <MainPage />
      ) : (
        <div>
          <h2>Вы должны быть старше 18 лет, чтобы получить доступ к этой странице.</h2>
        </div>
      )}
    </>
  );
}

export default FirstPage;