import { useState } from "react";

export const useInput = (defaultValue, validationFn) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const validationError = validationFn(enteredValue);

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  const handleUserInput = (event) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  return {
    value: enteredValue,
    handleInputBlur,
    handleUserInput,
    hasError: didEdit && validationError,
  };
};
