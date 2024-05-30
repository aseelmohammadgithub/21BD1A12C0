const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

const numbers = new Array(20);

const fetchNumbers = async (numberType) => {
    try {
        let url = '';
        switch (numberType) {
            case 'p':
                url = 'http://thirdpartyserver.com/primes';
                break;
            case 'f':
                url = 'http://thirdpartyserver.com/fibo';
                break;
            case 'e':
                url = 'http://thirdpartyserver.com/even';
                break;
            case 'r':
                url = 'http://thirdpartyserver.com/rand';
                break;
            default:
                throw new Error('Invalid number type');
        }
        
        const response = await axios.get(url, {
            headers: {
                clientId: '463405d0-8fd1-4c98-a09a-f03af35e3377',
                clientSecret: 'HeAwCDJxDaplVPDK',
                ownerName: 'Shaik Mohammad Aseel'
            },
            timeout: 500 
        });
        return response.data.numbers;
    } catch (error) {
        
        console.error(`Error fetching ${numberType} numbers:`, error.message);
        return [];
    }
};

app.get('/numbers/:numberType', async (req, res) => {
    try {
        const { numberType } = req.params;
        const fetchedNumbers = await fetchNumbers(numberType);

        fetchedNumbers.forEach(num => {
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        });
        if (numbers.length > 20) {
            numbers.splice(0, numbers.length - 20);
        }
        const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        const response = {
            windowPrevState: [],
            windowCurrState: numbers,
            numbers: fetchedNumbers,
            avg: avg.toFixed(2)
        };

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

