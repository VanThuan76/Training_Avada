/**
 *
 * @param {string} url
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {any} [payload] - Data to send for POST or PUT requests
 * @returns {Promise<any>} - Parsed JSON response or error object
 * @throws {Error}
 */
export async function fetchAsync(path, method, payload = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (method === "POST" || method === "PUT") {
      options.body = JSON.stringify(payload);
    }
    const response = await fetch(`http://localhost:8443/api${path}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
/**
 *
 * @param {string[]} paths
 * @returns {Promise<Array[any]>}
 * @throw {Error}
 */
export async function fetchAllAsync(paths) {
  try {
    const responses = await Promise.all(
      paths.map((path) => fetch(`http://localhost:8443/api${path}`))
    );
    const successfulResponses = responses.filter((response) => response.ok);
    if (successfulResponses.length === responses.length) {
      const dataPromises = successfulResponses.map((response) =>
        response.json()
      );
      const data = await Promise.all(dataPromises);
      return data;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
