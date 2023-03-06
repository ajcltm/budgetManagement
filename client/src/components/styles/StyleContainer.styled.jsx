import styled from "styled-components";

export const ScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding : 20px;
    width: 100%;
    height: 100%;
`

export const TopicContainer = styled.div`
    background-color: #fff5;
    backdrop-filter: blur(7px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 15px;
    height: 600px;
    margin-bottom: 50px;
`

export const TopicHeader = styled.div`
    width: 100%;
    background-color: #fff4;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    padding-left: 30px;

    span{
        font-weight: 700;
        font-size: 20px;
    }
`

export const TopicBody = styled.div`
    width: 95%;
    height: calc(100% - 80px);
    background-color: #fff4;
    margin: 10px auto;
    border-radius: 15px;
    overflow: auto;

    form{
        height: 100%;
    }
`