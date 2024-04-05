const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    accessToken: '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',
    shopName: 'avada-simple-sales-notfication.myshopify.com'
  });
  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);
  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  // });
  // await shopify.scriptTag.delete(198964248643);
})();