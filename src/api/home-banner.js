import { API_URL } from '../Utils/constants';

export async function getBannersApi() {
    try {
        const url = `${API_URL}/home-banners?_sort=position:DESC`;
        const response = await fetch(url);
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
        return null;

    }
}