import styled from "styled-components";
import Footer from "./GlobalComponents/Footer";
import Top from "./GlobalComponents/Top";

export default function Home () {
    return (
        <Screen>
            <Top />
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