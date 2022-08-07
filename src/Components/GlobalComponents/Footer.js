import styled from "styled-components";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import UserContext from "../contexts/UserContext";

export default function Footer () {
    const {daily_Habits} = useContext(UserContext);
    const navigate = useNavigate();
    let percentage = 0

        for (let i = 0; i < daily_Habits.length; i = i + 1) {
            if (daily_Habits[i].done === true) {
                percentage = percentage + (1 / daily_Habits.length)*100
            }
        }

    return(
        <Baseboard>
            <Buttons onClick={() => (navigate('/habitos'))}>Hábitos</Buttons>
            <EspecialButton onClick={() => (navigate('/hoje'))}><CircularProgressbar value={percentage} text={`Hoje`} styles={{
                root: {}, 

                path: { stroke: '#FFFFFF', strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.5s ease 0s', transform: 'rotate(0turn)', transformOrigin: 'center center', }, 

                trail: {  stroke: `rgba(62, 152, 199, 0)` , strokeLinecap: 'butt', transform: 'rotate(0.25turn)', transformOrigin: 'center center', }, 

                text: {fill: '#FFFFFF', fontSize: '20px'}, 

                backgroundColor: { fill: '#52B6FF',},}}/></EspecialButton>
            <Buttons onClick={() => (navigate('/historico'))}>Histórico</Buttons>
        </Baseboard>
    );
}

const Baseboard = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 36px;
    background-color: #FFFFFF;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const Buttons = styled.div`
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 17.98px;
    line-height: 22.47px;
    color: #52B6FF;
    cursor: pointer;
`;

const EspecialButton = styled.div`
    width: 91px;
    height: 91px;
    background-color: #52B6FF;
    border-radius: 50%;
    padding: 5px;
    margin: 0 0 40px 0;
    cursor: pointer;
`;