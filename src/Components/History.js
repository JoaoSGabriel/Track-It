import styled from "styled-components";
import Footer from "./GlobalComponents/Footer";
import Top from "./GlobalComponents/Top";

export default function History () {
    return(
        <Screen>
            <Top />
            <InnerScreen>
                <p>Histórico</p>
                <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
            </InnerScreen>
            <Footer/>
        </Screen>
    );
}

const Screen = styled.div`
width: 375px;
height: 667px;
background-color: #F2F2F2;
position: relative;
`;

const InnerScreen = styled.div`
    width: 100%;
    height: 527px;
    padding: 70px 0 0 0;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.98px;
        line-height: 28.72px;
        color: #126BA5;
        margin: 28px 0 0 17px;
    }
    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.98px;
        line-height: 22.47px;
        color: #666666;
        margin: 17px 0 0 17px;
    }
`;