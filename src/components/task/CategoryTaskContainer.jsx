import { useState, useEffect } from 'react';
import { CategoryData } from './../../models/Models';
import TaskContainer from './TaskContainer';

function CategoryTaskContainer(props) {
    const [viewInfo, setViewInfo] = useState(new CategoryData());

    useEffect(() => {
        setViewInfo(props.view_info);
    }, [props]);

    useEffect(() => {
        setViewInfo((new CategoryData()).populateByObject(props.category_list.find((doc) => { return doc.id === props.view_info.id; })));
    }, [props.category_list, props, viewInfo.id]);

    return(
        <>
            <div id="app-content-bar">
                { viewInfo.name.trim() !== '' ? <TaskContainer
                                                    category_info={viewInfo}
                                                    modal_callback={props.modal_callback}
                                                    view_callback={props.view_callback} /> : <NoTaskSelected /> }
            </div>
        </>
    );
}

function NoTaskSelected() {
    return(
        <>
            <div id="app-content-no-category-selected">
                <p>You have not selected any category</p>
                <span>If you are new here, please make a new category to start storing your task</span>
                <p>Hope you have a good time :)</p>
            </div>
        </>
    );
}

export default CategoryTaskContainer;