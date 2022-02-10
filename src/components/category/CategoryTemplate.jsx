import React from 'react';
import { DeleteCategory } from "./../../repositories/Repositories";
import { ModalEvent } from "./../../utilities/Utilities";
import { CategoryData } from './../../models/Models';

function CategoryTemplate(props) {
    //console.log("Rendered Category:", props.data.name);
    const { id, name, bg_color, txt_color } = props.data;

    const OnView = () => {
        props.view_callback(new CategoryData(id, name, bg_color, txt_color));
    }

    const OnEdit = () => {
        props.modal_callback('Edit', new CategoryData(id, name, bg_color, txt_color));
        ModalEvent('open', 'app-category-ce-container-overlay', 'edit');
    }

    const OnDelete = async () => {
        if(window.confirm('Are you sure you want to delete this'))
            await DeleteCategory(new CategoryData(id, name))
    }

    return (
        <div className="app-category">
            <span onClick={OnView}>{name}</span>
            <div className="app-category-actions">
                <img src="img/edit.svg" alt="edit_button" onClick={OnEdit} />
                <img src="img/delete.svg" alt="delete_button" onClick={OnDelete} />
            </div>
        </div>
    );
}

export default React.memo(CategoryTemplate);