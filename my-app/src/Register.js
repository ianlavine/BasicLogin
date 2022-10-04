import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus(); 
    }, []) // nothing in square brackets - no dependancy so when comp loads

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <>
        { success ? (
            <section>
                <h1>Success!</h1>
                <span>
                    {/*put router link here*/}
                    <a href="#">Sign In</a>
                </span>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : //if errmsg, it shows, otherwise off screen but screen reader picks up
                "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        { validName && <span>
                            <FontAwesomeIcon icon={faCheck} />
                        </span> }
                        { !validName && <span>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> }
                    </label>
                    <br/>
                    <input
                        type="text"
                        id="username"
                        ref={userRef} //connects this input to the one thats starts off in focus
                        autoComplete="off" //do not want suggestions from previous users
                        onChange={(e) => setUser(e.target.value)} //ties input to user state
                        required
                        aria-invalid={validName ? "false" : "true"} //lets screen reader announce whether this input needs adjustment
                        onFocus={() => setUserFocus(true)} //for ui when clicking different fields
                        onBlur={() => setUserFocus(false)}
                    />
                    {userFocus && user && !validName && <p>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p> }
                    <br/>

                    <label htmlFor="password">
                        Password:
                        { validPwd && <span>
                            <FontAwesomeIcon icon={faCheck} />
                        </span> }
                        { !validPwd && <span>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> }
                    </label>
                    <br/>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)} //ties input to user state
                        required
                        aria-invalid={validPwd ? "false" : "true"} //lets screen reader announce whether this input needs adjustment
                        onFocus={() => setPwdFocus(true)} //for ui when clicking different fields
                        onBlur={() => setPwdFocus(false)}
                    />
                    { pwdFocus && pwd && !validPwd && <p> 
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character<br />
                    </p> }
                    <br/>

                    <label htmlFor="confirmPassword">
                        Confirm Password:
                        { validPwd && validMatch && <span>
                            <FontAwesomeIcon icon={faCheck} />
                        </span> }
                        { validPwd && !validMatch && <span>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> }
                    </label>
                    <br/>
                    <input
                        type="password"
                        id="confirmPassword"
                        onChange={(e) => setMatchPwd(e.target.value)} //ties input to user state
                        required
                        aria-invalid={validMatch ? "false" : "true"} //lets screen reader announce whether this input needs adjustment
                        onFocus={() => setMatchFocus(true)} //for ui when clicking different fields
                        onBlur={() => setMatchFocus(false)}
                    />
                    { matchFocus && matchPwd && !validMatch && <p> 
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must be identical to password.<br />
                    </p> }
                    <br/>

                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br/>
                    <span>
                        {/*put router link here*/}
                        <a href="#">Sign In</a>
                    </span>
                </p>
            </section>
        )} 
        </>     
    )
}

export default Register