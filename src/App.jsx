import { useEffect, useState } from 'react'
import supabase from './supabase';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState("all");

  useEffect(function() {
    async function getRecipes(){
      setIsLoading(true);
      let query = supabase.from('resepi').select('*').order('id',{ascending: true});
      let authorQuery = supabase.from('author').select('*').order('id',{ascending: true});

      if(currentAuthor !== "all")
        query = query.eq("author", currentAuthor);

      const { data: resepi, error } = await query;
      const { data: author, error2 } = await authorQuery;

      if(!error) setRecipes(resepi);
      else alert("There was a problem retrieving website data");

      if(!error2) setAuthors(author);
      else alert("There was a problem retrieving data");
      setIsLoading(false);
    }
    getRecipes();
  }, [currentAuthor]);


  useEffect(() => {
    const test = recipes.filter((recipe) => {
      return search.toLowerCase() === "" ? recipe : recipe.video_title.toLowerCase().includes(search);
    });
    setFilteredList(test);
  }, [recipes, search]);

  return (
    <div className='App'>
      <Header/>
      <SearchBar search={search} setSearch={setSearch} filteredList={filteredList} recipes={recipes}/>
      <main className="main">
      
        {isLoading ? <><div></div><Loader/></>:<><AuthorList authors={authors} setCurrentAuthor={setCurrentAuthor}/><RecipeList filteredList={filteredList}/></>}
        
      </main>
      <Footer/>
    </div>
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

function SearchBar({search, setSearch,filteredList,recipes}){
  return(
    <div className="search-container">
      <input  
      type="text" 
      className="search-input" 
      placeholder="Search for recipe.." 
      value={search}
      onChange= {(e)=>setSearch(e.target.value.toLowerCase())}>
      </input>
      <span>{filteredList.length} of {recipes.length} recipes displayed.</span>
    </div>
    
  );
}

function AuthorList({authors, setCurrentAuthor}){
  return(
  <>
    <aside>
      <ul>
        <li className="category">
          <button onClick={()=>setCurrentAuthor("all")}>
            All
          </button>
        </li>
        {authors.map((cat) => (
          <li className="category" key={cat.author}>
            <button style={{backgroundColor: cat.color}} onClick={()=>setCurrentAuthor(cat.author)}>{cat.author}</button>
            </li>
        )
        )}
      </ul>
    </aside>
  </>
  );
}

function RecipeList({filteredList}){
  return(
    <>
      <section>
        <ul className="recipes-container">
          {filteredList.map((recipe) => (
            <li className="recipes" key={recipe.id}>
              <a href={recipe.post_link} target="blank">
                <article className="article">
                  <img src={recipe.thumbnail_url} className="image"/>
                  <h3 className="image-header-text">{recipe.video_title}</h3>
                  <p className="image-para-text">{recipe.author} <span className="year-text">{recipe.year_posted}</span> </p> 
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

function Loader(){
  return <h2 className='loading-text'> Loading...</h2>
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
