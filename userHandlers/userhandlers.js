var exports = module.exports;

exports.homePageGET = function (req, res) {
	res.sendFile(__dirname, '/test.html');
};

exports.homePagePOST = function (req, res) {
	console.log('test');
  	console.log(req.body);
};
