import React from 'react';
import styled from '@emotion/styled';

const ResultContainer = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Price = styled.p`
    font-size: 30px;
    span {
        font-weight:bold;
    }
`
const Result = ({ result }) => {
    if(Object.keys(result).length === 0) return null;
    return ( 
        <ResultContainer>
            <Price>The price is: <span>{result.PRICE}</span> </Price>
            <Info>Higher today: <span>{result.HIGHDAY}</span> </Info>
            <Info>Lower today: <span>{result.LOWDAY}</span> </Info>
            <Info>24h Change Percentage: <span>{result.CHANGEPCT24HOUR}</span> </Info>
            <Info>Last Update: <span>{result.LASTUPDATE}</span> </Info>
        </ResultContainer>
     );
};
 
export default Result;