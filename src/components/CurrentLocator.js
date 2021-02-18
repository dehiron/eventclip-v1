//Component

import './Styles.css'
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

// 現在地に飛ぶ用
function CurrentLocator({ panTo }) {
    return (
        <button className="current-locator" onClick={()=> {
            navigator.geolocation.getCurrentPosition(
                (positions) => { //sucessの場合
                    panTo ({
                        lat: positions.coords.latitude,
                        lng: positions.coords.longitude,
                    });
                }, 
                () => null, options //failの場合
            )
        }}>
        <img src="compass.svg" alt="compass - locate me" />
    </button>
    )
};

export default CurrentLocator;