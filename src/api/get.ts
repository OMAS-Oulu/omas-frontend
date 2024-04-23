export default async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status + ' ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw Error('Virhe haettaessa tietoja palvelimelta');
    }
}