// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const router = require('express-promise-router').default();
const graph = require('../graph.js');
const dateFns = require('date-fns');
const zonedTimeToUtc = require('date-fns-tz/zonedTimeToUtc');
const iana = require('windows-iana');
const { body, validationResult } = require('express-validator');
const validator = require('validator');

/* GET /calendar */
// <GetRouteSnippet>
router.get('/',
  async function(req, res) {
    if (!req.session.userId) {
      // Redirect unauthenticated requests to home page
      res.redirect('/');
    } else {
      const params = {
        messages: null,
      };

      try {
        const messages = await graph.getMessages( req.app.locals.msalClient,
          req.session.userId)
        console.log("messages: ",messages);

        // Assign the events to the view parameters
        params.messages = messages.value ;
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not fetch events',
          debug: JSON.stringify(err, Object.getOwnPropertyNames(err))
        });
      }

      res.render('messages', params);
    }
  }
);

module.exports = router;
