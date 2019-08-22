import React from 'react'
import { MoneyButtonClient, AuthError as MoneyButtonAuthError } from '@moneybutton/api-client'
const OAUTH_IDENTIFIER = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const OAUTH_CALLBACK_URL = 'https://xxxxxxxxxxx.com/oauth'

async function loginMB () {
  try {
    const client = new MoneyButtonClient(OAUTH_IDENTIFIER)
    client.requestAuthorization('auth.user_identity:read', OAUTH_CALLBACK_URL)
  } catch (e) {
    if (e instanceof MoneyButtonAuthError) {
      throw new Error(`Authorization grant failed: ${e.message}.`)
    }
    throw e
  }
}

const LoginButton = () => (
  <button onClick={loginMB}>Login</button>
)

const LoggedIn = () => (
  <button className='nametarget'>User:</button>
)

export default class Oauth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      client: null,
      loggedIn: false
    }
  }

  async componentDidMount () {
    try {
      await this.ensureMoneyButtonClientIsLoaded()
      const { client } = this.state
      await client.handleAuthorizationResponse()
      const { id: moneyButtonId, name: moneyButtonName } = await client.getIdentity()
      await new Promise(async resolve => {
        try {
          this.setState({
            user: { id: moneyButtonId, name: moneyButtonName },
            loggedIn: true
          }, resolve)
        } catch (e) {
          this.setState({
            client: false,
            loggedIn: false,
            error: e.message
          }, resolve)
        }
      })
    } catch (e) {
      console.log(e)
    }
    if (this.state.loggedIn) {
      document.querySelector('.nametarget').innerText += ' ' + this.state.user.name
    }
  }

  async ensureMoneyButtonClientIsLoaded () {
    let { client } = this.state
    if (client === null) {
      client = new MoneyButtonClient(OAUTH_IDENTIFIER)
      await this.forceStateUpdate({ client })
    }
  }

  async forceStateUpdate (state) {
    await new Promise(resolve => this.setState(state, resolve))
  }

  render () {
    return (
        <section>
          { this.state.loggedIn ? <LoggedIn /> : <LoginButton /> }
        </section>
    )
  }
}
