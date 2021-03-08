import { Modal, Button, Container } from "react-bootstrap"

function SuccessModal(props) {
    return (
        <Modal
                size="lg"
                show={props.successModalOpen}
                onHide={() => props.setSuccessModalOpen(false)}
                centered 
        >
            <Modal.Header>
                Yay! Your New Event Created Successfully!
            </Modal.Header>
            <Modal.Body>
                <Container>ここに登録されたイベント情報を載せる</Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{props.setSuccessModalOpen(false)}}>
                        閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SuccessModal;