const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "vc522ykg6c7jc93c",
  publicKey: "78zbb9rq65336yp9",
  privateKey: "a7b493167252b8bb520bfaa8f8c34ec0"
});

exports.getToken = (req , res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err)
        {
            res.status(400).send(err)
        }
        else
        {
            res.send(response)
        }
      });
}

exports.processPayment = (req , res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err)
          {
              res.status(400).send(err)
          }
          else
          {
              res.send(result)
          }
      });
}