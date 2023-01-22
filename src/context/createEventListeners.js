import { ethers } from "ethers";

import { ABI } from "../contract";
import { defenseSound } from "../assets";
import { playAudio, sparcle } from "../utils/animation";

const emptyAccount = "0x0000000000000000000000000000000000000000";

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter); // Not have multiple listener on the same evenet at the same time
  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};

export const getCoords = (cardRef) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

export const createEventListener = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
  player1Ref,
  player2Ref,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();

  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("Création d'un nouveau joueur!", args);
    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Le joueur à bien été enregistré",
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();

  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("Nouveau combat commencé!", args, walletAddress);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  const BattleMoveEventFilter = contract.filters.BattleMove();
  AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
    console.log("Battle move initiated!", args);
  });

  const RoundEndedEventFilter = contract.filters.RoundEnded();

  AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
    console.log("Round ended!", args, walletAddress);

    for (let i = 0; i < args.damagedPlayers.length; i += 1) {
      if (args.damagedPlayers[i] !== emptyAccount) {
        if (args.damagedPlayers[i] === walletAddress) {
          sparcle(getCoords(player1Ref));
        } else if (args.damagedPlayers[i] !== walletAddress) {
          sparcle(getCoords(player2Ref));
        }
      } else {
        playAudio(defenseSound);
      }
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  const BattleEndedEventFilter = contract.filters.BattleEnded();

  AddNewEvent(BattleEndedEventFilter, provider, ({ args }) => {
      console.log("Battle ended!", args, walletAddress);

      if(walletAddress.toLowerCase() === args.winner.toLowerCase()) {
        setShowAlert({status: true, type:'success',message: 'Vous avez gagner !'})
      } else if (walletAddress.toLowerCase() === args.loser.toLowerCase()) {
        setShowAlert({status: true, type:'failure',message: 'Vous avez perdu !'})
      }

      navigate('./create-battle')
  })
};
