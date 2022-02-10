class TaskData {
    constructor(id='', name='', description='', date_last_modified='', date_target_deadline='', date_actual_deadline='', date_completed='', date_created='') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.date_last_modified = date_last_modified;
        this.date_target_deadline = date_target_deadline
        this.date_actual_deadline = date_actual_deadline;
        this.date_completed = date_completed;
    }

    isDiffExists(AnotherObject) {
        let diffExist = false;

        if(this.name !== AnotherObject.name) diffExist = true;
        if(this.description !== AnotherObject.description) diffExist = true;
        if(this.date_last_modified !== AnotherObject.date_last_modified) diffExist = true;
        if(this.date_target_deadline !== AnotherObject.date_target_deadline) diffExist = true;
        if(this.date_actual_deadline !== AnotherObject.date_actual_deadline) diffExist = true;

        return diffExist;
    }

    isPropsPopulated(includeID = false) {
        let propsPopulated = true;

        if(this.name.trim() === '') propsPopulated = false;
        if(this.description.trim() === '') propsPopulated = false;
        if(this.date_target_deadline.toString().trim() === '') propsPopulated = false;
        if(this.date_actual_deadline.toString().trim() === '') propsPopulated = false;

        if(includeID)
        {
            if(this.id.trim() === '') propsPopulated = false;
        }

        return propsPopulated;
    }

    isNameChanged(AnotherObject) {
        if(this.name === AnotherObject.name) return false;
        return true;
    }

    populateByObject(AnotherObject) {
        for (let fld in AnotherObject) {
            this[fld] = AnotherObject[fld];
        }

        return this;
    }
}

export { TaskData }