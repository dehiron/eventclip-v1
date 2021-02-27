//注意：オーナーがまとめてアップロードできる様に、リファクタリング必要



function Upload1(props){
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

function Upload2(props){
    return(
        <div className="file-upload">
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                    props.setImg2(e.target.files[0]);
                    console.log("ファイル選択済",e.target.files[0]);
                }}
            ></input>
        </div>
    )
}

function Upload3(props){
    return(
        <div className="file-upload">
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                    props.setImg3(e.target.files[0]);
                    console.log("ファイル選択済",e.target.files[0]);
                }}
            ></input>
        </div>
    )
}

function Upload4(props){
    return(
        <div className="file-upload">
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                    props.setImg4(e.target.files[0]);
                    console.log("ファイル選択済",e.target.files[0]);
                }}
            ></input>
        </div>
    )
}

function Upload5(props){
    return(
        <div className="file-upload">
            <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                    props.setImg5(e.target.files[0]);
                    console.log("ファイル選択済",e.target.files[0]);
                }}
            ></input>
        </div>
    )
}

export {
    Upload1,
    Upload2,
    Upload3,
    Upload4,
    Upload5,
}