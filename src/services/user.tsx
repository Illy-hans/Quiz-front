import { QuizQuestion } from "./questions";

const backendUrl: string = "http://127.0.0.1:3000"; 

export async function getAllUserData(token: string, user_id: string): Promise<Response> {

    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }
            };

        const response: Response = await fetch(`${backendUrl}/users/${user_id}`, requestOptions);
        
        const data = await response.json()

        if (response.status === 200) {
            return {...data, status: response.status};
        } else {
            throw new Error(
                `Received status ${response.status} when calling user data. Expected 200. Message: ${data.message}`
                );
            }
    } catch (error) {
        console.error("Error:", error);
        throw error;
        }
}

type updateUserDataParams = {
    token: string;
    user_id: string;
    email: string;
    password: string;
    username: string;
};


export async function updateUserData(params: updateUserDataParams): Promise<Response> {
    const { token, user_id, email, password, username } = params;
    
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                },
            body: JSON.stringify({email, password, username }),
            };

        const response: Response = await fetch(`${backendUrl}/users/${user_id}`, requestOptions);
        
        const data = await response.json()

        if (response.status === 200) {
            return {...data, status: response.status};
        } else {
            throw new Error(
                `Received status ${response.status} when updating user data. Expected 201. Message: ${data.message}`
                );
            }
    } catch (error) {
        console.error("Error:", error);
        throw error;
        }
}

export async function saveQuiz(token: string, user_id: string, quiz: QuizQuestion[]): Promise<Response> {

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                },
            body: JSON.stringify({
                quiz: quiz,
                }),
            };

        const response: Response = await fetch(`${backendUrl}/users/${user_id}/addquiz`, requestOptions);
        
        const data = await response.json()

        if (response.status === 201) {
            return {...data, status: response.status};
        } else {
            throw new Error(
                `Received status ${response.status} when saving new quiz. Expected 201. Message: ${data.message}`
                );
            }
    } catch (error) {
        console.error("Error:", error);
        throw error;
        }
}