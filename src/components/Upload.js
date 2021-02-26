

function Upload(props){
    return(
        <div className="file-upload">
            <button
                className="button"
                onClick={() => {
                    console.log(1)
                    document.getElementById("avatar").click();
                    //props.uploadImage(input);
                }}
            >
                Upload
            </button>
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                props.uploadImage(e.target.files[0]);
                console.log(e.target.files);
                }}
            ></input>
        </div>
    )
}

export default Upload;