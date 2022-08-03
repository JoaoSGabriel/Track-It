import styled from "styled-components";
import Top from "./GlobalComponents/Top";

export default function Home () {
    return (
        <Screen>
            <Top />
        </Screen>
    );
}

const Screen = styled.div`
width: 375px;
height: 667px;
background-color: #FFFFFF;
position: relative;
`;