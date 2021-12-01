import { useEffect, useState } from 'react';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
}>;

type QuestionType = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

function useRoom(roomID: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomID}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        };
      });

      setTitle(databaseRoom.title);

      setQuestions(parsedQuestions);
    });
  }, [roomID]);

  return { title, questions };
}

export default useRoom;
