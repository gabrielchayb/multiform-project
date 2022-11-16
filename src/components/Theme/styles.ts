import styled from "styled-components";

export const Container = styled.div`
    background-color: #02044A;
    color: #FFF;
    margin-top: -10px;
    margin-left: -10px;
    min-width: 100vw;
    min-height: 100vh;
    webkit-scrollbar {width: 0! important}

`;

export const Area = styled.div`
    max-width: 75%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Steps = styled.div`
    flex: 1;
    display: flex;
`;

export const Sidebar = styled.div`
    width: 250px;
    border-right: 1px solid #16195C;
`;

export const Page = styled.div`
    flex: 1;
    padding-left: 40px;
    padding-top: 40px;
`;