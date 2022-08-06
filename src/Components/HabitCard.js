import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import icone from "../assets/trash.png";
import UserContext from "./contexts/UserContext";

function WeekDayHabit (props) {
    const {name, index, days} = props;
    const [is_Select, setIs_Select] = useState(false);

    useEffect (() => {
        for (let i = 0; i < days.length; i = i + 1) {
            if (index === days[i]) {
                setIs_Select(true);
            }
        }    
    }, [is_Select, days, index]);

    return(
        <>
        {is_Select === false ? (
            <p>{name}</p>
        ) : (
            <h2>{name}</h2>
        )}
        </>
    );
}

const week_Days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default function HabitCard (props) {
    const {id, name, days} = props;
    const {user_Token} = useContext(UserContext);

    function deleteHabit () {
        const text = window.confirm('Você tem certeza que gostaria de apagar o hábito?');
        if (text === true) {
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
            headers: {
                Authorization: `Bearer ${user_Token}`
            }
            });
            promisse.then().catch();
        } else {
            return;
        }
    }

    return(
        <Card>
            <img src={icone} alt="eraser" onClick={deleteHabit}/>
            <h1>{name}</h1>
            <Days>
                {week_Days.map((item, index) => <WeekDayHabit key={index} name={item} index={index} days={days}/>)}
            </Days>
        </Card>
    );
}

const Card = styled.div`
    width: 100%;
    min-height: 91px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    position: relative;
    margin: 0 0 10px 0;
    img {
        width: 13px;
        height: 15px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 11px 10px 0 0;
        cursor: pointer;
    }
    h1 {
        width: 90%;
        padding: 13px 5% 8px 5%;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 19.98px;
        line-height: 24.97px;
        color: #666666;
    }
`;

const Days = styled.div`
    width: 90%;
    display: flex;
    margin: 0 5%;
    padding: 0 0 14px 0;
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
    }
    h2 {
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
        background-color: #CFCFCF;
    }
`;