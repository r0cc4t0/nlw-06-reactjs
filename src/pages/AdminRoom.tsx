import { useParams } from 'react-router-dom';
import useRoom from '../hooks/useRoom';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import Button from '../components/Button';
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';

type RoomParams = {
  id: string;
};

function AdminRoom() {
  const params = useParams() as RoomParams;
  const roomID = params.id;

  const { title, questions } = useRoom(roomID);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={roomID} />

            <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;
