import { languages } from "./languages.js";
import { useState } from "react";
import { clsx } from "clsx"



function App() {

    const [currentWord, setCurrentWord] = useState("react");
    const [guessWord,setGuessWord] = useState([]);

    const countWrongLetters=guessWord.filter(letter=>!currentWord.includes(letter)).length
    console.log(countWrongLetters);


    const isGameWon=(guessWord.length-countWrongLetters)>=currentWord.length;
    const isGameLost=countWrongLetters>=8;
    const isGameOver=isGameWon || isGameLost;


    const keys="abcdefghijklmnopqrstuvwxyz"

    const langElements=languages.map((item,index)=>{
        const styles={
            backgroundColor : item.backgroundColor,
            color : item.color
        }
        return(
            <span className="lang" key={index} style={styles}>{item.name}</span>
        )
    });

    const letters=currentWord.split("").map((letter,index)=> {
        return(
            <span className="word" key={index}>{guessWord.includes(letter) && letter.toUpperCase()}</span>
        )
    })

    function keyHandler(letter){
        setGuessWord((prev)=>(
          guessWord.includes(letter) ? prev :  [...prev,letter])
        );

    }



    const keyBoard=keys.split("").map((key,index)=> {
        const isGuessed=guessWord.includes(key);
        const isCorrect=isGuessed && currentWord.includes(key)
        const isWrong=isGuessed && !currentWord.includes(key)
        const keyClassName=clsx("keys",{
            isCorrect: isCorrect,
            isWrong: isWrong
        })
        return(
            <button onClick={()=>keyHandler(key)} key={index} className={keyClassName}>
                {key.toUpperCase()}
            </button>
        )
    })

    function gameStatus(){
        if(!isGameOver){
            return null
        }else{
            if(isGameWon){
                return(
                    <>
                        <h1>You win!</h1>
                        <p>Well Done!</p>
                    </>

                )
            } else{
                return(
                    <>
                    <h1>You Lose!</h1>
                    <p>Better start Learning Assembly!</p>
                    </>
                )
            }
        }
    }

    const statusClassName=clsx("status",{
        isGameWon: isGameWon,
        isGameLost: isGameLost
    })

  return (
   <main>
       <header className="app-header">
           <h1>Assembly: EndGame</h1>
           <p>Guess the word  under 8 attempts to keep the programming world safe from assembly!</p>
       </header>
       <section className={statusClassName}>
           {gameStatus()}
       </section>
       <section className="languages">
           {langElements}
       </section>
       <section className="letter-box">
           {letters}
       </section>
       <section className="keyboard">
           {keyBoard}
       </section>
       <section className="game-button">
           {isGameOver && <button className="game">New Game</button>}
       </section>


   </main>
  )
}

export default App
