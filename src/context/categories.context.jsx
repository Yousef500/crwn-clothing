import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        (async () => {
            const catMap = await getCategoriesAndDocuments()
            setCategories(catMap)
        })()
    })


    return (
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    );
};
