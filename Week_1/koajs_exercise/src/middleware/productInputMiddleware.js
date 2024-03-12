const yup = require('yup');

async function productInsertMiddleware(ctx, next) {
  try {
    const body = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required()
    });

    await schema.validate(body);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}
async function productUpdateMiddleware(ctx, next) {
  try {
    const body = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      image: yup.string()
    });

    await schema.validate(body);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

module.exports = {
  productInsertMiddleware,
  productUpdateMiddleware
};
