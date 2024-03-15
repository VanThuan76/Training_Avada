/** 
* @param {{location: string, query: string; value: string}} props
* @return {string} 
*/
export const getQueryUrl = (props) => {
  const currentSearchParams = new URLSearchParams(props.location.search);
  currentSearchParams.set(`${props.query}`, props.value);
  const newSearch = currentSearchParams.toString();
  return newSearch;
};
