var Account = require('./models/account');

function getAccounts(res,val) {
    Account.find(function (err, accounts) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        //val==0 success
        //val==-1 余额不足
        //val==-2 查无此人
        //val==-3 invalid input
        if(val!=null) accounts.push(val);
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
            balance: 0,
	    management: 0,
            done: false
        }, function (err, account) {            
            if (err)
                res.send(err);

            // get and return all the accounts after you create a new one
            getAccounts(res);
        });

    });

    // delete an account
    app.delete('/api/accounts/:account_id', function (req, res) {
        Account.remove({
            _id: req.params.account_id
        }, function (err, account) {
            if (err)
                res.send(err);

            // get and return all the accounts after you delete an account
            getAccounts(res);
        });
    });

   // save certain amount of money to an account
    app.post('/api/accounts/save',function(req, res){
        Account.findOne({name:req.body.name},function(err,doc){
            if(doc==null){
                getAccounts(res,-2);
            }else if(req.body.amount>=0){
                Account.update(
                    {name: req.body.name},{$inc:{balance: req.body.amount}},
                    function (err, account) {
                    if (err)
                        res.send(err);

                    getAccounts(res,0);
            
                });
            }else{
                getAccounts(res,-3);
            }
	});
    });

    //transfer certain amount of money from account1 to account2
    app.post('/api/accounts/transfer',function(req, res){
        Account.findOne({name:req.body.name1},function(err,doc){
            if(doc==null){
                getAccounts(res,-2);
            }else if(req.body.amount>=0&&doc.balance>=req.body.amount){
                Account.findOne({name:req.body.name2},function(err,doc){
                    if(doc==null){
                        getAccounts(res,-2);
                    }else{
                        Account.update(
                            {name: req.body.name1},{$inc:{balance: (-1*req.body.amount)}},
                            function (err, account) {
                            if (err)
                                res.send(err);    
                        });
                
                        Account.update(
                            {name: req.body.name2},{$inc:{balance: req.body.amount}},
                            function (err, account) {
                            if (err)
                                res.send(err);
                        });
                        getAccounts(res,0);
                    }
                });
            }else if(doc.balance<req.body.amount){
                getAccounts(res,-1);
            }else getAccounts(res,-3);
        });
     });

	app.post('/api/accounts/withdraw',function(req,res){
        Account.findOne({name:req.body.name},function(err,doc){
            if(doc==null){
                getAccounts(res,-2);
            }else if(req.body.amount>=0&&doc.balance>=req.body.amount){
                Account.update(
                    {name:req.body.name},{$inc:{balance:(-1*req.body.amount)}},
                    function(err,account){
                        if(err) res.send(err);
                        getAccounts(res,0);
                    }
                );
            }else if(doc.balance<req.body.amount){
                getAccounts(res,-1);
            }else getAccounts(res,-3);
	});	
	});

        app.post('/api/accounts/transmanage',function(req,res){
            Account.findOne({name:req.body.name},function(err,doc){
                if(doc==null){
                    getAccounts(res,-2);
                } else if (doc.balance - req.body.amount >= 0 && doc.management + req.body.amount>=0) {
                    Account.update(
                        {name:req.body.name},{$inc:{balance:(-1*req.body.amount)}},
                        function(err,account){
                            if(err) res.send(err);
                        }
                    );
                    Account.update({name:req.body.name},{$inc:{management:(req.body.amount)}},
                    function(err,account){
                        if(err) res.send(err);
                        getAccounts(res,0);
                    });
                }else{
                    getAccounts(res,-1);
                }
            });
	});

    app.post('/api/accounts/updateSecondAcc',function(req,res){
        for(i=0;i<req.body.list.length;i++){
            Account.update({name:req.body.list[i].name},{$inc:{management:(req.body.val*req.body.list[i].management)}},
                function(err,account){
                    if(err) res.send(err);
                }
            );
        }
        getAccounts(res);
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
