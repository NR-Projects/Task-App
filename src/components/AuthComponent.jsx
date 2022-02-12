import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import '../scss/main.scss';

function LogIn() {

    const OnAuthRequest = (auth_type) => {
        signInToChosenProvider(getAuth(), auth_type);
    }

    const signInToChosenProvider = (auth, provider) => {
        signInWithPopup(auth, provider).then((result) => {
            // Add New User Data [TODO]
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <>
            <div id="overview">
                <div id="top-bar">
                    <p>Task Management App</p>
                    <hr />
                    <span>by TunaSalmon</span>
                </div>
                <div id="middle-bar">
                    <p id="description">
                        This application was made as a personal project of the [developer] that serves to aid the [user] in handling their tasks
                    </p>
                    <div id="auth-container">
                        <p id="auth-title">Sign In</p>
                        <span id="auth-warning">Do not sign in to different provider with same email</span>
                        <div id="auth-selection">
                            <div id="google-auth" className="auth-button" onClick={() => {OnAuthRequest(new GoogleAuthProvider())}}>
                                <img src="img/google_icon.png" alt="Google Icon" />
                                <span>Sign In To Google</span>
                            </div>
                            <div id="github-auth" className="auth-button" onClick={() => {OnAuthRequest(new GithubAuthProvider())}}>
                                <img src="img/github_icon.png" alt="Github Icon" />
                                <span>Sign In To Github</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom-bar">
                    <p>SSBhbSBhIG1lZGlvY3JlIGRldmVsb3BlciwgSSBkbyBub3QgaGF2ZSBzdWNoIHNraWxscyB0byBiZSBldmVuIGNhbGxlZCBhIGRldmVsb3Blcg</p>
                </div>
            </div>
        </>
    );
}

export default LogIn;