import { useEffect } from "react";

export default function useBeforeUnload() {
  useEffect(() => {
    const unloadCallback = event => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);
}
