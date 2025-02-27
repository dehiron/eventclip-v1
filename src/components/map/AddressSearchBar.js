//Component

import {useEffect} from "react"
import '../Styles.css'
import 
    // usePlacesAutocomplete, 
    { getGeocode, getLatLng } from "use-places-autocomplete";
// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css"

function AddressSearchBar(props) {

    //　Filterコンポーネントからロケーション検索/propsを引き継いでくることによって、
    // 元々Map上にあったサーチバーは使話なくなったのでコメントアウトしている。
    
    // const {
    //     ready, 
    //     value, 
    //     suggestions:{status, data}, 
    //     setValue, 
    //     clearSuggestions
    // } = usePlacesAutocomplete({
    //     requestOptions: {
    //         location:{ lat:() => 35.681236, lng:() => 139.767125 },
    //         radius: 200 * 1000,
    //     }
    // });


    //機能はするけどここのエラー解消されない。後で要チェック。(React Hook useEffect has a missing dependency: 'props' ~ )
    useEffect(()=>{
        const getSelectedLocation = async () => {
            try {
              const results = await getGeocode({ address: props.selectedLocation });
              const { lat, lng } = await getLatLng(results[0]);
              props.panTo({ lat,lng });
            } catch(error){
              //エラー注意。検索結果が見つからない場合は"ZERO_RESULTS"が表示される。その場合ポップアップを表示する様にする。
              console.log(error)
            }
          }
        //ロケーション選択->現在値ボタンを押して入力したロケーションが消去された場合に対応。
        if (props.selectedLocation !== ""){
            getSelectedLocation();
        }
        // 注意：これでいいのか・・
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.selectedLocation])
  
    return(
        <div className="address-search-bar">
            {/* <Combobox 
                onSelect={async () => {
                    // setValue(address, false); // falseを設定するのはusePlacesAutocomplete特有のやり方みたい
                    clearSuggestions(); //選んだ瞬間候補がなくなる
                    try{
                        // const results = await getGeocode({ address });
                        const results = await getGeocode({ address: props.selectedLocation });
                        console.log(props.selectedLocation);
                        const { lat, lng } = await getLatLng(results[0]);
                        props.panTo({ lat,lng });
                    } catch(error){
                        console.log(error)
                    }
                }}
            >
                <ComboboxInput 
                    value = {value} 
                    onChange = {(e) => {setValue(e.target.value)}}
                    disabled = {!ready}
                    placeholder = "Enter an address" 
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) =>　(
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox> */}
        </div>
    );
}

export default AddressSearchBar;

