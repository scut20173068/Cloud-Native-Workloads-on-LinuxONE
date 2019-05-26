var Account = require('./models/account');

function getAccounts(res) {
    Account.find(function (err, accounts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(accounts); // return all accounts in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all accounts
    app.get('/api/accounts', function (req, res) {
        // use mongoose to get all accounts in the database
        getAccounts(res);
    });

    // create account and send back all accounts after creation
    app.post('/api/accounts', function (req, res) {

        // create a account, information comes from AJAX request from Angular
        Account.create({
            name: req.body.name,
            balance: '0',
            done: false
        }, function (err, account) {
            if (err)
                res.send(err);

            // get and return all the accounts after you create another
            getAccounts(res);
        });

    });

    // delete a account
    app.delete('/api/accounts/:account_id', function (req, res) {
        Account.remove({
            _id: req.params.account_id
        }, function (err, account) {
            if (err)
                res.send(err);

          //      getAccounts(res);
        });
    });

   // save certain amount of money to an account
    app.post('/api/accounts/save',function(req, res){
        currentBalance = Account.findOne({name:req.body.name},{balance:1,_id:0})["balance"];
        //return null?
        currentBalanceInt = parseInt(currentBalance);
        saveBalance = req.body.balance;
        saveBalanceInt = parseInt(saveBalance);
        newBalanceInt = currentBalanceInt+saveBalanceInt;
        newBalance = newBalanceInt.toString();

        Account.update(
            {name: req.body.name},{$set:{balance: newBalance}},
            function (err, account) {
            if (err)
                res.send(err);

            getAccounts(res);
    
        });
    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
