import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'

import Customer from "../../../models/users/customer";
import sendMail from '../../../utils/mails/mail'

dotenv.config();

export const signup = async (req, res) => {
    try {
        console.log("req body", req.body)
        const {email , password, name , username} = req.body;

        const customerExists = await checkIfCustomerExists(email, username)
        if(customerExists){
            return res.status(403).send({
                message: "Customer already exists with this username or password"
            })
        }

        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), async (err, hash) => {
            if(err){
                console.error(err)
                return res.status(500).send({
                    message: "Error signing up customer"
                })
            }
           
            const data = await  ejs.renderFile(__dirname + './../../../views/welcomeMail.ejs', {
                user_firstname: name,
                confirm_link: 'http://www.8link.in/confirm='
            })

            
            await sendMail(email, "Email Verification", data );
            let deadLineTime =  moment().add(2, 'h').toDate()
            const customer = new Customer({
                email,
                hashed_password: hash,
                name,
                username,
                history: [
                    {activity: "Customer signed up"}
                ],
                passwordRecords: [{
                    oldPassword: hash,
                    newPassword: hash
                }],
                emailVerification: 'sent',
                emailDeadlineTime: deadLineTime,

            });
            customer.save((err, customer) => {
                console.log("err ", err, customer)
                if(err){
                    console.error("err ", err)
                    return res.status(500).send({
                        message: "Error signing up customer"
                    })
                }

                return res.status(200).send({
                    message: "Customer signed up successfully"
                })
            })
        });


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "error": "Some error occurred"
        })
    }
}

export const checkIfCustomerExists = async (email , username ) => {
    try {
        const customer = await Customer.findOne({
            $or: [
                {email},
                {username}
            ]
        }).lean();

        if(customer) {
            console.log("customer ", customer)
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}


//console.log(checkIfCustomerExists("email", "username"));