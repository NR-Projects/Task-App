import { useState, useEffect } from 'react';
import { DeleteTask } from './../../repositories/Repositories';
import { ModalEvent } from './../../utilities/Utilities';
import { TaskData } from './../../models/Models';

function TaskViewModal(props) {
    const { name, description, date_last_modified, date_target_deadline, date_actual_deadline, date_completed, date_created } = props.view_info;

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDateCreated, setTaskDateCreated] = useState('');
    const [taskDateLastModified, setTaskDateLastModified] = useState('');
    const [taskDateTarget, setTaskDateTarget] = useState('');
    const [taskDateActual, setTaskDateActual] = useState('');
    const [taskDateCompleted, setTaskDateCompleted] = useState('');

    useEffect(() => {
        const date_format = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        setTaskName(name);
        setTaskDescription(description);

        if(date_created !== '' && date_created !== null)
            setTaskDateCreated(date_created.toDate().toLocaleDateString(undefined, date_format));

        if(date_last_modified !== '' && date_created !== null)
            setTaskDateLastModified(date_last_modified.toDate().toLocaleDateString(undefined, date_format));
        
        if(date_target_deadline !== '' && date_target_deadline !== null)
            setTaskDateTarget(date_target_deadline.toDate().toLocaleDateString(undefined, date_format));

        if(date_actual_deadline !== '' && date_actual_deadline !== null)
            setTaskDateActual(date_actual_deadline.toDate().toLocaleDateString(undefined, date_format));
        
        if(date_completed !== '' && date_completed !== null)
            setTaskDateCompleted(`Completed on ${date_completed.toDate().toLocaleDateString(undefined, date_format)}`);
        else
            setTaskDateCompleted('[In Progress]');
    }, [name, description, date_created, date_last_modified, date_target_deadline, date_actual_deadline, date_completed]);

    const OnEdit = () => {
        props.modal_callback('Edit', (new TaskData()).populateByObject(props.view_info), props.modal_id);
        ModalEvent('open', 'app-task-ce-container-overlay');
    }

    const OnClose = () => {
        ModalEvent('close', 'app-task-view-container-overlay');
    }

    const OnDelete = () => {
        ModalEvent('close', 'app-task-view-container-overlay');
        DeleteTask(props.view_info, props.modal_id);
    }

    return (
        <>
            <div id="app-task-view-container-overlay">
                <div id="app-task-view-container">
                    <div id="app-task-view-metadata">
                        <p>{taskName}</p>
                        <p>Date Created: {taskDateCreated}</p>
                        <p>Target Date: {taskDateTarget}</p>
                        <p>Actual Date: {taskDateActual}</p>
                        <p>Date Last Updated: {taskDateLastModified}</p>
                        <p>{taskDateCompleted}</p>
                    </div>
                    <div id="app-task-view-content">
                        <textarea readOnly value={taskDescription}/>
                    </div>
                    <div id="app-task-view-actions">
                        <div onClick={OnEdit}>Edit</div>
                        <div onClick={OnClose}>Close</div>
                        <div onClick={OnDelete}>Delete</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskViewModal;