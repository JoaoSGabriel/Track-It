import styled from "styled-components";
import Top from "./GlobalComponents/Top";
import Footer from "./GlobalComponents/Footer";

export default function Habits() {
    return(
        <Screen>
            <Top />
            <Footer />
        </Screen>
    );
}

const Screen = styled.div`
width: 375px;
height: 667px;
background-color: #E5E5E5;;
position: relative;
`;