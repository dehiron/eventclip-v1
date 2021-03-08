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
                Yay! Your Owner Account is Created Successfully!
            </Modal.Header>
            <Modal.Body>
                <Container>使い方ステップ的なオーナーへの情報を載せる。Carouselで説明画像を表示</Container>
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