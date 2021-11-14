import { useState } from 'react';

type ButtonProps = {
  title?: string;
};

function Button(props: ButtonProps) {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button onClick={increment}>
      {props.title || "Default: "}
      {counter}
    </button>
  );
}

export default Button;
