import './category.styles.scss'
import {useParams} from 'react-router-dom'
import {Fragment, useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
    const {category} = useParams();
    const {categories} = useContext(CategoriesContext)
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories])

    return (
        <Fragment>
            <h2 className={'category-title'}>{category.toUpperCase()}</h2>
            <div className={'category-products-container'}>
                {
                    products && products.map(prod => (
                        <ProductCard key={prod.id} product={prod}/>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category;