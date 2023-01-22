import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput, PageHOC, CustomButton } from "../components";
import { useGlobalContext } from "../context";


const Home = () => {
  const { contract, walletAddress, setShowAlert }= useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const handleClick = async () => {
      try {
        const playerExists = await contract.isPlayer(walletAddress)
        if (!playerExists) {
          await contract.registerPlayer(playerName, playerName);

          setShowAlert({
            status:true,
            type:'info',
            message:`${playerName} est en cours d'invocation!`
          })
        }

      } catch (error) {
        setShowAlert({
          status:true,
          type:'failure',
          message: "Something went wrong!"
        })
      }
  }

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress)
      const playerTokenExists = await contract.isPlayerToken(walletAddress)
      if(playerExists && playerTokenExists){
         navigate('/create-battle')
      }
    }

    if(contract) checkForPlayerToken();
    
  }, [contract])
  

  return (
    <div className="flex flex-col">
       <CustomInput
          label='Nom'
          placeHolder='Quel est ton nom ?'
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
         title="S'inscrire"
          handleClick= {handleClick}
          restStyles='mt-6'
        />
    </div>
  );
};

export default PageHOC(
  Home,
  <>Bienvenue dans Les Dieux d'Avax <br /> un jeu de carte NFT Web3 </>,
  <>Connecter votre portefeuille pour commencer à jouer <br />à l'ultime jeu de carte de combat</>
  );
