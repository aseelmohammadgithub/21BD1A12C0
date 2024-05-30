const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const numbers = [];
const fetchNumbers = async (numberType) => {
    try {
        let url = '';
        switch (numberType) {
            case 'primes':
                url = 'http://20.244.56.144/test/primes';
                break;
            case 'fibo':
                url = 'http://20.244.56.144/test/fibo';
                break;
            case 'even':
                url = 'http://20.244.56.144/test/even';
                break;
            case 'rand':
                url = 'http://20.244.56.144/test/rand';
                break;
            default:
                throw new Error('Invalid number type');
        }
        
        const response = await axios.get(url, {
            headers: {
                Authorization:`Bearer osDvxf`,
                clientID: '463405d0-8fd1-4c98-a09a-f03af35e3377',
                clientSecret: 'HeAwCDJxDaplVPDK',
                ownerName: 'Shaik Mohammad Aseel'
            }
        });
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching ${numberType} numbers:`, error.message);
        throw error;
    }
};
app.get('/:numberType', async (req, res) => {
    try {
        const { numberType } = req.params;
        const fetchedNumbers = await fetchNumbers(numberType);

        numbers.push(...fetchedNumbers);
        if (numbers.length > 20) {
            numbers.splice(0, numbers.length - 20);
        }

        const windowSize = 10;
        const windowCurrState = numbers.slice(-windowSize);
        const avg = windowCurrState.reduce((acc, curr) => acc + curr, 0) / windowSize;

        const response = {
            windowPrevState: numbers.slice(0, -windowSize),
            windowCurrState,
            numbers: windowCurrState,
            avg: avg.toFixed(2)
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
