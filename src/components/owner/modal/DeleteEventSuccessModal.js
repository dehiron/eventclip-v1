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
                Your Event is deleted Successfully!
            </Modal.Header>
            <Modal.Body>
                <Container>ここに削除されたイベント情報を載せる（検討）</Container>
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