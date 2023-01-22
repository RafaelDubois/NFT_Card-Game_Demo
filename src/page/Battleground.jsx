import React from "react";
import { useNavigate } from "react-router-dom";
import { battlegrounds } from "../assets";
import { Alert } from "../components";
import { useGlobalContext } from "../context";
import styles from "../styles";

const Battleground = () => {
  const navigate = useNavigate();
  const { setShowAlert, showAlert, setBattleGround } = useGlobalContext();

 const handleBattleGroundChoice = (ground) => {
        setBattleGround(ground.id)

        localStorage.setItem('battleground', ground.id);

        setShowAlert({ status: true, type:'info', message:`${ground.name} est prêt pour le combat!`})

        setTimeout(() => {
            navigate(-1)
        }, 1000)
 }

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <h1 className={`${styles.headText} text-center`}>
        Choisissez votre Champ de{" "}
        <span className="text-siteViolet">Bataille</span>
      </h1>
      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
            {battlegrounds.map((ground) => {
                <div key={ground.id}
                className={`${styles.flexCenter} ${styles.battleGroundCard}`}
                onClick={() => handleBattleGroundChoice(ground)}>
                    <img  src={ground.image} al="ground" className={styles.battleGroundCardImg}/>
                    <div className="Info absolute">
                        <p className={styles.battleGroundCardText}>{ground.name}</p>
                    </div>
                </div>
            })}
      </div>
    </div>
  );
};

export default Battleground;
