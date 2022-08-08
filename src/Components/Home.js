import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./GlobalComponents/Footer";
import Top from "./GlobalComponents/Top";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import dayjs from "dayjs";
import confirm from "../assets/Vector.png";

function DailyHabit (props) {
    const {user_Token, id, name, done, currentSequence, highestSequence, update, setUpdate} = props;
    
    function doneHabit () {
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, {
            headers: {
                Authorization: `Bearer ${user_Token}`
            }
        });
        promisse.then(() => {
            setUpdate(!update);
        }).catch(() => {
            alert('Ops, algo deu errado com a sua solicitação');
        });
    }

    function deselect () {
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, {
            headers: {
                Authorization: `Bearer ${user_Token}`
            }
        });
        promisse.then(() => {
            setUpdate(!update);
        }).catch(() => {
            alert('Ops, algo deu errado com a sua solicitação');
        });
    }

    return(
        <>
            <Menu>
                <Text>
                    <p>{name}</p>
                    {done === false ? (
                        <h1>Sequência atual: {currentSequence} dias</h1>
                    ) : (
                        <h1>Sequência atual: <strong>{currentSequence} dias</strong> </h1>
                    )}
                    {currentSequence === highestSequence && highestSequence > 0 && done === true ? (
                        <h1>Seu recorde: <strong>{highestSequence} dias</strong></h1>
                    ) : (
                        <h1>Seu recorde: {highestSequence} dias</h1>
                    )}
                </Text>
                {done === false ? (
                    <button onClick={doneHabit}><img src={confirm} alt="vector"/></button>
                ) : (
                    <Selectbutton onClick={deselect}><img src={confirm} alt="vector"/></Selectbutton>
                )}
            </Menu>
        </>
    );
}

export default function Home () {
    const {user_Token, daily_Habits, setDaily_Habits, percentage, setPercentage} = useContext(UserContext);
    const spreadDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const [weekDay, setWeekDay] = useState('');
    const [update, setUpdate] = useState(true);

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
            setUpdate(false);
        });
        promisse.catch();

        let habitsdone = 0;
        for (let i = 0; i < daily_Habits.length; i = i + 1) {
            if (daily_Habits[i].done === true) {
                habitsdone = habitsdone + 1;
            }
        }
        if (habitsdone > 0) {
            setPercentage(habitsdone * (1 / daily_Habits.length)*100)
        }
        if (habitsdone === 0) {
            setPercentage(habitsdone);
        }
    }, [update]);
    let value = percentage.toFixed();

    return (
        <Screen>
            <Top />
            <InnerScreen>
                <Header>
                    <p>{weekDay}, {(dayjs().format('DD/MM'))}</p>
                    {value > 0 ? (
                        <h1><strong>{value}% dos hábitos concluídos</strong></h1>
                    ) : (
                        <h1>Nenhum hábito concluído ainda</h1>
                    )}
                </Header>
                {daily_Habits.map((item, index)=> <DailyHabit key={index} id={item.id} name={item.name} currentSequence={item.currentSequence} highestSequence={item.highestSequence} user_Token={user_Token} done={item.done} update={update} setUpdate={setUpdate}/>)}
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
    strong {
        color: #8FC549;
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
        cursor: pointer;
    }
`;

const Selectbutton = styled.div`
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: none;
    background-color: #8FC549;
    cursor: pointer;
`;

const Text = styled.div`
    min-height: 69px;
    padding: 13px 0 17px 0;
    p{
        max-width: 215px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #666666;
        margin: 0 0 7px 0;
    }
    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 12.98px;
        line-height: 16.22px;
        color: #666666;
    }
    strong {
        color: #8FC549;
    }
`;