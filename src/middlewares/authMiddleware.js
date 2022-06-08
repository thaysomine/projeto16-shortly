import joi from 'joi';
import bcrypt from 'bcrypt';

import db from '../db.js';

export async function signUpValidation(req, res, next) {
    const {name, email, password, confirmPassword} = req.body;
    console.log('body do cadastro', req.body);
    const user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().pattern(/\S+@\S+\.\S+/),
        password: joi.string().required().max(20).min(6),
        confirmPassword: joi.string().required().valid(joi.ref('password'))
    });
    const validation = schema.validate(user);
    if(validation.error){
        console.log('Erro ao cadastrar usuário', validation.error);
        res.status(422).send('Erro ao cadastrar usuario', validation.error);
        return;
    }

    try {
        const checkName = await db.query('SELECT name FROM users WHERE name = $1', [name]);
        const checkEmail = await db.query('SELECT email FROM users WHERE email = $1', [email]);

        if(checkName.rows.length > 0){
            res.status(409).send('Nome de usuário já cadastrado');
            console.log('Nome de usuário já cadastrado');
            return;
        }
        if(checkEmail.rows.length > 0){
            res.status(409).send('Email já cadastrado');
            console.log('Email já cadastrado');
            return;
        }

    } catch (e) {
        res.status(422).send('Erro ao cadastrar usuário');
        console.log('Erro ao cadastrar usuário', e);
        return;
    }
    
    next();
}