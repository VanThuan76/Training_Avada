/**
 *
 * @component TagPolaris
 *
 * @param {object} props - TagPolaris Component Properties
 * @param {string} props.tag
 * @param {string} props.status
 *
 * @returns {JSX.Element}
 */
export function TagPolaris(props) {
  return (
    <Card>
      <Badge {...props}>{props.tag}</Badge>
    </Card>
  );
}
