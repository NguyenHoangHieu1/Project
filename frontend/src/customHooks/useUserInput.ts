import { useState } from "react";
const useUserInput = (condition: (data: string | number) => boolean) => {
  const [valueInput, setValueInput] = useState("");
  const [focus, setFocus] = useState(false);

  let isValid = condition(valueInput) && focus;
  let inValid = !isValid && focus;

  function onChange(e: React.FormEvent<HTMLInputElement> | string | number) {
    if (typeof e !== "string" && typeof e !== "number") {
      setValueInput(e.currentTarget.value);
    } else {
      setValueInput("" + e);
    }
  }
  function onFocus() {
    setFocus(true);
  }

  function reset() {
    setValueInput("");
    setFocus(false);
  }
  return {
    valueInput,
    onChange,
    onFocus,
    reset,
    inValid,
    isValid,
  };
};

export default useUserInput;
