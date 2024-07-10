import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const ACCESS_KEY = "sneHUw5Vlp9gWSvW96Fn_19X9SmkZdPSIZumEQC0s-I";

export const fetchImages = async (topic, currentPage) => {
    try {
        const res = await axios.get(`search/photos`, {
            params: {
                query: topic,
                page: currentPage,
                per_page: 10,
            },
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },
        });
        console.log(res.data);
        return res.data.results
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};