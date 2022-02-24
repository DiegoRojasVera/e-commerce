import { API_URL } from '../Utils/constants';


export async function getOrdersAPI(auth) {
    try {
        const url = `${API_URL}/orders?user=${auth.idUser}`;
        const params = {
            headers: {
                "Content-Type": "apllication/json",
                Authorization: `Bearer ${auth.token}`,
            }
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return null;

    }
}