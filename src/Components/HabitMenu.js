import { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "./contexts/UserContext";

function WeekDay (props) {
    const {letter, index, arr_Days, setArr_Days} = props;
    const [is_Select, setIs_Select] = useState(false);

    function selectDay (text){
        if (text === true) {
            setIs_Select(!is_Select);
            for (let i = 0; i < arr_Days.length; i = i + 1) {
                if (arr_Days[i] === index) {
                    arr_Days.splice(i, 1);
                }
            }
        }
        if (text === false) {
            setIs_Select(!is_Select);
            setArr_Days([...arr_Days, index]);
        }
    }

    return(
        <>
        {is_Select === false ? (
            <p onClick={() => selectDay(is_Select)}>{letter}</p>
        ) : (
            <h1 onClick={() => selectDay(is_Select)}>{letter}</h1>
        )}
        </>
    );
}

const week_Days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default function HabitMenu (props) {
    const {setCreate_Habit} = props;
    const {user_Token} = useContext(UserContext);

    const [arr_Days, setArr_Days] = useState([]);
    const [habit_Name, setHabit_Name] = useState('');

    function sendHabit () {
        const bodyRequest = {
            name: habit_Name,
            days: arr_Days
        }
        if (arr_Days.length === 0) {
            alert('Por favor escolha pelo menos um dia para que possa trackear seu novo hábito!');
            return;
        }
        const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', bodyRequest, {
            headers: {
                Authorization: `Bearer ${user_Token}`
            }
        });
        promisse.then(() => {
            setArr_Days([]);
            setHabit_Name('');
            setCreate_Habit(false);
        })
        promisse.catch();
    }

    return(
        <>
            <Menu>
                <input type="text" placeholder="  nome do hábito" onChange={e => setHabit_Name(e.target.value)} value={habit_Name}></input>
                <Days>
                    {week_Days.map((item, index) => <WeekDay key={index} letter={item} index={index} arr_Days={arr_Days} setArr_Days={setArr_Days}/>)}
                </Days>
                <Buttons>
                    <Cancel onClick={() => setCreate_Habit(false)}>Cancelar</Cancel>
                    <Save onClick={sendHabit}>Salvar</Save>
                </Buttons>
            </Menu>
        </>
    );
}

const Menu = styled.div`
    width: 90%;
    height: 180px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin: 22px auto 0 auto;
    input {
        width: 90%;
        height: 45px;
        margin: 18px 5% 10px 5%;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        box-sizing: border-box;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #DBDBDB;
    }
`;

const Days = styled.div`
    width: 90%;
    display: flex;
    margin: 0 5%;
    p {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        margin: 0 4px 0 0;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #DBDBDB;
        cursor: pointer;
    }
    h1 {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px solid #CFCFCF;
        margin: 0 4px 0 0;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #FFFFFF;
        cursor: pointer;
        background-color: #CFCFCF;
    }
`;

const Buttons = styled.div`
    width: 90%;
    margin: 30px 5% 0 5%;
    display: flex;
    align-items: center;
    justify-content: end;
`;

const Cancel = styled.div`
    width: 84px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 15.98px;
    line-height: 19.97px;
    color: #52B6FF;
    cursor: pointer;
`;
const Save = styled.div`
    width: 84px;
    height: 35px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #52B6FF;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 15.98px;
    line-height: 19.97px;
    color: #FFFFFF;
    cursor: pointer;
`;