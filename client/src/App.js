import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Detail from './components/Detail'
import Form from './components/Form';


function App() {
  return (
    <>
    <Switch> 
    <Route exact path={'/'} component={Landing}/>
    <Route exact path={'/home'} component={Home}/>
    <Route exact path={'/detail/:idRecipe'} component={Detail}/>
    <Route exact path={'/createRecipe'} component={Form}/>
    </Switch> 
    </>
  );
}

export default App;
