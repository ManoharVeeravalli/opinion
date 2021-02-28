import React, {Suspense} from 'react';
import './App.css';
import "firebase/firestore";
import "firebase/auth"
import Header from "./layout/Header";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Opinions from "./components/pages/Opinions";
import AddOpinion from "./components/pages/AddOpinion";
import Dialog from './components/ui/Dialog';
import {Center} from "./components/ui/Center";
import {CircularProgress} from "@material-ui/core";

function App() {
    return (
        <BrowserRouter>
            <Dialog>
                <header>
                    <Header/>
                </header>
                <section>
                    <Switch>
                        <Route path="/opinion/:id">
                            <AddOpinion/>
                        </Route>
                        <Route path="/opinion">
                            <Suspense fallback={
                                <Center>
                                    <CircularProgress/>
                                </Center>
                            }>
                                <AddOpinion/>
                            </Suspense>
                        </Route>
                        <Route path="/">
                            <Opinions/>
                        </Route>
                    </Switch>
                </section>
            </Dialog>
        </BrowserRouter>
    );
}

export default App;
