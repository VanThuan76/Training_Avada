/**
 * Handles hello requests.
 * @param {object} ctx - The Koa context object.
 * @return {object} The response object containing status and message.
 */
async function hello(ctx) {
  try {
    return (ctx.body = {
      status: 200,
      message: "Hello, world changed",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      success: false,
      errors: error.message,
    });
  }
}

module.exports = {hello};
