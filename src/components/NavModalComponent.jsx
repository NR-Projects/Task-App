import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ModalEvent } from './../utilities/Utilities';
import CategoryTemplate from './category/CategoryTemplate';

function MobileNavModal(props) {

    const user = getAuth().currentUser;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(props.category_list);
    }, [props.category_list]);

    const OnCloseModal = () => {
        ModalEvent('close', 'app-mobile-sidebar-container-overlay');
    }

    const OnCreateCategory = () => {
        props.modal_callback('Create');
        ModalEvent('open', 'app-category-ce-container-overlay');
    }

    return (
        <>
            <div id="app-mobile-sidebar-container-overlay">
                <div id="app-mobile-sidebar-container">
                    <div id="app-mobile-profile-container">
                    <img id="app-top-info-img"
                         src={user.photoURL}
                         alt="No Avatar"
                         onError={(e)=>{e.target.onerror = null; e.target.src="img/no-avatar.svg"}} />
                        <span onClick={OnCloseModal}>Close</span>
                    </div>
                    <div id="app-mobile-category-container">
                        <div id="app-category-add-op" onClick={OnCreateCategory}>Add New Category</div>
                        <div id="app-category-list">
                        {categories && categories.map(
                        c_data => <CategoryTemplate
                                        key={c_data.id}
                                        data={c_data}
                                        modal_callback={props.modal_callback}
                                        view_callback={props.view_callback} />
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { MobileNavModal };