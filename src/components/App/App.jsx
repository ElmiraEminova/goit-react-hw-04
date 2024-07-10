import { useEffect, useState} from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader"
import SearchBar from "../SearchBar/SearchBar";
import { fetchImages } from "../../photo-api"
import toast, { Toaster } from 'react-hot-toast';
import  ErrorMessage  from "../ErrorMessage/ErrorMessage"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [topic, setTopic] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async (newTopic) => {
        setPhotos([]);
        setPage(1);
        setTopic(newTopic);         
    }

    const handleLoadMoreBtn = () => {
        setPage(page + 1);
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
               setPhotos((prevPhotos) => {
                   return [...prevPhotos,...data]
               });
           } catch (error) {
               toast.error("Something went wrong")
            setError(true)
            }
           finally {
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
        <div>
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            {error && <ErrorMessage />}
            {photos.length > 0 && <ImageGallery items={photos} onImageClick={handleImageClick}/>}
            <Toaster />
            {photos.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMoreBtn} />}
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
