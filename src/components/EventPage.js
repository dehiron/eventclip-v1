

function EventPage(props){
    console.log(props.match.params.id)

    return(
    <h1>event id : {props.match.params.id}</h1>
    )
}

export default EventPage;