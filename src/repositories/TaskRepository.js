import { getFirestore, onSnapshot, collection, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, Timestamp, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

async function isValid(type, data, newData = {}, category_id) {
    let AllowAction = true, main_data = {};

    switch(type) {
        case "new":
            main_data = data;
            break;
        case "existing":
            main_data = newData;
            if(!newData.isDiffExists(data)) AllowAction = false;
            break;
        default:
            break;
    }

    // Check If Blank Data
    if(!main_data.isPropsPopulated()) AllowAction = false;

    if(type === "new" || (type === "existing" && main_data.isNameChanged(data))) {
        const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks"), where("name", "==", main_data.name));
        (await getDocs(q)).forEach((doc) => {
            AllowAction = false;
        });
    }

    return AllowAction;
}

async function CreateTask(Data, category_id) {
    let isOperationSuccessful = false;

    const { name, description, date_target_deadline, date_actual_deadline } = Data;

    // Add a new document with a generated id.
    if((await isValid('new', Data, {}, category_id)))
    {
        await addDoc(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks"), {
            name: name,
            description: description,
            date_last_modified: serverTimestamp(),
            date_target_deadline: Timestamp.fromDate(new Date(date_target_deadline)),
            date_actual_deadline: Timestamp.fromDate(new Date(date_actual_deadline)),
            date_completed: null,
            date_created: serverTimestamp()
        });

        isOperationSuccessful = true;
    }

    return isOperationSuccessful;
}

function ReadTask(OnDataCallback, category_id) {
    if(category_id !== '') {
        const collectionRef = collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks");
        const collectionQuery = query(collectionRef, orderBy('date_created'));
    
        return onSnapshot(collectionQuery, (live_doc) => {
            OnDataCallback(live_doc.docs.map((doc) => ({...doc.data(), id: doc.id})));
        })
    }
    else {
        OnDataCallback([]);
    }
}

async function UpdateTask(Data, NewData, category_id) {
    let isOperationSuccessful = false;

    const { name } = Data;
    const { name: new_name, description, date_target_deadline, date_actual_deadline } = NewData;

    // Add a new document with a generated id.
    if((await isValid('existing', Data, NewData, category_id))) {
        const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks"), where("name", "==", name));
        (await getDocs(q)).forEach(async (doc) => {
            await updateDoc(doc.ref, {
                name: new_name,
                description: description,
                date_last_modified: serverTimestamp(),
                date_target_deadline: Timestamp.fromDate(new Date(date_target_deadline)),
                date_actual_deadline: Timestamp.fromDate(new Date(date_actual_deadline))
            });
        });
        isOperationSuccessful = true;
    }

    return isOperationSuccessful;
}

async function DeleteTask(RefData, category_id) {
    let isOperationSuccessful = true;
    
    const { name: ref_name } = RefData;

    // Check If Data Already Exists in the Database
    const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks"), where("name", "==", ref_name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });

    return isOperationSuccessful;
}

async function SetTaskCompleteFlag(Data, category_id, flag) {
    let isOperationSuccessful = false, date_completed_flag = null;

    const { name } = Data;

    if(flag) {
        date_completed_flag = new Date();
    }

    const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories", category_id, "tasks"), where("name", "==", name));
    (await getDocs(q)).forEach(async (doc) => {
        await updateDoc(doc.ref, {
            date_completed: date_completed_flag
        });
        isOperationSuccessful = true;
    });

    return isOperationSuccessful;
}

export { CreateTask, ReadTask, UpdateTask, DeleteTask, SetTaskCompleteFlag };