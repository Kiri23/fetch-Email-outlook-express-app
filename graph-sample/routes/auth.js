// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const graph = require('../graph');
const router = require('express-promise-router').default();

/* GET auth callback. */
router.get('/signin',
  async function (req, res) {
    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
    const urlParameters = {
      scopes: scopes.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI
    };

    try {
      const authUrl = await req.app.locals
        .msalClient.getAuthCodeUrl(urlParameters);
      console.log(`Generated auth url: ${authUrl}`);
      res.redirect(authUrl);
    }
    catch (error) {
      console.log(`Error: ${error}`);
      req.flash('error_msg', {
        message: 'Error getting auth URL',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
      res.redirect('/');
    }
  }
);

// <CallbackSnippet>
router.get('/callback',
  async function(req, res) {
    console.log("callback called");
    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
    const tokenRequest = {
      code: req.query.code,
      scopes: scopes.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI
    };
    console.log("tokenRequest: ",tokenRequest);
    try {
      const response = await req.app.locals
        .msalClient.acquireTokenByCode(tokenRequest);
      console.log("response: ",response);

      // Save the user's homeAccountId in their session
      req.session.userId = response.account.homeAccountId;

      const user = await graph.getUserDetails(
        req.app.locals.msalClient,
        req.session.userId
      );

      // Add the user to user storage
      req.app.locals.users[req.session.userId] = {
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
      };
    } catch(error) {
      console.error(error);
      // @ts-ignore
      console.error(error.stack)
      req.flash('error_msg', {
        message: 'Error completing authentication',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
    }

    res.redirect('/');
  }
);
// </CallbackSnippet>

router.get('/signout',
  async function(req, res) {
    // Sign out
    if (req.session.userId) {
      // Look up the user's account in the cache
      const accounts = await req.app.locals.msalClient
        .getTokenCache()
        .getAllAccounts();

      const userAccount = accounts.find(a => a.homeAccountId === req.session.userId);

      // Remove the account
      if (userAccount) {
        req.app.locals.msalClient
          .getTokenCache()
          .removeAccount(userAccount);
      }
    }

    // Destroy the user's session
    req.session.destroy(function () {
      res.redirect('/');
    });
  }
);

module.exports = router;
