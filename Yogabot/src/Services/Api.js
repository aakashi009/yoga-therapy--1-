const API_KEY= import.meta.env.VITE_API_KEY;
const API_URL=  `${import.meta.env.VITE_API_URL}?key=${API_KEY}`;

export const sendMessageToApi = async (message) => {
    if (!API_KEY) {
        throw new Error("Api_Key is not defined ");
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents:[
                    {
                        parts: [
                            {
                                text:message,
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok){
            const errorText = await response.text();
            console.log("Error from Api Respone:", errorText);
            throw new Error(`HTTP error! status: ${response.status} ${reponse.statusText}`);
        }

        const data = await response.json();
        if(!data || !data.candidates || data.candidates.length === 0) {
            throw new Error("No Respose found");
        }

        return data.candidates[0].content.parts[0].text;

       // console.log(data);
    } catch (error) {
        console.error("Error generating content:",error);
        throw error;
    }
};