import styled from "styled-components";

export default function Input ({...others}) {
    return(
        <Wrappler {...others}></Wrappler>
    );
}

const Wrappler = styled.input`
    width: 90%;
    height: 45px;
    margin: 0 auto 6px auto;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-weight: 400;
    font-size: 19.98px;
    line-height: 24.97px;
    background-color: ${(props) => !props.background ? '' : '#F2F2F2'};
    color: #DBDBDB;
    :focus {
        outline: 0;
    }
`;