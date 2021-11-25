import { useParams } from 'react-router-dom';
import RoomCode from '../components/RoomCode';
import Button from '../components/Button';
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';

type RoomParams = {
  id: string;
};

function Room() {
  const params = useParams() as RoomParams;

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />

          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>

          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?" />

          <div className="form-footer">
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>

            <Button type="submit">Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Room;
