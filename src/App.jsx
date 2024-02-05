import { useEffect, useState } from 'react'
import supabase from './supabase';

const CATEGORIES = [
  { name: "Khairul Aming", color: "#75282b" },
  { name: "Hamdan", color: "#c85947" },
  { name: "Hazwan Cooks", color: "#ffc88f" },
];

const testData = [
  {
    id: 1,
    title: "Puasa ke-29 : Popia Simpul & Popia Seaweed",
    source: "https://www.tiktok.com/@khairulaming/video/7223979433693105414?lang=en",
    thumbnail: "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/562aafd704944d798149d29564f5d882_1681963813~tplv-photomode-zoomcover:480:480.avif?x-expires=1707220800&x-signature=2E%2BAxMewOZtNgjfA2c9iINlZ0bc%3D",
    author: "Khairul Aming",
    year: "2023"
  },
  {
    id: 2,
    title: "Puasa ke-28 : Pulut Kuning",
    source: "https://www.tiktok.com/@khairulaming/video/7223637038665436422?is_from_webapp=1&sender_device=pc&web_id=6984765835533485570",
    thumbnail: "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/2de8bc856b3a40e9b2ec9cec13c5994d_1681884091~tplv-photomode-zoomcover:480:480.avif?x-expires=1707220800&x-signature=7FOYfSP82OuM0q68%2FBUgMAVYyEw%3D",
    author: "Khairul Aming",
    year: "2023"
  },
  {
    id: 3,
    title: "Puasa ke-27 : Rendang 1 Ekor Ayam",
    source: "https://www.tiktok.com/@khairulaming/video/7223249820029390086?lang=en",
    thumbnail: "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/04f2a41ad59a4365b3320e8d95d3d928_1681793916~tplv-photomode-zoomcover:480:480.avif?x-expires=1707289200&x-signature=42szCULEhWEN90MtxiIrN53T6XU%3D",
    author: "Khairul Aming",
    year: "2023"
  },
];

function App() {
  const [recipes, setRecipes] = useState([]);

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
      <main className="main">
        <AuthorList/>
        <RecipeList recipes={recipes}/>
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

function RecipeList({recipes}){
  return(
    <>
      <section>
        <ul className="recipes-container">
          {recipes.map((recipe) => (
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
