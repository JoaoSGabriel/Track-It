import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logotipo from "../assets/logo.jpeg";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';

export default function SingUp () {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [create_Email, setCreate_Email] = useState('');
    const [create_Key, setCreate_Key] = useState('');
    const [create_Name, setCreate_Name] = useState('');
    const [create_ProfileImg, setCreate_ProfileImg] = useState('');
    function makeAccount (e) {
        e.preventDefault();
        const dataCreate = {
            email: create_Email,
            name: create_Name,
            image: create_ProfileImg,
            password: create_Key
        }
        const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', dataCreate);

        promisse.then(() => {
            setIsLoading(false)
            setTimeout(() => {
                setCreate_Email('');
                setCreate_Key('');
                setCreate_Name('');
                setCreate_ProfileImg('');
                navigate('/')
            }, 2500);
        })
        promisse.catch(() => {
            setCreate_Email('');
            setCreate_Key('');
            setCreate_Name('');
            setCreate_ProfileImg('');
            alert('Ops! Parece que não foi possível enviar sua solicitação, tente novamente!');
        })
    }

    function loginAccount () {
        navigate('/')    
    }

    return (
        <LoginScreen>
            <TextTitle>
                <img src={logotipo} alt="logo"></img>
                <p>TrackIt</p>
            </TextTitle>
            <ButtonsLogin>
                <form onSubmit={makeAccount}>
                <input type="email" placeholder="  email" onChange={e => setCreate_Email(e.target.value)} value={create_Email} required></input> 
                <input type="password" placeholder="  senha" onChange={e => setCreate_Key(e.target.value)} value={create_Key} required></input>
                <input type="text" placeholder="  nome" onChange={e => setCreate_Name(e.target.value)} value={create_Name} required></input> 
                <input type="URL" placeholder="  foto" onChange={e => setCreate_ProfileImg(e.target.value)} value={create_ProfileImg} required></input>
                <button type="submit">{isLoading === true ? 'Cadastrar' : <Loading><ThreeDots color="#FFFFFF" height={45} width={80}/></Loading>}</button>
                </form>
            </ButtonsLogin>
            <Registration onClick={loginAccount}>Já tem uma conta? Faça login!</Registration>
        </LoginScreen>
    );
}

const LoginScreen = styled.div`
width: 375px;
height: 667px;
background-color: #FFFFFF;
`;

const TextTitle = styled.div`
font-family: 'Playball';
font-weight: 400;
font-size: 68.98px;
line-height: 86.23px;
text-align: center;
color: #126BA5;
margin: 0 0 32px 0;
img {
    width: 155px;
    height: 90px;
    margin: 68px 0 0 0;
}
`;

const ButtonsLogin = styled.div`
form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
input {
    width: 90%;
    height: 45px;
    margin: 0 auto 6px auto;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 19.98px;
    line-height: 24.97px;
    color: #DBDBDB;
}
input:focus{
    outline: 0;
}
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 45px;
    border-radius: 5px;
    border: none;
    background-color: #52B6FF;
    margin: 0 auto 25px auto;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 20.98px;
    line-height: 26.22px;
    color: #FFFFFF;
    cursor: pointer;
}
`;

const Loading = styled.div`
    width: 80px;
`;

const Registration = styled.div`
width: 100%;
font-family: 'Lexend Deca';
font-weight: 400;
font-size: 13.98px;
line-height: 17.47px;
text-align: center;
text-decoration: underline;
color: #52B6FF;
cursor: pointer;
`;