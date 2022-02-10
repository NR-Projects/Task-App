function ModalEvent(action, target_id) {
    const top_div = document.getElementById(target_id);
    switch(action) {
        case "open":
            top_div.classList.add("in");
            top_div.classList.remove("out");
            break;
        case "close":
            top_div.classList.add("out");
            top_div.classList.remove("in");
            break;
        default:
            break;
    }
}

function ConvertISOtoLocalDateTime(event) {

    const year = event.getFullYear().toString();
    const month = (event.getMonth()+1).toString().padStart(2, '0');
    const day = event.getDate().toString().padStart(2, '0');
    const hour = event.getHours().toString().padStart(2, '0');
    const minute = event.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
}

// function that returns the days between two dates in the format of a string. If days are less than 1, return the hours. If hours are less than 1, return the minutes. If minutes are less than 1, return the seconds.
function GetTimeDifferenceString(start_date, end_date) {
    const start_date_obj = new Date(start_date);
    const end_date_obj = new Date(end_date);
    const diff_in_ms = end_date_obj - start_date_obj;
    const diff_in_seconds = diff_in_ms / 1000;
    const diff_in_minutes = diff_in_seconds / 60;
    const diff_in_hours = diff_in_minutes / 60;
    const diff_in_days = diff_in_hours / 24;
    if (diff_in_days > 1) {
        return `${diff_in_days.toFixed(0)} day(s) left`;
    } else if (diff_in_hours > 1) {
        return `${diff_in_hours.toFixed(0)} hour(s) left`;
    } else if (diff_in_minutes > 1) {
        return `${diff_in_minutes.toFixed(0)} minute(s) left`;
    } else {
        return `${diff_in_seconds.toFixed(0)} second(s) left`;
    }
}

// function that compares start and end date then return if the event is in the past or not
function IsEventValid(start_date, end_date) {
    const start_date_obj = new Date(start_date);
    const end_date_obj = new Date(end_date);
    const diff_in_ms = end_date_obj - start_date_obj;
    const diff_in_seconds = diff_in_ms / 1000;
    if (diff_in_seconds > 0) {
        return true;
    } else {
        return false;
    }
}

export {
    ModalEvent,
    ConvertISOtoLocalDateTime,
    GetTimeDifferenceString,
    IsEventValid
};