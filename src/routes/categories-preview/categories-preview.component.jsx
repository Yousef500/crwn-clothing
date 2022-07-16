import {useContext, Fragment} from "react";
import {CategoriesContext} from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.components";

const CategoriesPreview = () => {
    const {categories} = useContext(CategoriesContext);
    return (
        Object.keys(categories).map(title => (
            <CategoryPreview key={title} products={categories[title]} title={title}/>
        ))
    );
};

export default CategoriesPreview;