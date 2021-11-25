import '../styles/room-code.scss';
import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
};

function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy Room Code" />
      </div>

      <span>Sala #{props.code}</span>
    </button>
  );
}

export default RoomCode;
