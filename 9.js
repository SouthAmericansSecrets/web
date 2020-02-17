webpackJsonp([9],{

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var nunjucks = __webpack_require__(5);
var env;
if (!nunjucks.currentEnv){
	env = nunjucks.currentEnv = new nunjucks.Environment([], { autoescape: true });
} else {
	env = nunjucks.currentEnv;
}
var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




var shim = __webpack_require__(4);


(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["partials/footer.en.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"col-lg-3 col-md-3 hidden-sm hidden-xs\">\n  <div id=\"copyright\">\n    <b>© copyright 2012 SouthAmericansSecrets.com</b>\n  </div>\n</div>\n<menu class=\"col-lg-6 col-md-6 col-sm-9 col-xs-9\">\n  <li><a href=\".\" title=\"Home\">Home</a></li>\n  <li><a href=\"articles.html\" title=\"Engaging articles about Peru's history\">Articles</a></li>\n  <li><a href=\"contact.html\" title=\"Have a question? Please contact us...\">Contact</a></li>\n  <li><a href=\"about.html\">About Us</a></li>\n</menu>\n<div class=\"col-lg-3 col-md-3 col-xs-3 payment-icons\">\n  <img src=\"images/footer/pp-acceptance-small.png\" class=\"paypal-img\" alt=\"PayPal Acceptance\">\n  <a target=\"_blank\" href=\"https://www.bookingsperu.com/payments/securesite.php?Codigo=MjAxNDU4MjA0MDUx\"><img src=\"images/footer/visa.jpg\" alt=\"Visa Acceptance\"></a>\n</div>\n<div class=\"col-sm-12 col-xs-12 hidden-lg hidden-md\">\n  <div id=\"copyright\">\n    <b>© copyright 2012 SouthAmericansSecrets.com</b>\n  </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();



module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["partials/footer.en.njk"] , dependencies)

/***/ })

});
//# sourceMappingURL=9.js.map