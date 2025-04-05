import { languages } from "./languages.js";
import { useState } from "react";
import { clsx } from "clsx"
import {getFarewellText} from "./utils.js";
import {getRandomWord} from "./utils.js";
import Confetti from "react-confetti"


function App() {

    const [currentWord, setCurrentWord] = useState(getRandomWord);
    const [guessWord,setGuessWord] = useState([]);

    const countWrongLetters=guessWord.filter(letter=>!currentWord.includes(letter)).length
    console.log(getFarewellText(languages[countWrongLetters].name));


    const isGameWon=currentWord.split("").every(letter=>guessWord.includes(letter));
    const isGameLost=countWrongLetters>=8;
    const isGameOver=isGameWon || isGameLost;


    const lastLetter=guessWord[guessWord.length-1];
    const isLastLetterIncorrect=lastLetter && !currentWord.includes(lastLetter);


    const keys="abcdefghijklmnopqrstuvwxyz"




    const langElements=languages.map((item,index)=>{

        const isLangLost=index<countWrongLetters

        const styles={
            backgroundColor : item.backgroundColor,
            color : item.color
        }
        const langClass=clsx("lang",{
            lost : isLangLost
        })

        return(
            <span className={langClass} key={index} style={styles}>{item.name}</span>
        )
    });

    const letters=currentWord.split("").map((letter,index)=> {
        const shouldRevealLetter=isGameLost || guessWord.includes(letter)

        const className=clsx("word",{
            missedLetter : isGameLost && !guessWord.includes(letter)
        })

        return(
            <span className={className} key={index}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
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
            <button
                    disabled={isGameOver}
                    onClick={()=>keyHandler(key)}
                    key={index}
                    className={keyClassName}>
                {key.toUpperCase()}
            </button>
        )
    })

    function gameStatus(){
        if(!isGameOver && isLastLetterIncorrect){
                return (
                    <p>{getFarewellText(languages[countWrongLetters-1].name)}</p>
                )
        }
        if(isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well Done!</p>
                </>

            )
        }
            if(isGameLost) {
                return (
                    <>
                        <h2>You Lose!</h2>
                        <p>Better start Learning Assembly!</p>
                    </>
                )
            }

    }

    const statusClassName=clsx("status",{
        isGameWon: isGameWon,
        isGameLost: isGameLost,
        farewell :!isGameOver && isLastLetterIncorrect
    })

    function handleGame(){
        setGuessWord([])
        setCurrentWord(getRandomWord())
    }

  return (
   <main>
       {isGameWon && <Confetti recycle={false}
                               numberOfPieces={1000}/>}
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
           {isGameOver && <button className="game" onClick={handleGame}>New Game</button>}
       </section>


   </main>
  )
}

export default App
