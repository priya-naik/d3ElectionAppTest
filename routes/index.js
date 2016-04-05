var express = require('express');
var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize');
var router = express.Router();
var jwt = require('express-jwt');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
var ae_partys = mongoose.model('ae_partys', {});
var ae_contested_deposit_losts = mongoose.model('ae_contested_deposit_losts', {});
var ae_parties_contests = mongoose.model('ae_parties_contests', {});
var ae_seatshares = mongoose.model('ae_seatshares', {});
var ae_voteshares = mongoose.model('ae_voteshares', {});
var ae_womens = mongoose.model('ae_womens', {});
var ae_maps = mongoose.model('ae_maps', {});
var ae_voter_turnouts = mongoose.model('ae_voter_turnouts', {})

var getdata = function (req, res) {
    console.log("Entering get data function");

    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    this.state = sanitize(req.params.state);
    this.year = sanitize(req.params.year);
    this.searchvalue = sanitize(req.params.searchvalue);
    this.filtervalue = sanitize(req.params.filtervalue);
    this.category = sanitize(req.params.category);

    return this;
};

router.get('/api/elections/ae_partys', function (req, res) {
    ae_partys.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_contested_deposit_losts', function (req, res) {
    ae_contested_deposit_losts.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_parties_contests', function (req, res) {
    ae_parties_contests.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_seatshares', function (req, res) {
    ae_seatshares.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_voteshares', function (req, res) {
    ae_voteshares.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_womens', function (req, res) {
    ae_womens.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});
router.get('/api/elections/ae_voter_turnouts', function (req, res) {
    ae_voter_turnouts.find({}, { "State": 0, "_id": 0 }, function (err, elections) {
        res.json(elections);
    })
});


//api to retreive data for Bihar Elections for year 1962
//http://localhost:8080/api/elections/bihar_1962

router.get('/api/elections/ae_graphs/graphs/state', function (req, res) {
    /*var type = req.params.type;
	var collections = '';
	switch(type) {
		case 'contested_deposit_lost':
			collections = ae_contested_deposit_lost;
			break;
		
		case 'parties_contesting':
			collections = ae_parties_contesting;
			break;
		
		case 'seatshare':
			collections = ae_seatshare;
			break;

		case 'voteshare':
			collections = ae_seatshare;
			break;
		
		case 'women':
			collections = ae_women;
			break;
	}
*/
    ae_voteshares.find(
		{
		    //"State": req.params.state

		}, function (err, elections) {
		    if (err) { res.send(err) };

		    //send list of election data
		    res.json(elections);
		})
});

//api to retreive data for elections based on parameters passed
//party1, sex, account type, relegion, State or year
//http://localhost:8080/api/elections/state

router.get('/api/elections/ae/:category', function (req, res) {
    var data = getdata(req, res);
    if (category != null) {
        ae_maps.find({
            $or: [
            { "State": data.category },
            { "Year": Number(data.category) },
            { "AC_type": data.category },
            { "Party1": data.category },
            { "RELIGION": data.category },
            { "Sex1": data.category }
            ]
        }, function (err, elections) {

            if (err) { res.send(err) };

            //send list of election data
            res.json(elections);
        })
    }
});

//api to retreive data for elections based on state and year passed
router.get('/api/ae/gender/:state/:year/:searchvalue', function (req, res) {
    var searchparam = '';
    var data = getdata(req, res);    
    if (data.state != null && data.year != null && data.searchvalue != null) {
        ae_maps.find(
            {
                "State": data.state,
                "Year": Number(data.year),
                "Sex1": data.searchvalue
            }
        , function (err, elections) {
            if (err) { res.send(err) };
            //send list of election data
            res.json(elections);
        })
    }
});

//api to retreive data for elections based on state and year passed
router.get('/api/ae/religion/:state/:year/:searchvalue', function (req, res) {
    var searchparam = '';
    var data = getdata(req, res);
    if (data.state != null && data.year != null) {
        ae_maps.find(
            {
                "State": data.state,
                "Year": data.year,
                "RELIGION": data.searchvalue
            }
        , function (err, elections) {
            if (err) { res.send(err) };
            //send list of election data
            res.json(elections);
        })
    }
});

//api to retreive data for elections based on state and year passed
router.get('/api/ae/comm/:state/:year/:searchvalue', function (req, res) {
    var searchparam = '';
    var data = getdata(req, res);
    if (data.state != null && data.year != null) {
        ae_maps.find(
            {
                "State": data.state,
                "Year": Number(data.year),
                "AC_type": data.searchvalue
            }
        , function (err, elections) {
            if (err) { res.send(err) };
            //send list of election data
            res.json(elections);
        })
    }
});

//api to retreive data for elections based on state and year passed
router.get('/api/ae/:state/:year/:searchval', function (req, res) {
    var searchparam = '';
    var data = getdata(req, res);
    if (data.state != null && data.year != null) {
        ae_maps.find(
            {
                "State": data.state,
                "Year": Number(data.year)

            }, { "_id": 0 }
        , function (err, elections) {
            if (err) { res.send(err) };

            //send list of election data
            res.json(elections);
        })
    }
});

//api to retreive distinct account types for state and year passed
router.get('/api/elections/ae/filter/:state/:year/:filtervalue', function (req, res) {
    var data = getdata(req, res);
    if (data.state != null && data.year != null) {
        ae_maps.find(
            {
                "State": data.state,
                "Year": Number(data.year)
            }
        ).distinct(data.filtervalue, function (err, elections) {
            if (err) { res.send(err) };

            //send list of election data
            res.json(elections);
        })
    }
});

module.exports = router;
