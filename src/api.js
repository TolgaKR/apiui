
const API_BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ürünleri çekerken bir hata oluştu:", error);
        throw error;
    }
};