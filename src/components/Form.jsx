import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useCurrency from '../hooks/useCurrency';
import useCrypto from '../hooks/useCrypto';
import Axios from 'axios';
import Error from './Error';

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({ setCrypto, setCurrency }) => {
    const BILLS = [
        {code: 'USD', name: 'US Dollar'},
        {code: 'MXN', name: 'Mexican Peso'},
        {code: 'HNL', name: 'Honduran Lempira'},
        {code: 'EUR', name: 'Euro'},
        {code: 'GBP', name: 'Pound Sterling'}
    ];
    const [ cryptoList, setCryptoList ] = useState([]);
    const [ error, setError ] = useState(false)

    const [ currency, SelectCurrency ] = useCurrency('Choose your bills', 'USD', BILLS);
    const [ crypto, SelectCrypto ] = useCrypto('Choose your crypto', 'BTC', cryptoList);

    useEffect(() => {
        const callAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
            const result = await Axios.get(url);
            setCryptoList(result.data.Data);
        }
        callAPI()
    }, [])

    const getValues = e => {
        e.preventDefault();

        if(currency === '' || crypto === ''){
            setError(true);
            return
        };

        setError(false);    

        setCurrency(currency);
        setCrypto(crypto);
    }
        
    return (
        <form
            onSubmit={getValues}
        >
            {error ? <Error message='All fields required'/> : null}

            <SelectCurrency />

            <SelectCrypto />

            <Button 
                type='submit'
                value='Quote'
            />
        </form>
    );
}
 
export default Form;
