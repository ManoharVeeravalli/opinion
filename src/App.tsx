import React from 'react';
import './App.css';
import "firebase/firestore";
import "firebase/auth"
import Header from "./layout/Header";
import {useFirebaseAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {CircularProgress} from "@material-ui/core";
import {Center} from "./components/ui/Center";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Opinions from "./components/pages/Opinions";
import AddOpinion from "./components/pages/AddOpinion";
import Container from '@material-ui/core/Container';
import Dialog from './components/ui/Dialog';

function App() {
    const {loading, currentUser} = useFirebaseAuth();

    if (loading) {
        return <Center><CircularProgress/></Center>
    }
    return (
        <BrowserRouter>
            <AuthContext.Provider value={currentUser}>
                <Dialog>
                    <header>
                        <Header/>
                    </header>
                    <Container maxWidth={false}>
                        <section>
                            <Switch>
                                <Route path="/opinion">
                                    <AddOpinion/>
                                </Route>
                                <Route path="/">
                                    <Opinions/>
                                </Route>
                            </Switch>
                        </section>
                    </Container>
                </Dialog>

            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
