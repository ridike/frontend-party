import * as uuid from 'uuid'
import { shallow } from 'enzyme'
import { createMemoryHistory } from 'history'
import LoginPage from 'auth/loginPage'
import { Navigation } from 'navigation'

describe('LoginPage', () => {
  const history = createMemoryHistory()
  const navigation = new Navigation(history, history.location)

  it ('Should render required elements', () => {
    const loginPromise = Promise.resolve(true)
    const login = jest.fn<Promise<boolean>, []>()
    login.mockReturnValueOnce(loginPromise)

    const wrapper = shallow(
      <LoginPage
        login={login}
        history={history}
        navigation={navigation}
      />
    )

    expect(wrapper.find('#login-username').exists()).toBeTruthy()
    expect(wrapper.find('#login-password').exists()).toBeTruthy()
    expect(wrapper.find('#login-form').exists()).toBeTruthy()
  })

  it('Should redirect to landing page after a successful login', async () => {
    const username = uuid.v4()
    const password = uuid.v4()

    const loginPromise = Promise.resolve(true)
    const login = jest.fn<Promise<boolean>, []>()
    login.mockReturnValueOnce(loginPromise)

    let navigatedTo: string|null = null

    history.listen(loc => {
      navigatedTo = loc.pathname
    })

    const wrapper = shallow(
      <LoginPage
        login={login}
        history={history}
        navigation={navigation}
      />
    )

    wrapper.find('#login-username').at(0)
      .simulate('change', { target: { value: username }})
    wrapper.find('#login-password').at(0)
      .simulate('change', { target: { value: password }})

    wrapper.find('#login-form').at(0).simulate('submit', { preventDefault: () => {}})

    expect(login).toBeCalledWith(username, password)
    await loginPromise
    expect(navigatedTo).toEqual('/')
  })

  it('Should not call login when no username has been entered', async () => {
    const loginPromise = Promise.resolve(true)
    const login = jest.fn<Promise<boolean>, []>()
    login.mockReturnValueOnce(loginPromise)

    const wrapper = shallow(
      <LoginPage
        login={login}
        history={history}
        navigation={navigation}
      />
    )

    wrapper.find('#login-password').at(0)
      .simulate('change', { target: { value: 'password' }})

    wrapper.find('#login-form').at(0).simulate('submit', { preventDefault: () => {}})

    expect(login).toHaveBeenCalledTimes(0)
  })

})
