import { useSelector } from "react-redux";
import './Styles.css'


function Signup(props){
    const selector = useSelector((state) => state);
    return(
        <div>
            <p>{selector.owners.owner_firstname} + {selector.owners.owner_pref_id}</p>
        </div>
    )
}

export default Signup;