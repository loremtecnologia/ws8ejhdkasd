const functions = require('firebase-functions');
const request = require('request');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

exports.sendEmail = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    console.log('email')
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "loremtecnologia@gmail.com", // generated ethereal user
            pass: "ritter!0"  // generated ethereal password
        }
    });
    let mailOptions = {
        from: '"Site - ia.tirrell.com.br" <loremtecnologia@gmail.com>', // sender address
        to: 'andreritters@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        html: '<b>Nome: </b>' + req.body.name + '<br><b>E-mail: </b>' + req.body.email + '<br><b>Telefone: </b>' + req.body.telefone + '<br><b>Empresa: </b>' + req.body.empresa + '<br><b>Assunto: </b>' + req.body.subject + '<br><b>Mensagem: </b>' + req.body.message + '<br>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json('{\"msg\":\"error\"}')
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).send({msg: 'success'});
        //res.json();
    });
});