import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import PostCreate from "./pages/PostCreate"
import PostDetails from "./pages/PostDetails"
import Playlists from './pages/Playlists'

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
          <Home/>
        </Route>

        <Route exact path="/post/create">
          <PostCreate/>
        </Route>

        <Route exact path="/post/:id">
          <PostDetails/>
        </Route>

        <Route exact path="/playlists">
          <Playlists/>
        </Route>

        <Route>
          <h1>Erro 404: Página não encontrada</h1>
        </Route>

      </Switch>
    
    </BrowserRouter>
  )
}

export default App;
