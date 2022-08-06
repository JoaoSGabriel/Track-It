import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./GlobalComponents/Footer";
import Top from "./GlobalComponents/Top";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import dayjs from "dayjs";

function DailyHabit (props) {
    const {name, currentSequence, highestSequence} = props;
    return(
        <>
            <Menu>
                <Text>
                    <p>{name}</p>
                    <h1>Sequência atual: {currentSequence} dias<br/>Seu recorde: {highestSequence} dias</h1>
                </Text>
                <button></button>
            </Menu>
        </>
    );
}

export default function Home () {
    const {user_Token} = useContext(UserContext);
    const [daily_Habits, setDaily_Habits] = useState([]);
    const spreadDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const [weekDay, setWeekDay] = useState('');
    
    useEffect (() => {
        for (let i = 0; i < spreadDays.length; i = i + 1) {
            if (dayjs().day() === i) {
                setWeekDay(spreadDays[i]);
            }
        }
        const promisse = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
            headers: {
                Authorization: `Bearer ${user_Token}`
            }
        });
        promisse.then((resp) => {
            setDaily_Habits(resp.data);
        });
        promisse.catch();
    }, []);
    return (
        <Screen>
            <Top />
            <InnerScreen>
                <Header>
                    <p>{weekDay}, {(dayjs().format('DD/MM'))}</p>
                    <h1>Nenhum hábito concluído ainda</h1>
                </Header>
                {daily_Habits.map((item, index)=> <DailyHabit key={index} name={item.name} currentSequence={item.currentSequence} highestSequence={item.highestSequence}/>)}
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
`;

const Header = styled.div`
    width: 90%;
    margin: 28px 5%;
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.98px;
        line-height: 28.72px;
        color: #126BA5;
    }
    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.98px;
        line-height: 22.47px;
        color: #BABABA;
    }
`;

const Menu = styled.div`
    width: 90%;
    min-height: 94px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding: 0 15px;
    margin: 0 5% 10px 5%;
    button {
        width: 69px;
        height: 69px;
        border-radius: 5px;
        border: none;
        background-color: #E7E7E7;
    }
`;

const Text = styled.div`
    min-height: 69px;
    p{
        max-width: 215px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #666666;
        margin: 0 0 7px 0;
        padding: 13px 0 0 0;
    }
    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 12.98px;
        line-height: 16.22px;
        color: #666666;
        padding: 0 0 17px 0;
    }
`;