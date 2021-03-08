import { Modal, Button } from "react-bootstrap"

function ErrorModal(props) {
    return (
        <Modal
                size="lg"
                show={props.errorModalOpen}
                onHide={() => props.setErrorModalOpen(false)}
                // 背景色を変更するにはCSSで対応しなければならない
                // style={{backGroundColor:"blue"}}
        >
            <Modal.Header>
                Oops.. Some Error happend.
            </Modal.Header>
            <Modal.Body>
                {props.errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    onClick={()=>{
                        props.setErrorModalOpen(false)
                }}>
                        閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;