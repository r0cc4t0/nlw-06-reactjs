import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { TestContext } from '../App';
import { firebase, auth } from '../services/firebase';
import '../styles/auth.scss';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

function Home() {
  const navigate = useNavigate();

  const { value, setValue } = useContext(TestContext);

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      console.log(result);

      console.log(value);

      navigate('/rooms/new');
    });
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />

        <strong>Crie salas de Q&amp;A ao vivo.</strong>

        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o código da sala." />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
