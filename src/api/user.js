import { API_URL } from '../Utils/constants'

export async function registerAPI(formData) {

    try {
        console.log("enviando");
        const url = `${API_URL}/auth/local/register`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("hay error...." + error);
        return null;
    }

}

export async function loginApi(formData) {
    try {
        const url = `${API_URL}/auth/local`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;

    }
}

export async function getMeApi(token) {

    try {
        const url = `${API_URL}/users/me`;
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error + "error si");
        return null;
    }
}

export async function updateUserApi(auth, formData) {
    //instalacia para la modificacion de datos en usuario 
    try {
        const url = `${API_URL}/users/${auth.idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(formData),
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}