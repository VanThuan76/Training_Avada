import { useEffect, useState } from "react";

/**
 *
 * @component Toast
 *
 * @param {object} props - Component properties
 *
 * @returns {JSX.Element}
 */
const Toast = (props) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    if (props.status) {
      setIsMount(true);
      const timeout = setTimeout(() => {
        setIsMount(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [props.status]);

  return (
    <>
      {isMount && (
        <div className="absolute bottom-5 right-5 min-w-[200px] h-[50px]">
          <div className="w-full h-full relative shadow-md rounded-md grid place-content-center">
            <div
              className={`${
                props.status === "success"
                  ? "bg-green-600"
                  : props.status === "wanring"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              } absolute top-2 left-2 w-[10px] h-[10px] rounded-full`}
            ></div>
            <p className="text-center text-xs md:text-sm">{props.title}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
