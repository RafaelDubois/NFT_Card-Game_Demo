import React from "react";
import { useNavigate } from "react-router-dom";
import { player01, player02 } from "../assets";
import { useGlobalContext } from "../context";
import styles from "../styles";
import CustomButton from "./CustomButton";

const GameLoad = () => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title="Choisissez un champ de bataille"
          handleClick={() => navigate("/battleground")}
          restStyles="mt-6"
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          En attente d'un adversaire <br /> digne de vous combattre...
        </h1>
        <p className={styles.gameLoadText}>
          Protip: en attendant, choisissez votre champ de bataille de préference
        </p>
        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress.slice(0, 30)}
            </p>
          </div>

          <h2 className={styles.gameLoadVS}>Vs</h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} className={styles.gameLoadPlayerImg} />
            <p className={styles.gameLoadPlayerText}>??????????</p>
          </div>
        </div>

        <div className="mt-10">
          <p className={`${styles.infoText} text-center mb-5`}>OR</p>

          <CustomButton
            title="Join other battles"
            handleClick={() => navigate('/join-battle')}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
