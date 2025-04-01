import { languages } from "./languages.js";
import { useState } from "react";


function App() {

    const [currentWord, setCurrentWord] = useState("react");


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

   </main>
  )
}

export default App
