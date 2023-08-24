module.exports.getContactUs=(req, res, next) => {
    res.render('contacts', {
        pageTitle: 'Contact Us',
        path: '/contacts',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      })
  }