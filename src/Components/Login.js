import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logotipo from "../assets/logo.jpeg";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "./contexts/UserContext";
import Input from "./Input";

export default function Login () {
    const navigate = useNavigate();
    const {setServer_Data, setUser_Token} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const [account_Email, setAccount_Email] = useState('');
    const [account_Key, setAccount_Key] = useState('');
    const [able, setAble] = useState(false);

    function sendLogin (e) {
        e.preventDefault();
        setAble(true);
        const dataLogin = {
            email: account_Email,
	        password: account_Key
        }
        const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', dataLogin)

        promisse.then((resp) => {
            setIsLoading(false);
            setServer_Data(resp.data);
            setUser_Token(resp.data.token);
            setTimeout(() => {
                setAccount_Email('');
                setAccount_Key('');
                navigate('/hoje')
            }, 2500);
        })

        promisse.catch(() => {
            setAccount_Email('');
            setAccount_Key('');
            setAble(false);
            alert('Ops! Algo deu errado com a sua solicitação, tente novamente.')
        })
    }

    function createAccount () {
        navigate('/cadastro')    
    }

    return (
        <LoginScreen>
            <TextTitle>
                <img src={logotipo} alt="logo"></img>
                <p>TrackIt</p>
            </TextTitle>
            <ButtonsLogin>
                <form onSubmit={sendLogin}>
                <Input type="email" placeholder="  email" onChange={e => setAccount_Email(e.target.value)} value={account_Email} required readOnly={able} background={able}></Input> 
                <Input type="password" placeholder="  senha" onChange={e => setAccount_Key(e.target.value)} value={account_Key} required readOnly={able} background={able}></Input>
                <button type="submit">{isLoading === true ? 'Entrar' : <Loading><ThreeDots color="#FFFFFF" height={45} width={80}/></Loading>}</button>
                </form>
            </ButtonsLogin>
            <Registration onClick={createAccount}>Não tem uma conta? Cadastre-se!</Registration>
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
    font-family: 'lexend Deca';
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