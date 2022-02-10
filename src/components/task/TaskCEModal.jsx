import { useState, useEffect } from 'react';
import { CreateTask, UpdateTask } from './../../repositories/Repositories';
import { ModalEvent, ConvertISOtoLocalDateTime } from './../../utilities/Utilities';
import { TaskData } from './../../models/Models';

function TaskCEModal(props) {
    const { name, description, date_target_deadline, date_actual_deadline } = props.modal_info;

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskTargetDeadline, setTaskTargetDeadline] = useState('');
    const [taskActualDeadline, setTaskActualDeadline] = useState('');

    useEffect(() => {
        if(props.modal_info.isPropsPopulated(true) && props.modal_type === 'Edit')
        {
            setTaskName(name);
            setTaskDescription(description);
            setTaskTargetDeadline(ConvertISOtoLocalDateTime(date_target_deadline.toDate()));
            setTaskActualDeadline(ConvertISOtoLocalDateTime(date_actual_deadline.toDate()));
        }
        if(props.modal_type === 'Create')
        {
            setTaskName('');
            setTaskDescription('');
            setTaskTargetDeadline('');
            setTaskActualDeadline('');
        }
    }, [name, description, date_target_deadline, date_actual_deadline, props.modal_info]);

    const OnClose = () => {
        ModalEvent('close', 'app-task-ce-container-overlay');
    }

    const OnSubmit = async () => {
        let flag = true;
        ModalEvent('close', 'app-task-ce-container-overlay');
        
        if(props.modal_type === 'Edit') {
            ModalEvent('close', 'app-task-view-container-overlay');
        }

        // Process
        switch(props.modal_type) {
            case "Create":
                flag = await CreateTask(new TaskData('', taskName, taskDescription, '', taskTargetDeadline, taskActualDeadline, ''), props.modal_id);
                break;
            case "Edit":
                let new_category_data = new TaskData('', taskName, taskDescription, '', taskTargetDeadline, taskActualDeadline, '');
                flag =  await UpdateTask(props.modal_info, new_category_data, props.modal_id);
                break;
            default:
                break;
        }

        if(!flag) {
            alert("Something went wrong!, Double check your inputs");
        }
    }

    return (
        <>
            <div id="app-task-ce-container-overlay">
                <div id="app-task-ce-container">
                    <p>Create New Task</p>
                    <form>
                        <div>
                            <label>Task Name:</label>
                            <input
                                type="text"
                                placeholder="Task Name Here"
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)} />
                        </div>
                        <div>
                            <label>Task Description:</label>
                            <textarea
                                type="text"
                                placeholder="Task Description Here"
                                cols="40"
                                rows="5"
                                value={taskDescription}
                                onChange={e => setTaskDescription(e.target.value)} />
                        </div>
                        <div>
                            <label>Task Target Deadline:</label>
                            <input
                                type="datetime-local"
                                value={taskTargetDeadline}
                                onChange={e => setTaskTargetDeadline(e.target.value)} />
                        </div>
                        <div>
                            <label>Task Actual Deadline:</label>
                            <input
                                type="datetime-local"
                                value={taskActualDeadline}
                                onChange={e => setTaskActualDeadline(e.target.value)} />
                        </div>
                        <div id="app-task-ce-actions">
                            <input type="button" value="Close" onClick={OnClose} />
                            <input type="button" value="Submit" onClick={OnSubmit} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default TaskCEModal;