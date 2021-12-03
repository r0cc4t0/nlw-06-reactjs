import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
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
  const { user } = useAuth();

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
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        };
      });

      setTitle(databaseRoom.title);

      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomID, user?.id]);

  return { title, questions };
}

export default useRoom;
