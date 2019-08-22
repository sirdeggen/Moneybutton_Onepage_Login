# Moneybutton Onepage Login
Next.js Moneybutton Oauth example.

For people who just want to be able to dump a login page onto their site and use the userid and name of a moneybutton user.

# Install Next.js and moneybutton's api client
`npm install --save next react react-dom @moneybutton/api-client`

https://nextjs.org/docs for more info.

Then copypaste the file in this repo into your oauth target page:

`/webroot-of-your-server/pages/oath.js`

Changing the constants at the top to reflect your OAUTH identifier (found on moneybutton.com when you make a new app in settings)

const OAUTH_IDENTIFIER = 'xxxxxxxxxxxxxxx'
const OAUTH_CALLBACK_URL = 'https://yourwebsite.com/oauth'

I really struggled to get this to work at first so hopefully this will save others some time.
