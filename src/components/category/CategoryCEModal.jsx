import { useState, useEffect } from 'react';
import { CreateCategory, UpdateCategory } from './../../repositories/Repositories';
import { ModalEvent } from './../../utilities/Utilities';
import { CategoryData } from './../../models/Models';

function CategoryCEModal(props) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryBGColor, setCategoryBGColor] = useState("#9900ff");
    const [categoryTxtColor, setCategoryTxtColor] = useState("#ffffff");

    useEffect(() => {
        setCategoryName(props.modal_info.name);

        if(props.modal_type === "Create")
        {
            setCategoryName('');
        }
        if(props.modal_type === "Edit")
        {
            setCategoryBGColor(props.modal_info.bg_color);
            setCategoryTxtColor(props.modal_info.txt_color);
        }
    }, [props.modal_info, props.modal_type]);

    const OnCloseCategoryModal = () => {
        // Close Modal
        ModalEvent('close', 'app-category-ce-container-overlay');
    }

    const OnSubmitCategoryModal = async () => {
        if(window.confirm('Are you sure you want to submit?'))
        {
            let flag = true;

            // Close Modal
            ModalEvent('close', 'app-category-ce-container-overlay');
    
            // Process
            switch(props.modal_type) {
                case "Create":
                    flag = await CreateCategory(new CategoryData('', categoryName, categoryBGColor, categoryTxtColor));
                    break;
                case "Edit":
                    let new_category_data = new CategoryData('', categoryName, categoryBGColor, categoryTxtColor);
                    flag = await UpdateCategory(props.modal_info, new_category_data);
                    break;
                default:
                    break;
            }
    
            if(!flag) {
                alert("Something went wrong!, Double check your inputs");
            }
        }
    };

    return (
        <>
            <div id="app-category-ce-container-overlay">
                <div id="app-category-ce-container">
                    <div id="app-category-ce-content">
                        <div className="app-category-ce-content-input">
                            <label>{props.modal_type} Category Name:</label>
                            <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={categoryName}
                                    onChange={e => setCategoryName(e.target.value)} />
                        </div>
                        <div className="app-category-ce-content-input">
                            <label>{props.modal_type} Category Top Color:</label>
                            <input
                                    type="color"
                                    value={categoryBGColor}
                                    onChange={e => setCategoryBGColor(e.target.value)} />
                        </div>
                        <div className="app-category-ce-content-input">
                            <label>{props.modal_type} Category Text Color:</label>
                            <input
                                    type="color"
                                    value={categoryTxtColor}
                                    onChange={e => setCategoryTxtColor(e.target.value)} />
                        </div>
                    </div>
                    <div id="app-category-ce-actions">
                        <div id="app-category-ce-actions-close-popup" className="app-button" onClick={OnCloseCategoryModal}>Close</div>
                        <div id="app-category-ce-actions-submit-content" className="app-button" onClick={OnSubmitCategoryModal}>Submit</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryCEModal;