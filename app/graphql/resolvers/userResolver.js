'use strict';

const logger = require('../../config/').logger;

const db = require('../../couchdb').mainData;

const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcryptjs')),
    SALT_WORK_FACTOR = 10,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 1 * 60 * 60 * 1000;

module.exports = {
	getUser: (params) => {
        if(params.email)
            return db().find({selector: {
                _id: 'User#'+ params.email}})
                .then((res) => {
                    if(res.docs.length > 1)
                        return null;
                    else {
                        let doc = res.docs[0];
                        return doc;
                    }
                })
                .catch((err) => {
                    logger.error('unable to get user ' + err);
                    return err;
                });
    },
    signupUser: async (params) => {
        if(params.email && params.password) {
            try {
                let salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
                let hash = await bcrypt.hashAsync(params.password, salt);

                params.password = hash;

                let res = await db().insert({
                        _id: 'User#' + params.email,
                        email: params.email,
                        password: params.password,
                        ticketsGenerated : 0
                    });

                logger.info('Created user ');
                return res.ok;
            } catch (err) {
                logger.error('Unable to create user ' + err);
                return false;
            }
        } else {
            logger.error('Fill out form completely.');
            return false;
        }
    },
    updateUser: async (params) => {
        if(params.email) {
            try {
                let users = await db().find({selector: {_id: 'User#'+ params.email}});
                if(users.docs.length > 1)
                    return null;
                let doc = users.docs[0];
                if(doc) {
                    if(params.password) {
                        let salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
                        let hash = await bcrypt.hashAsync(params.password, salt);
        
                        params.password = hash;

                        let status = await db().insert({_id: doc._id, _rev: doc._rev, password: hash, email: params.email, ticketsGenerated : doc.ticketsGenerated});
                        logger.info('updated user ');
                        return status.ok;                        
                    }else if (params.ticketsGenerated){
                        let status = await db().insert({_id: doc._id, _rev: doc._rev, password: doc.password, email: params.email, ticketsGenerated : doc.ticketsGenerated + params.ticketsGenerated});
                        logger.info('updated user ');
                        return status.ok; 
                    } else {
                        //nothing else to update right now
                        return true;
                    }
                } else
                    return false;
            } catch (err) {
                logger.error('unable to update user ' + err);
                return err;                
            }
        }
    },
    deleteUser: async (params) => {
        if(params.email) {
            try {
                let users = await db().find({selector: {_id: 'User#'+ params.email}});
                if(users.docs.length > 1)
                    return null;
                let doc = users.docs[0];
                if(doc) {
                    let status = await db().destroy(doc._id, doc._rev);
                    return status.ok;
                } else
                    return false;
            } catch (err) {
                logger.error('unable to delete user or already deleted ' + err);
                return err;                
            }
        }
    }
};