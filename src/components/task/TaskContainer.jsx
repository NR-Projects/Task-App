import { useState, useEffect, useRef } from 'react';
import { ReadTask } from './../../repositories/Repositories';
import { ModalEvent } from './../../utilities/Utilities';
import { TaskData } from './../../models/Models';
import TaskTemplate  from './TaskTemplate';

function TaskContainer(props) {
    const { id, name, bg_color, txt_color } = props.category_info;
    
    const Top_Bg = useRef(null);
    const Txt = useRef(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        Top_Bg.current.style.backgroundColor = bg_color;
        Txt.current.style.color = txt_color;
    }, [bg_color, txt_color]);

    useEffect(() => ReadTask((dataCallback) => {
        setTasks(dataCallback);
        //console.log("Current Tasks:", dataCallback);
    }, id), [props]);

    const OnAddNewTask = () => {
        props.modal_callback('Create', new TaskData(), id);
        ModalEvent('open', 'app-task-ce-container-overlay');
    }

    return(
        <>
            <div id="app-category-task-container">
                <div id="app-task-top-background" ref={Top_Bg}>
                    <span ref={Txt}>{name}</span>
                </div>
                <div id="app-task-content">
                    <div id="app-task-add-op" onClick={OnAddNewTask}>
                        Add New Task
                    </div>
                    <div id="app-task-list">
                        {tasks.map(
                            t_data => <TaskTemplate
                                            key={t_data.id}
                                            category_id={id}
                                            data={t_data}
                                            modal_callback={props.modal_callback}
                                            view_callback={props.view_callback}
                        />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskContainer;