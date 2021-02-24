//Component

import {useEffect} from "react"
import './Styles.css'
import "@reach/combobox/styles.css"
import mapStyles from "./MapStyles";

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

// 現在地に飛ぶ用
function CurrentLocator(props) {

    //機能はするけどここのエラー解消されない。後で要チェック。(React Hook useEffect has a missing dependency: 'props' ~ )
    useEffect(()=>{
        if (props.currentLocation === "abled"){
            navigator.geolocation.getCurrentPosition(
                (positions) => { //sucessの場合
                    props.panTo ({
                        lat: positions.coords.latitude,
                        lng: positions.coords.longitude,
                    });
                }, 
                () => null, options //failの場合
            )
        }
      }, [props.currentLocation])

    return (
        <button className="current-locator" onClick={()=> {
            navigator.geolocation.getCurrentPosition(
                (positions) => { //sucessの場合
                    props.panTo ({
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