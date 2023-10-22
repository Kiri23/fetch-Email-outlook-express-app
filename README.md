---
page_type: sample
description: This sample demonstrates how to use the Microsoft Graph JavaScript SDK to access data in Office 365 from Node.js Express apps.
products:
  - ms-graph
  - microsoft-graph-calendar-api
  - office-exchange-online
languages:
  - nodejs
---

christian comment
This work. The way I made it to work was to used IPV4 with family 4 that force the client to use IPV4.
This will sign in the user and get the token.
then you can click (if everything went ok which I spent a weekend trying to figure out. ) on the messages nav item and it should show you the subject on a table.
Please note this was dificult to set up so probably something can break on the way
I register an application on azure directory, I add myself as a owner in the owner tab on the right side of the screen.
I add the redirect url to http://localhost:3000/auth/callback
I add the client id and secret to the .env file
the secret was generated om certificate and request. The secret is the one that said value and not the one that said id.
the supported account type is any organization and personal microsoft accounts.(siginAudience: AzureADandPersonalMicrosoftAccount)

The permision need to be delegated because application permisions are not supported for personal accounts. but applications permsisons do not require a sign in.
delegate permisions require a sign in. and you act as a behalf of the user

for the permisions you need to grant admin consent.
the permisions to read emails are mail.read and mail.readbasic
but user.read is also needed to get the user id.

Allow public client flows is set to no

that should be all i learn during this week. the most difficult thing was to get the token and then use the graph client to get the messages. I use the authorization code flow. The code should give you a redirect url for you to sign , after sign it will redirect you to the redirect url. the redirect url will have a code that you can use to get the token. the token is then passed to every call for the graph client. That flow was completed complicated to accomplish because you have multiple ways of authentication and then one i need required user log in because im using outlook personal account and want to read my personal emails.

i hope this help the future me if i ever need to do this again.

ref postman: https://web.postman.co/workspace/Tes~01daf001-378b-4356-91a8-63e64b2ed5a0/request/740324-34a7cc23-1048-44d1-9ea7-ba9dca2ef668
This is the manifest
{
"id": "67fe50c4-20d9-4612-8bc8-857d2dc530e4",
"acceptMappedClaims": null,
"accessTokenAcceptedVersion": 2,
"addIns": [],
"allowPublicClient": null,
"appId": "id here",
"appRoles": [],
"oauth2AllowUrlPathMatching": false,
"createdDateTime": "2023-10-22T07:57:06Z",
"description": null,
"certification": null,
"disabledByMicrosoftStatus": null,
"groupMembershipClaims": null,
"identifierUris": [],
"informationalUrls": {
"termsOfService": null,
"support": null,
"privacy": null,
"marketing": null
},
"keyCredentials": [],
"knownClientApplications": [],
"logoUrl": null,
"logoutUrl": null,
"name": "the_one_that_work_in_node.js",
"notes": null,
"oauth2AllowIdTokenImplicitFlow": false,
"oauth2AllowImplicitFlow": false,
"oauth2Permissions": [],
"oauth2RequirePostResponse": false,
"optionalClaims": null,
"orgRestrictions": [],
"parentalControlSettings": {
"countriesBlockedForMinors": [],
"legalAgeGroupRule": "Allow"
},
"passwordCredentials": [
{
"customKeyIdentifier": null,
"endDate": "2024-10-22T08:20:05.07Z",
"keyId": "401d2c36-09ea-4163-9ac6-8203d3cd5b70",
"startDate": "2023-10-22T08:20:05.07Z",
"value": null,
"createdOn": "2023-10-22T08:20:07.8095779Z",
"hint": "vau",
"displayName": "Quickstart - Sun Oct 22 2023"
},
{
"customKeyIdentifier": null,
"endDate": "2024-04-19T07:59:29.297Z",
"keyId": "4810ef0e-78e1-481c-98b3-3695cf229a9e",
"startDate": "2023-10-22T07:59:29.297Z",
"value": null,
"createdOn": "2023-10-22T07:59:33.904943Z",
"hint": "9hD",
"displayName": "tes"
}
],
"preAuthorizedApplications": [],
"publisherDomain": "remove for privacy",
"replyUrlsWithType": [
{
"url": "http://localhost:3000/auth/callback",
"type": "Web"
}
],
"requiredResourceAccess": [
{
"resourceAppId": "00000003-0000-0000-c000-000000000000",
"resourceAccess": [
{
"id": "570282fd-fa5c-430d-a7fd-fc8dc98a9dca",
"type": "Scope"
},
{
"id": "87f447af-9fa4-4c32-9dfa-4a57a73d18ce",
"type": "Scope"
},
{
"id": "818c620a-27a9-40bd-a6a5-d96f7d610b4b",
"type": "Scope"
},
{
"id": "7427e0e9-2fba-42fe-b0c0-848c9e6a8182",
"type": "Scope"
},
{
"id": "37f7f235-527c-4136-accd-4a02d197296e",
"type": "Scope"
},
{
"id": "14dad69e-099b-42c9-810b-d002981feec1",
"type": "Scope"
},
{
"id": "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
"type": "Scope"
},
{
"id": "a154be20-db9c-4678-8ab7-66f6cc099a59",
"type": "Scope"
},
{
"id": "810c84a8-4a9e-49e6-bf7d-12d183f40d01",
"type": "Role"
},
{
"id": "df021288-bdef-4463-88db-98f22de89214",
"type": "Role"
}
]
}
],
"samlMetadataUrl": null,
"signInUrl": null,
"signInAudience": "AzureADandPersonalMicrosoftAccount",
"tags": [],
"tokenEncryptionKeyId": null
}

