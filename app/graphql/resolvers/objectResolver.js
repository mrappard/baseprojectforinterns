'use strict';

const couch = require('../../couchdb/');
const logger = require('../../config/').logger;

const test = couch.db.use('testa');

module.exports = {
	getObject: (params) => {
    if(params.id)
        return test.find({selector: {
            _id: 'Object#'+ params.id}})
            .then((res) => {
                if(res.docs.length > 1)
                    return null;
                else {
                    let doc = res.docs[0];
                    return doc;
                }
            })
            .catch((err) => {
                logger.error('unable to get object ' + err);
                return err;
            });
    },
    createObject: (params) => {
        if(params.object.id && params.object.parameterA && params.object.parameterB && params.object.parameterC) {
            return test.insert({
                _id: 'Object#' + params.object.id,
                parameterA: params.object.parameterA,
                parameterB: params.object.parameterB,
                parameterC: params.object.parameterC
            })
            .then((res) => {
                if(res) {
                    logger.info('created object ');
                    return res.ok;
                }
            })
            .catch((err) => {
                logger.error('unable to create object ' + err);
                return err;                    
            });
        }
    },
    updateObject: (params) => {
        if(params.object.id && params.object._rev) {
            return test.insert({
                _id: 'Object#' + params.object.id,
                _rev: params.object._rev,
                parameterA: params.object.parameterA,
                parameterB: params.object.parameterB,
                parameterC: params.object.parameterC,
            })
            .then((res) => {
                logger.info('updated object ');
                return res.ok;
            })
            .catch((err) => {
                logger.error('unable to update object ' + err);
                return err;
            });
        }
    },
    deleteObject: ({id, _rev}) => {
        if(id && _rev)
            return test.destroy('Object#' + id, _rev)
            .then((res) => {
                return res.ok;
            })
            .catch((err) => {
                logger.error('unable to delete object or already deleted ' + err);
                return err;
            });
    }
};