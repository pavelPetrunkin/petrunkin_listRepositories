import React from "react";
import {Route, Switch ,BrowserRouter} from "react-router-dom";
import FindUser from "./containers/FindUser";
import './App.css'
import NotFound from "./containers/NotFound";
import NavBar from "./components/NavBar";
import UserRepositories from "./containers/UserRepositories";
import OrganizationRepositories from "./containers/OrganizationRepositories";

const App = () => {
        return (
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route exact path={"/"} component={FindUser}/>
                    <Route exact path={"/user-repositories"} component={UserRepositories}/>
                    <Route exact path={"/organization-repositories"} component={OrganizationRepositories}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    };
export default App;
