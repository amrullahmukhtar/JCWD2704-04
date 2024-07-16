import { ChangeEvent, useState } from "react";

type TState = { [key: string]: any };

export function useInput(defaultValue: TState = {}) {
  const [input, setInput] = useState<TState>(defaultValue);
  function inputHandler(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }
  return { input, setInput, inputHandler };
}
