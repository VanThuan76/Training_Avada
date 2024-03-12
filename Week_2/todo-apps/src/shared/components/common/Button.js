/**
 *
 * @component Button
 *
 * @param {object} props - Component properties
 * @param {string} props.title
 *
 * @returns {JSX.Element}
 */
const Button = (props) => {
  return (
    <button
      {...props}
      className={`${props.className} min-w-[60px] max-h-[40px] rounded-lg px-2 py-1 md:px-3 md:py-2 text-center`}
    >
      {props.title}
    </button>
  );
};

export default Button;
