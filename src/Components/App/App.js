import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Login from "../Login";
import SingUp from "../SingUp";
import Home from "../Home";

export default function App () {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/cadastro" element={<SingUp />}/>
                    <Route path="/hoje" element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}