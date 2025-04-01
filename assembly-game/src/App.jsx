import { languages } from "./languages.js";


function App() {

    const langElements=languages.map((item,index)=>{
        const styles={
            backgroundColor : item.backgroundColor,
            color : item.color
        }
        return(
            <span className="lang" key={index} style={styles}>{item.name}</span>
        )
    });


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

   </main>
  )
}

export default App
