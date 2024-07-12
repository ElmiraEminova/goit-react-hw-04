import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../photo-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css"

export default function App() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [topic, setTopic] = useState("");
    const [showBtn, setShowBtn] = useState(false);
    
    const [selectedImage, setSelectedImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async (newTopic) => {
        setPhotos([]);
        setPage(1);
        setTopic(newTopic);
    }

    const handleLoadMoreBtn = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (topic === "") {
            return;
        }

        async function getPhoto() {
            try {
                setLoading(true);
                setError(false);
                const data = await fetchImages(topic, page);
                setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
               setShowBtn(data.total_pages && data.total_pages !== page)
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        getPhoto();
    }, [topic, page]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImage("");
    };

    return (
        <div className={css.container}>
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {photos.length > 0 && <ImageGallery items={photos} onImageClick={handleImageClick} />}
            {photos.length > 0 && showBtn && (<LoadMoreBtn handleLoadMore={handleLoadMoreBtn} />)}
            {selectedImage && (
                <ImageModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    image={selectedImage}
                />
            )}
        </div>
    );
}