module.exports.getSuccess=(req, res, next) => {
    console.log(req.body.name,req.body.email);
    res.render('success', {
        pageTitle: 'Contact Us',
        path: '/success',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      })
  }