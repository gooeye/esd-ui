export async function getRestaurants(page) {
    const url = `http://127.0.0.1:3000/restaurants?page=${page}&pageSize=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const restaurants = await response.json();
        return restaurants
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Display an error message to the user (e.g., in the <section>)
    }
}

export async function getMenu(id) {
    const url = `http://127.0.0.1:3000/restaurants/${id}/menu`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const menu = await response.json();
        return menu
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Display an error message to the user (e.g., in the <section>)
    }
}