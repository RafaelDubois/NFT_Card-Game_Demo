import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput, PageHOC } from "../components";

import { useGlobalContext } from "../context";
import styles from "../styles";

const JoinBattle = () => {
    const { contract, gameData, setShowAlert, setBattleName, setErrorMessage, walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName)

    try {
        await contract.joinBattle(battleName)

        setShowAlert({status:true, type:'sucess', message: `Rejoint ${battleName}`})
    } catch (error) {
        setErrorMessage(error)
    }
  };
  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles:</h2>

      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length
          ? gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress) && battle.battleStatus !== 1)
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>{index + 1}. {battle.name}</p>
                <CustomButton
                  title="Rejoindre"
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            )
        ) : (
          <p className={styles.joinLoading}>
            {" "}
            Rechargez la page pour voir de nouveaux combats
          </p>
        )}
      </div>

      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        Ou créer un nouveau combat.
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Rejoindre <br /> un combat
  </>,
  <>Rejoindre un combat déja existant</>
);