# Microsoft Graph sample Node.js Express app

[![Node.js build](https://github.com/microsoftgraph/msgraph-training-nodeexpressapp/actions/workflows/node.js.yml/badge.svg)](https://github.com/microsoftgraph/msgraph-training-nodeexpressapp/actions/workflows/node.js.yml) ![License.](https://img.shields.io/badge/license-MIT-green.svg)

This sample demonstrates how to use the Microsoft Graph JavaScript SDK to access data in Office 365 from Node.js Express apps.

## Prerequisites

To run the completed project in this folder, you need the following:

- [Node.js](https://nodejs.org) installed on your development machine. If you do not have Node.js, visit the previous link for download options.
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

If you don't have a Microsoft account, there are a couple of options to get a free account:

- You can [sign up for a new personal Microsoft account](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=12&ct=1454618383&rver=6.4.6456.0&wp=MBI_SSL_SHARED&wreply=https://mail.live.com/default.aspx&id=64855&cbcxt=mai&bk=1454618383&uiflavor=web&uaid=b213a65b4fdc484382b6622b3ecaa547&mkt=E-US&lc=1033&lic=1).
- You can [sign up for the Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) to get a free Microsoft 365 subscription.

## Register a web application with the Azure Active Directory admin center

1. Open a browser and navigate to the Azure Active Directory admin center. Login using a **personal account** (aka: Microsoft Account) or **Work or School Account**.

1. Select **Azure Active Directory** in the left-hand navigation, then select **App registrations** under **Manage**.

1. Select **New registration**. On the **Register an application** page, set the values as follows.

   - Set **Name** to `Node.js Graph Sample`.
   - Set **Supported account types** to **Accounts in any organizational directory and personal Microsoft accounts**.
   - Under **Redirect URI**, set the first drop-down to `Web` and set the value to `http://localhost:3000/auth/callback`.

1. Choose **Register**. On the **Node.js Graph Sample** page, copy the value of the **Application (client) ID** and save it, you will need it in the next step.

1. Select **Certificates & secrets** under **Manage**. Select the **New client secret** button. Enter a value in **Description** and select one of the options for **Expires** and choose **Add**.

1. Copy the client secret value before you leave this page. You will need it in the next step.

   > [!IMPORTANT]
   > This client secret is never shown again, so make sure you copy it now.

## Configure the sample

1. Rename the `example.env` file to `.env`.
1. Edit the `.env` file and make the following changes.
   1. Replace `YOUR_CLIENT_ID_HERE` with the **Application Id** you got from the App Registration Portal.
   1. Replace `YOUR_CLIENT_SECRET_HERE` with the client secret you got from the App Registration Portal.
1. In your command-line interface (CLI), navigate to the **graph-sample** directory and run the following command to install requirements.

   ```Shell
   npm install
   ```

## Run the sample

1. Run the following command in your CLI to start the application.

   ```Shell
   npm start
   ```

1. Open a browser and browse to `http://localhost:3000`.

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
