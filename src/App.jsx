import { useEffect, useState } from 'react'
import supabase from './supabase';

const CATEGORIES = [
  { name: "Khairul Aming", color: "#75282b" },
  { name: "Hamdan", color: "#c85947" },
  { name: "Hazwan Cooks", color: "#ffc88f" },
];

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  //ToDo: Add Loading.. page during first load
  useEffect(function() {
    async function getRecipes(){
      let { data: resepi, error } = await supabase
      .from('resepi')
      .select('*');
      setRecipes(resepi);
    }
    getRecipes();
  }, []);

  return (
    <>
      <Header/>
      <SearchBar search={search} setSearch={setSearch}/>
      <main className="main">
        <AuthorList/>
        <RecipeList recipes={recipes} search={search}/>
      </main>
      <Footer/>
    </>
  )
}

function Header(){
  return (
  <header className="header">
    <h1>
      Resepi Berbuka Collection
    </h1>
    <h5>
      Compilation of various "30Hari 30Resepi Berbuka" series
    </h5>
  </header>
  );
}

function SearchBar({search, setSearch}){
  return(
    <div className="search-container">
      <input  
      type="text" 
      className="search-input" 
      placeholder="Search for recipe.." 
      value={search}
      onChange= {(e)=>setSearch(e.target.value)}>
      </input>
    </div>
    
  );
}

function AuthorList(){
  return(
  <>
    <aside>
      <ul>
        {CATEGORIES.map((cat) => (
          <li className="category" key={cat.name}>
            <button style={{backgroundColor: cat.color}}>{cat.name}</button>
            </li>
        )
        )}
      </ul>
    </aside>
  </>
  );
}

function RecipeList({recipes, search}){
  return(
    <>
      <section>
        <ul className="recipes-container">
          {recipes.filter((recipe) => {
            return search.toLowerCase() === "" ? recipe : recipe.title.toLowerCase().includes(search);
          }).map((recipe) => (
            <li className="recipes" key={recipe.id}>
              <a href={recipe.source} target="blank">
                <article className="article">
                  <img src={recipe.thumbnail} className="image"/>
                  <h3 className="image-header-text">{recipe.title}</h3>
                  <p className="image-para-text">{recipe.author} <span className="year-text">{recipe.year}</span> </p> 
                </article>
                
              </a>
                
            </li>
          )
          )}
        </ul>
      </section>
    </>
  );
}

function Footer(){
  return(
    <footer className="footer">
      <p>
        Made by Jalaludin Zakaria
      </p>
    </footer>
  );
}

export default App
