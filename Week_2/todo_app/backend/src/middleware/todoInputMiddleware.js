const yup = require("yup");

async function toDoInsertMiddleware(ctx, next) {
  try {
    const body = ctx.request.body;
    let schema = yup.object().shape({
      title: yup.string().required(),
      status: yup.number().required()
    });

    await schema.validate(body);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
async function todoUpdateMiddleware(ctx, next) {
  try {
    const body = ctx.request.body;
    let schema = yup.object().shape({
      title: yup.string(),
      status: yup.number(),
    });

    await schema.validate(body);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = {
  toDoInsertMiddleware,
  todoUpdateMiddleware,
};
