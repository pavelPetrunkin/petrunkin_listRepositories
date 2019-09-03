import React from "react";
import {Route, Switch ,BrowserRouter} from "react-router-dom";
import UsersRepositories from "./containers/UsersRepositories";
import Error from "./containers/Error";

const App = () => {

        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={UsersRepositories}/>
                        <Route component={Error}/>
                    </Switch>
                </BrowserRouter>
            </>
        );

    };
export default App;
