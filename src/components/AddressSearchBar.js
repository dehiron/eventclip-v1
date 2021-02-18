import './Styles.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css"

function AddressSearchBar({ panTo }) {
    const {
        ready, 
        value, 
        suggestions:{status, data}, 
        setValue, 
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location:{ lat:() => 35.681236, lng:() => 139.767125 },
            radius: 200 * 1000,
        }
    });
  
    return(
        <div className="address-search-bar">
            <Combobox 
                onSelect={async (address) => {
                    setValue(address, false); // falseを設定するのはusePlacesAutocomplete特有のやり方みたい
                    clearSuggestions(); //選んだ瞬間候補がなくなる
                    try{
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat,lng });
                    } catch(error){
                        console.log("Error!")
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
            </Combobox>
        </div>
    );
}

export default AddressSearchBar;

