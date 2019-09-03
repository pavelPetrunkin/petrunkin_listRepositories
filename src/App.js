import React, {Component} from "react";
import {Route, Switch ,BrowserRouter} from "react-router-dom";
import UsersRepositories from "./containers/UsersRepositories";
import Error from "./containers/Error";
import Navbar from "./components/Navbar";

export default class App extends Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        <Route exact path={"/"} component={UsersRepositories}/>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            </>
        );

    }
}
