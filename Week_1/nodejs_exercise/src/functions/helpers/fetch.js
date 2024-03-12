/**
 *
 * @param {string} url
 * @returns {Promise<Array[any]>}
 * @throw {Error}
 */
async function fetchAsync(url) {
  try {
    const response = await fetch(url);
    const data = await response.json()
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
/**
 *
 * @param {string[]} urls
 * @returns {Promise<Array[any]>}
 * @throw {Error}
 */
async function fetchAllAsync(urls) {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const successfulResponses = responses.filter((response) => response.ok);
    if (successfulResponses.length === responses.length) {
      const dataPromises = successfulResponses.map((response) =>
        response.json()
      );
      const data = await Promise.all(dataPromises);
      return data;
    } else {
      error.responses = responses;
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  fetchAllAsync,
  fetchAsync
}
