// Get datas recipes
export async function get(url) {

    try {
        const response = await fetch(url);
        let data = await response.json();
        return data

    } catch(error) {
        console.log('Error getting datas', error)
    }

}
