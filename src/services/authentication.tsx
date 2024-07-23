
const backendUrl: string = "http://127.0.0.1:3000"; 

export async function signUp(username: string, email: string, password: string): Promise<Response> {

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        };
    
        const response: Response = await fetch(`${backendUrl}/users`, requestOptions);
        const data = await response.json();
    
        if (response.status === 201) {
            return {...data, status: response.status};
        } else {
            throw new Error(
                `Received status ${response.status} when signing up. Expected 201. Message: ${data.message}`
                );
            }
    } catch (error) {
        console.error("Error:", error);
        throw error;
        }
}

export interface AuthenticationResponse {
    token: string,
    user_id: string,
    username: string, 
    message: string,
}

// The authentication response is extended as response.status is not part of the return parameter
export interface ExtendedAuthenticationResponse extends AuthenticationResponse {
    status: number;
}

export async function login(email: string, password: string): Promise<ExtendedAuthenticationResponse> {
    
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
    
        const response: Response = await fetch(`${backendUrl}/users/authenticate`, requestOptions);
        const data: AuthenticationResponse = await response.json();
    
        if (response.status === 200) {
            return {...data, status: response.status};
        } else {
            throw new Error(
                `Received status ${response.status} when logging in. Expected 200. Message: ${data.message}`
                );
            }
            
    } catch (error) {
        console.error("Error:", error);
        throw error;
        }
}