import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LineChart from './LineChart';

export default function ChartModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.charttype} Chart
        </Modal.Title>
      </Modal.Header>
      <div className="m-3">
      <LineChart data={props.data} chartType={props.charttype} goal={props.goal} />
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}