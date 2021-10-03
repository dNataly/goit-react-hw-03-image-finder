import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img src={item.webformatURL} alt={item.tags} className={s.img} />
    </li>
  );
}
