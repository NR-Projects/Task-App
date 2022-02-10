import { useState } from 'react';
import { UserProfile } from './UserProfileComponent';
import { MobileNavModal } from './NavModalComponent';
import { CategoryContainer, CategoryCEModal } from './category/CategoryComponent';
import { CategoryTaskContainer, TaskCEModal, TaskViewModal } from './task/TaskComponent';
import { CategoryData, TaskData } from './../models/Models';

import '../scss/app.scss';

function TaskApp() {
    const [categoryList, setCategoryList] = useState([]);

    const OnCategoryListUpdate = (newData) => {
        setCategoryList(newData);
    }
    
    // Category
    const [categoryModalType, setCategoryModalType] = useState('');
    const [categoryModalInfo, setCategoryModalInfo] = useState(new CategoryData());
    const [categoryViewInfo, setCategoryViewInfo] = useState(new CategoryData());

    const OnCategoryCEModalEventCallback = (type, info = new CategoryData()) => {
        setCategoryModalType(type);
        setCategoryModalInfo(info);
    }
    const OnCategoryViewEventCallback = (info) => {
        setCategoryViewInfo(info);
    }

    // Task
    const [taskModalType, setTaskModalType] = useState('');
    const [taskModalInfo, setTaskModalInfo] = useState(new TaskData());
    const [taskViewInfo, setTaskViewInfo] = useState(new TaskData());
    const [taskCategoryID, setTaskCategoryID] = useState('');

    const OnTaskCEModalEventCallback = (type, info = new TaskData(), category_id) => {
        setTaskModalType(type);
        setTaskModalInfo(info);
        setTaskCategoryID(category_id);
    }
    const OnTaskViewModalEventCallback = (info = new TaskData(), category_id) => {
        setTaskViewInfo(info);
        setTaskCategoryID(category_id);
    }

    return (
        <>
            <div id="overview">
                <UserProfile />
                <div id="app-body">
                    <CategoryContainer
                        category_list_update={OnCategoryListUpdate}
                        modal_callback={OnCategoryCEModalEventCallback}
                        view_callback={OnCategoryViewEventCallback} />
                    <CategoryTaskContainer
                        category_list={categoryList}
                        view_info={categoryViewInfo}
                        modal_callback={OnTaskCEModalEventCallback}
                        view_callback={OnTaskViewModalEventCallback} />
                </div>
            </div>
            <MobileNavModal
                category_list={categoryList}
                modal_callback={OnCategoryCEModalEventCallback}
                view_callback={OnCategoryViewEventCallback} />
            <CategoryCEModal
                modal_type={categoryModalType}
                modal_info={categoryModalInfo} />
            <TaskViewModal
                modal_id={taskCategoryID}
                modal_callback={OnTaskCEModalEventCallback}
                view_info={taskViewInfo} />
            <TaskCEModal
                modal_id={taskCategoryID}
                modal_type={taskModalType}
                modal_info={taskModalInfo} />
        </>
    );
}

export default TaskApp;