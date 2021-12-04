import { useParams, useNavigate } from 'react-router-dom';
import useRoom from '../hooks/useRoom';
import { database } from '../services/firebase';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import Button from '../components/Button';
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

type RoomParams = {
  id: string;
};

function AdminRoom() {
  const params = useParams() as RoomParams;
  const roomID = params.id;

  const { title, questions } = useRoom(roomID);

  const navigate = useNavigate();

  async function handleDeleteQuestion(questionID: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomID}`).update({
      endedAt: new Date()
    });

    navigate('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={roomID} />

            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
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
              >
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;
