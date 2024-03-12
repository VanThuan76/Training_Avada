import IconClose from "@avada/shared/components/icons/IconClose";
/**
 *
 * @component Modal
 *
 * @param {object} props - Component properties
 *
 * @returns {JSX.Element}
 */
const Modal = (props) => {
  return (
    <div
      className="w-full grid place-items-center h-full absolute top-0 left-0 bg-black opacity-100 z-50"
      onClick={() => props.setIsToggle(!props.isToggle)}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {props.title}
            </h3>
            <IconClose className="w-[25px] h-[25px] cursor-pointer" onClick={() => props.setIsToggle(!props.isToggle)} />
          </div>
          <div className="p-4 md:p-5 space-y-4">{props.body}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
