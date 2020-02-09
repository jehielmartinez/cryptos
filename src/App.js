import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import image from './cryptos.png';
import Form from './components/Form';
import axios from 'axios';
import Result from './components/Result';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  const [ currency, setCurrency ] = useState('');
  const [ crypto, setCrypto] = useState('');
  const [ result, setResult ] = useState({});

  useEffect(() => {
    if(currency === '') return;

    const getConversion = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
      const ApiResult = await axios.get(url);

      setResult(ApiResult.data.DISPLAY[crypto][currency]);
    }

    getConversion();
  }, [currency, crypto])

  return (
    <Container>
      <div>
        <Image
          src={image}
          alt='crypto image'
        />
      </div>
      <div>
        <Heading>Cryptocurrency</Heading>
        <Form 
          setCurrency = {setCurrency}
          setCrypto = {setCrypto}
        />
        <Result result={result}/>
      </div>
    </Container>
  );
}

export default App;
