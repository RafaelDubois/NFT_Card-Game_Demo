import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput, GameLoad, PageHOC } from "../components";
import { useGlobalContext } from "../context";

import styles from "../styles";

const CreateBattle = () => {
  const { contract, battleName, setBattleName, gameData, setErrorMessage } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}

      <div className="flex flex-col mb-5">
        <CustomInput
          label="Combattre!"
          placeHolder="Entrer le nom du combat"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title="Créer un combat"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        Ou rejoindre un combat déja existant
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Créer <br /> un nouvel affrontement{" "}
  </>,
  <>
    Créer votre propre affrontement <br />
    et attendez que d'autres joueurs vous rejoigne
  </>
);
