import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { database } from '../services/firebase';
import RoomCode from '../components/RoomCode';
import Button from '../components/Button';
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';

type RoomParams = {
  id: string;
};

function Room() {
  const [newQuestion, setNewQuestion] = useState('');

  const { user } = useAuth();

  const params = useParams() as RoomParams;
  const roomID = params.id;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in!');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomID}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <RoomCode code={roomID} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>

          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar as string} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}

            <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Room;
