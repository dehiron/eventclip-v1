import { useSelector } from "react-redux";

function OwnerMypage (props) {

    const selector = useSelector((state) => state);

    return (
        <div>
            Owner: {selector.owners.owner_pref_id}
        </div>
    )
}

export default OwnerMypage;