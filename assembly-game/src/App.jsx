import { languages } from "./languages.js";
import { useState } from "react";
import { clsx } from "clsx"



function App() {

    const [currentWord, setCurrentWord] = useState("react");
    const [guessWord,setGuessWord] = useState([]);

    const countWrongLetters=guessWord.map((word) => {
        let count = 0;
        !currentWord.includes(word) ? count++ : null;
        return(
            count
        )
    })

    const gameOver=countWrongLetters>=8;
    const isGameWon=(guessWord.length-countWrongLetters)>=currentWord.length;
    const isGameLost=(guessWord.length-countWrongLetters)<currentWord.length;


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
            <span className="word" key={index}>{letter.toUpperCase()}</span>
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

  return (
   <main>
       <header className="app-header">
           <h1>Assembly: EndGame</h1>
           <p>Guess the word  under 8 attempts to keep the programming world safe from assembly!</p>
       </header>
       <section className="status">

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
           <button className="game">New Game</button>
       </section>


   </main>
  )
}

export default App
