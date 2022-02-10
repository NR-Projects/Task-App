import { getFirestore, onSnapshot, collection, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

async function isValid(type, data, newData = {}) {
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
        const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories"), where("name", "==", main_data.name));
        (await getDocs(q)).forEach((doc) => {
            AllowAction = false;
        });
    }

    return AllowAction;
}

async function CreateCategory(Data) {
    let isOperationSuccessful = false;

    const { name, bg_color, txt_color } = Data;

    // Add a new document with a generated id.
    if((await isValid('new', Data)))
    {
        await addDoc(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories"), {
            name: name,
            bg_color: bg_color,
            txt_color: txt_color,
            date_created: serverTimestamp()
        });

        isOperationSuccessful = true;
    }

    return isOperationSuccessful;
}

function ReadCategory(OnDataCallback) {
    const collectionRef = collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories");
    const collectionQuery = query(collectionRef, orderBy('date_created'));

    return onSnapshot(collectionQuery, (live_doc) => {
        OnDataCallback(live_doc.docs.map((doc) => ({...doc.data(), id: doc.id})));
    })
}

async function UpdateCategory(Data, NewData) {
    let isOperationSuccessful = false;

    const { name } = Data;
    const { name: new_name, bg_color: new_bg_color, txt_color: new_txt_color } = NewData;

    // Add a new document with a generated id.
    if((await isValid('existing', Data, NewData))) {
        const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories"), where("name", "==", name));
        (await getDocs(q)).forEach(async (doc) => {
            await updateDoc(doc.ref, {
                name: new_name,
                bg_color: new_bg_color,
                txt_color: new_txt_color
            });
        });
        isOperationSuccessful = true;
    }

    return isOperationSuccessful;
}

async function DeleteCategory(RefData) {
    let isOperationSuccessful = true;

    const { name: ref_name } = RefData;

    // Check If Data Already Exists in the Database
    const q = query(collection(getFirestore(), "user_data", getAuth().currentUser.uid, "categories"), where("name", "==", ref_name));
    (await getDocs(q)).forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });

    return isOperationSuccessful;
}

export { CreateCategory, ReadCategory, UpdateCategory, DeleteCategory };