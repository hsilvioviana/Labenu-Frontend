import { Switch, Route, BrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import PostCreate from "./pages/PostCreate"
import PostDetails from "./pages/PostDetails"
import Playlists from "./pages/Playlists"
import PlaylistDetails from "./pages/PlaylistDetails"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { goToHome, goToLogout, goToPlaylists, goToPostCreate } from "./routes/coordinator"


function App() {
  
  return (
    <BrowserRouter>
    
      <Switch>
        
        <Route exact path="/login">
          <Login/>
        </Route>

        <Route exact path="/signup">
          <Signup/>
        </Route>

        <Route exact path="/">
          <Header 
          b1={{name: "Playlists", function: goToPlaylists}}
          b2={{name: "Criar Post", function: goToPostCreate}}
          b3={{name: "Logout", function: goToLogout}}
          />
          <Home/>
        </Route>

        <Route exact path="/post/create">
          <PostCreate/>
        </Route>

        <Route exact path="/post/:id">
          <PostDetails/>
        </Route>

        <Route exact path="/playlists">
          <Header 
          b1={{name: "Músicas", function: goToHome}}
          />
          <Playlists/>
        </Route>

        <Route exact path="/playlist/:id">
          <Header 
          b1={{name: "Playlists", function: goToPlaylists}}
          />
          <PlaylistDetails/>
        </Route>

        <Route>
          <h1>Erro 404: Página não encontrada</h1>
        </Route>

      </Switch>
    
      <Footer/>
    </BrowserRouter>
  )
}

export default App
