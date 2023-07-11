import { GoogleAuthProvider, signInWIthPopup, getAuth } from 'firebase'


export default function Login(){
    //Sign in with google
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async() => {
        try{
            const result = await signInWIthPopup(auth, googleProvider)
            console.log(result.user)
        } catch (error){
            console.log(error)
        }
    }
    return (
        <div>
            <h3> I am Login Form</h3>
            <div>
                <button onClick={GoogleLogin}>Sign in With Google</button>
                <button>Sign in With Facebook</button>
            </div>
        </div>
    );
}