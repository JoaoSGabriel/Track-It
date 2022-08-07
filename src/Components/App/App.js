import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "./GlobalStyle";
import Login from "../Login";
import SingUp from "../SingUp";
import Home from "../Home";
import Habits from "../Habits";
import History from "../History";
import { useState } from "react";

export default function App () {
    const [server_Data, setServer_Data] = useState([]);
    const [user_Token, setUser_Token] = useState('');
    const [percentage, setPercentage] = useState(0);

    return (
        <UserContext.Provider value={{server_Data, setServer_Data, user_Token, setUser_Token, percentage, setPercentage}}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<SingUp />}/>
                    <Route path="/hoje" element={<Home />}/>
                    <Route path="/habitos" element={<Habits />}/>
                    <Route path="/historico" element={<History />}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}