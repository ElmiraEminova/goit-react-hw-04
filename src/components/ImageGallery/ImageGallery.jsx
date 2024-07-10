import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id} onClick={() => onImageClick(item)} className={css.gallery}>
          <ImageCard item={item} onImageClick={onImageClick}/>
        </li>
      ))}
    </ul>
  );
}
