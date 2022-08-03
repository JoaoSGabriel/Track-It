import styled from "styled-components";

export default function Top () {
    return (
        <>
            <Navbar>
                <p>TrackIt</p>
                <img src="" alt="profileimg"/>
            </Navbar>
        </>
    );
}

const Navbar = styled.div`
    width: 375px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 0;
    left: 0;
    p{
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.98px;
        line-height: 48.73px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;