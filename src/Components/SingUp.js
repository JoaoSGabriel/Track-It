import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logotipo from "../assets/logo.jpeg";

export default function SingUp () {
    const navigate = useNavigate();

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
                <input placeholder="  email"></input> 
                <input placeholder="  senha"></input>
                <input placeholder="  nome"></input> 
                <input placeholder="  foto"></input>
                <button>Entrar</button>
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
display: flex;
flex-direction: column;
width: 100%;
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
    width: 90%;
    height: 45px;
    border-radius: 5px;
    border: none;
    background-color: #52B6FF;
    margin: 0 auto 25px auto;
    font-family: 'legend Deca';
    font-weight: 400;
    font-size: 20.98px;
    line-height: 26.22px;
    color: #FFFFFF;
    cursor: pointer;
}
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