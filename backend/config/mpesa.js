const axios = require('axios');
require('dotenv').config();

const generateAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: { Authorization: `Basic ${auth}` }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Mpesa Token Error:', error);
        return null;
    }
};

const stkPush = async (phone, amount, orderId) => {
    const token = await generateAccessToken();
    if (!token) return { success: false, message: 'Failed to authenticate' };

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const passkey = process.env.MPESA_PASSKEY;
    const shortcode = process.env.MPESA_SHORTCODE;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const request = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
        AccountReference: `Order_${orderId}`,
        TransactionDesc: 'Tire Purchase Payment'
    };

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', request, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { success: true, message: 'Payment request sent', response: response.data };
    } catch (error) {
        console.error('Mpesa STK Push Error:', error);
        return { success: false, message: 'Payment request failed' };
    }
};

module.exports = { stkPush };
