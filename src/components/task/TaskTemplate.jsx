import React, { useState, useEffect, useRef } from 'react';
import { SetTaskCompleteFlag } from './../../repositories/Repositories';
import { ModalEvent, GetTimeDifferenceString, IsEventValid } from './../../utilities/Utilities';

function TaskTemplate(props) {
    //console.log("Rendered Task:", props.data.name);
    const { name, date_target_deadline, date_actual_deadline, date_completed } = props.data;

    const [ taskBlockColor, setTaskBlockColor ] = useState('#686868');
    const [ taskTxtColor, setTaskTxtColor ] = useState('#FFFFFF');
    const [ remainingTime, setRemainingTime ] = useState('Loading...');
    const [ completeResetButtonName, setCompleteResetButtonName ] = useState('Loading...');
    const taskBlock = useRef(null);
    const taskTxt = useRef(null);

    // useEffect, check if task is due every second
    useEffect(() => {

        if(date_completed !== null && date_completed !== '') {
            setCompleteResetButtonName('Reset');
        }
        else {
            setCompleteResetButtonName('Complete');
        }

        const interval = setInterval(() => {
            let time_diff_str;
            if(date_completed !== null && date_completed !== '') {
                time_diff_str = 'Completed';
                setTaskBlockColor('#1A8F2F');
                setTaskTxtColor('#FFFFFF');
            }
            else if(IsEventValid(new Date(), date_target_deadline.toDate())) {
                time_diff_str = GetTimeDifferenceString(new Date(), date_target_deadline.toDate());
                setTaskBlockColor('#8D8F1A');
                setTaskTxtColor('#FFFFFF');
            }
            else if(IsEventValid(new Date(), date_actual_deadline.toDate())) {
                time_diff_str = GetTimeDifferenceString(new Date(), date_actual_deadline.toDate());
                setTaskBlockColor('#BF6F00');
                setTaskTxtColor('#FFFFFF');
            }
            else {
                time_diff_str = 'Past Due';
                setTaskBlockColor('#FF1919');
                setTaskTxtColor('#000000');
            }
            setRemainingTime(time_diff_str);
        }, 1000);

        return () => clearInterval(interval);
    }, [date_actual_deadline, date_completed, date_target_deadline]);

    useEffect(() => {
        taskBlock.current.style.backgroundColor = taskBlockColor;
        taskTxt.current.style.color = taskTxtColor;
    }, [taskBlockColor, taskTxtColor])

    const OnView = (e) => {
        props.view_callback(props.data, props.category_id);
        ModalEvent('open', 'app-task-view-container-overlay');
    }

    const OnCompleteButton = (e) => {
        if(e && e.stopPropagation) e.stopPropagation();

        console.log(date_completed);

        if(date_completed !== null && date_completed !== '') {
            SetTaskCompleteFlag(props.data, props.category_id, false);
            setCompleteResetButtonName('Reset');
        }
        else {
            SetTaskCompleteFlag(props.data, props.category_id, true);
            setCompleteResetButtonName('Complete');
        }
    };

    return(
        <>
            <div className="app-task" onClick={OnView} ref={taskBlock}>
                <span>{name}</span>
                <div>
                    <button onClick={OnCompleteButton}>{completeResetButtonName}</button>
                    <span ref={taskTxt}>{remainingTime}</span>
                </div>
            </div>
        </>
    );
}

export default React.memo(TaskTemplate);