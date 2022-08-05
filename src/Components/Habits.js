import styled from "styled-components";
import Top from "./GlobalComponents/Top";
import Footer from "./GlobalComponents/Footer";
import { useContext, useEffect, useState } from "react";
import UserContext from "./contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HabitMenu from "./HabitMenu";
import HabitCard from "./HabitCard";

export default function Habits() {
    const {user_Token} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect (() => {
        if(user_Token === '') {
            navigate('/');
        }
    })

    const [habits, setHabits] = useState([]);
    useEffect (() => {
        const promisse = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', {
            headers: {
                Authorization: `Bearer ${user_Token}`
                }
        });
        promisse.then((resp) => {
            setHabits(resp.data);
        })
        promisse.catch();
    })

    const [create_Habit, setCreate_Habit] = useState(false);

    return(
        <Screen>
            <Top />
            <Footer />
            <InnerScreen>
                <NewHabit>
                    <p>Meus Hábitos</p>
                    <button onClick={() => setCreate_Habit(true)}>+</button>
                </NewHabit>
                <HabitMenu create_Habit={create_Habit} setCreate_Habit={setCreate_Habit}/>
                <ListHabits>
                    {habits.length === 0 ? (
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    ) : (
                        habits.map((item, index) => <HabitCard key={index} id={item.id} name={item.name} days={item.days}/>)
                    )}
                </ListHabits>
            </InnerScreen>
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

const NewHabit = styled.div`
    width: 90%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 22px auto 0 auto;
    p{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.98px;
        line-height: 28.72px;
        color: #126BA5;
    }
    button{
        width: 40px;
        height: 35px;
        border-radius: 5px;
        border: none;
        background-color: #52B6FF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 27px;
        color: #FFFFFF;
        cursor: pointer;
    }
`;

const ListHabits = styled.div`
    width: 90%;
    margin: 28px auto 0 auto;
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.98px;
        line-height: 22.47px;
        text-align: center;
        color: #666666;
    }
`;