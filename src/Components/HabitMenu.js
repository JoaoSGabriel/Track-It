import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import Input from "./Input";

function WeekDay (props) {
    const {letter, index, arr_Days, setArr_Days, able} = props;
    const [is_Select, setIs_Select] = useState(false);

    useEffect(() => {
        for (let i = 0; i < arr_Days.length; i = i + 1) {
            if(arr_Days[i] === index) {
                setIs_Select(true);
            }
        }
    }, []);

    function canClick () {
        if (able === false) {
            selectDay(is_Select);
        } else {
            return;
        }
    }
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
            <p onClick={canClick}>{letter}</p>
        ) : (
            <h1 onClick={canClick}>{letter}</h1>
        )}
        </>
    );
}

const week_Days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default function HabitMenu (props) {
    const {create_Habit, setCreate_Habit} = props;
    const {user_Token} = useContext(UserContext);

    const [arr_Days, setArr_Days] = useState([]);
    const [habit_Name, setHabit_Name] = useState('');
    const [able, setAble] = useState(false);

    function sendHabit (text) {
        if (text === false) {
            setAble(true);
            const bodyRequest = {
            name: habit_Name,
            days: arr_Days
            }
            if (arr_Days.length === 0) {
                alert('Por favor escolha pelo menos um dia para que possa trackear seu novo hábito!');
                setAble(false);
                return;
            }
            setTimeout(() => {
                const promisse = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', bodyRequest, {
                headers: {
                    Authorization: `Bearer ${user_Token}`
                }
                });
                promisse.then(() => {
                    setArr_Days([]);
                    setHabit_Name('');
                    setAble(false);
                    setCreate_Habit(false);
                })
                promisse.catch((resp) => {
                    setAble(false);
                    alert(resp);
                });
            }, 2500)
        } else {
            return
        }
    }

    return(
        <>
            {create_Habit === false ? '' :
            <Menu>
            <Input type="text" placeholder="  nome do hábito" onChange={e => setHabit_Name(e.target.value)} value={habit_Name} required readOnly={able} background={able}></Input>
            <Days>
                {week_Days.map((item, index) => <WeekDay key={index} letter={item} index={index} arr_Days={arr_Days} setArr_Days={setArr_Days} able={able}/>)}
            </Days>
            <Buttons>
                <Cancel onClick={() => setCreate_Habit(false)}>Cancelar</Cancel>
                {able === false ? (
                    <Save onClick={() => sendHabit(able)}>Salvar</Save>
                ) : (
                    <Save><Loading><ThreeDots color="#FFFFFF" height={35} width={50}/></Loading></Save>
                )}
            </Buttons>
            </Menu>}
        </>
    );
}

const Menu = styled.div`
    width: 90%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding: 18px 0 0 0;
    margin: 22px auto 0 auto;
`;

const Days = styled.div`
    width: 90%;
    display: flex;
    margin: 2px 0 0 0;
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
    margin: 30px 0 0 0;
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

const Loading = styled.div`
    width: 50px;
`;