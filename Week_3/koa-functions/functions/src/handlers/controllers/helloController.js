async function hello(ctx) {
  try {
    return (ctx.body = {
      status: 200,
      message: "Hello, wolrd changed",
    });
  } catch (error) {
    console.error(error);
    return (ctx.body = {
      status: 400,
      sucess: false,
      errors: error.message,
    });
  }
}

module.exports = { hello };
