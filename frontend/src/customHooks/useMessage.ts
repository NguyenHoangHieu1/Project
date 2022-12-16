import { useState, useEffect } from "react";
const useMessage = () => {
  const [error, setError] = useState<number[]>([]);
  const [success, setSuccess] = useState<number[]>([]);
  useEffect(() => {
    let time: null | NodeJS.Timeout;
    if (error.length > 0 || success.length > 0) {
      time = setTimeout(() => {
        setError([]);
        setSuccess([]);
      }, 5000);
    }
    return () => {
      if (time != null) {
        clearTimeout(time);
      }
    };
  }, [error, success]);
  function setErrorHandler() {
    setError([1]);
    setSuccess([]);
  }
  function setSuccessHandler() {
    setError([]);
    setSuccess([1]);
  }
  return {
    error,
    success,
    setErrorHandler,
    setSuccessHandler,
  };
};

export default useMessage;
