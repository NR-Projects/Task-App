import { useState, useEffect, useCallback } from "react";
import { ReadCategory } from "./../../repositories/Repositories";
import { ModalEvent } from "./../../utilities/Utilities";
import CategoryTemplate from "./CategoryTemplate";

function CategoryContainer(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => ReadCategory((dataCallback) => {
        setCategories(dataCallback);
        props.category_list_update(dataCallback);
        //console.log("Current Categories:", dataCallback);
    }), []);

    const OnCreateCategory = () => {
        props.modal_callback('Create');
        ModalEvent('open', 'app-category-ce-container-overlay');
    }

    const OnModalCallback = useCallback((type, data) => {
        props.modal_callback(type, data);
    }, []);

    const OnViewCallback = useCallback((data) => {
        props.view_callback(data);
    }, []);

    return(
        <>
            <div id="app-side-bar">
                <div id="app-category-add-op" onClick={OnCreateCategory}>Add New Category</div>
                <div id="app-category-list">
                {categories.map(
                        c_data => { return <CategoryTemplate
                                        key={c_data.id}
                                        data={c_data}
                                        modal_callback={OnModalCallback}
                                        view_callback={OnViewCallback} />
                        }
                )}
                </div>
            </div>
        </>
    );
}

export default CategoryContainer;