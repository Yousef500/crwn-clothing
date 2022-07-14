import CategoryItem from "../category-item/category-item.component";
import "./categories.styles.scss";

const Categories = ({ categories }) => {

    return (
        <div className="categories-container">
            {categories.map(({ id, title, imageUrl }) => (
                <CategoryItem key={id} title={title} imageUrl={imageUrl} />
            ))}
        </div>
    );
};

export default Categories;
