/**
 *
 * @component Tag
 *
 * @param {object} props - Component properties
 * @param {string} props.title
 *
 * @returns {JSX.Element}
 */
const Tag = (props) => {
  return (
    <div
      className={`min-h-[20px] rounded-lg shadow-md px-1 py-1 md:px-2 md:py-1 cursor-pointer hover:bg-black hover:text-white transition-all ease-in-out ${
        props.title === "DELETE" && "!text-red-500"
      } ${props.color && `bg-${props.color}-300`}`}
      {...props}
    >
      {props.title}
    </div>
  );
};

export default Tag;
