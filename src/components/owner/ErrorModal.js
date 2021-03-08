import { Modal, Button } from "react-bootstrap"

function ErrorModal(props) {
    return (
        <Modal
                size="lg"
                show={props.errorModalOpen}
                onHide={() => props.setErrorModalOpen(false)}
                centered 
        >
            <Modal.Header>
                Oops.. Some Error happend.
            </Modal.Header>
            <Modal.Body>
                {props.errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{props.setErrorModalOpen(false)}}>
                        閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;