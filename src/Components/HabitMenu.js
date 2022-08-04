import styled from "styled-components";

export default function HabitMenu (props) {
    const {setCreate_Habit} = props;
    return(
        <>
            <Menu>
                <input placeholder="  nome do hábito"></input>
                <Days>
                    <p>D</p>
                    <p>S</p>
                    <p>T</p>
                    <p>Q</p>
                    <p>Q</p>
                    <p>S</p>
                    <p>S</p>
                </Days>
                <Buttons>
                    <Cancel onClick={() => setCreate_Habit(false)}>Cancelar</Cancel>
                    <Save>Salvar</Save>
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