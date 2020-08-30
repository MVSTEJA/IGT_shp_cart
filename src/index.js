import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();