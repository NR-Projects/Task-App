class CategoryData {
    constructor(id='', name='', bg_color='', txt_color='') {
        this.id = id;
        this.name = name;
        this.bg_color = bg_color;
        this.txt_color = txt_color;
    }

    isDiffExists(AnotherObject) {
        let diffExist = false;

        if(this.name !== AnotherObject.name) diffExist = true;
        if(this.bg_color !== AnotherObject.bg_color) diffExist = true;
        if(this.txt_color !== AnotherObject.txt_color) diffExist = true;

        return diffExist;
    }

    isPropsPopulated(includeID = false) {
        let propsPopulated = true;

        if(this.name.trim() === '') propsPopulated = false;
        if(this.bg_color.trim() === '') propsPopulated = false;
        if(this.txt_color.trim() === '') propsPopulated = false;

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

export { CategoryData }