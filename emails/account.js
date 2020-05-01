const sgMail = require('@sendgrid/mail')

const sgMailApiKey = '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'

sgMail.setApiKey(sgMailApiKey)


module.exports.sendEmail = (email, password) => {
    sgMail.send({
        to: email,
        from: 'merchdesign7@gmail.com',
        subject: 'Your Password for Merch Design is!',
        text: `Hello. your new Password is: ${password} `
    })
}

