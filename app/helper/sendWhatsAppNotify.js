const axios = require("axios");

const helper = async (e_phone_number, content, setting) => {

    try {

        const res = await axios.post('https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
        {
            "phone": e_phone_number,
            "messageType": "text",
            "body": `${content}`
        },
         {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'API-key': setting.e_setting
            }
        })

        console.log("[TapTalk] : ", res.data)

        return res

    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
    
}

module.exports = helper;