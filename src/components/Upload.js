

function Upload(props){
    return(
        <div className="file-upload">
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                    props.setImg1(e.target.files[0]);
                    console.log("ファイル選択済",e.target.files[0]);
                }}
            ></input>
        </div>
    )
}

export default Upload;