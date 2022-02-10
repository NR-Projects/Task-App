import { getAuth } from 'firebase/auth';
import { ModalEvent } from './../utilities/Utilities';

function UserProfile() {
    const user = getAuth().currentUser;

    const SignOutFromAccount = () => {
        if(window.confirm('Are you sure you want to sign out'))
            getAuth().signOut();
    }

    return (
        <>
            <div id="app-top">
                <div id="app-mobile-sidebar">
                    <i className="fa fa-bars" onClick={()=>{ModalEvent('open', 'app-mobile-sidebar-container-overlay')}}></i>
                </div>
                <div id="app-top-info-container">
                    <img id="app-top-info-img"
                         src={user.photoURL}
                         alt="No Avatar"
                         onError={(e)=>{e.target.onerror = null; e.target.src="img/no-avatar.svg"}} />
                    <div id="app-top-info-name">{user.displayName}</div>
                </div>
                <div id="app-top-info-container-actions">
                    <img id="app-top-info-actions-logout" src="img/logout.svg" alt="Logout" onClick={SignOutFromAccount} />
                </div>
            </div>
        </>
    );
}

export { UserProfile };