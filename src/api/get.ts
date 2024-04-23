import axios from 'axios';


export default async function fetchData(url: string): Promise<any> {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw Error('Virhe haettaessa tietoja palvelimelta');
    }
}
