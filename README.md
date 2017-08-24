# react-hoc-mutate

HOC to help you mutate restful data. It provides the following convenient
features:

- You can optionally setup a global mutate error handler to centralize error
  processing (`mutate.onError(e)`). E.g, display a dialog for network errors.
- You can optionally setup `mutate.openLoading()`, `mutate.closeLoading()`
  and `mutate.loadingWait` to implement displaying a loading indicator UI
  should the mutate result delays for too long (longer than `mutate.loadingWait`)

## Installation

```bash
yarn add react-hoc-mutate
```

## Basic Usage

```js
import React from "react"
import mutate from "react-hoc-mutate"

@mutate({
  name: "login",
  op: api.login,
})
class Login from React.Component {
  render() {
    return (
      <button onClick={this.login}>Login</button>
    )
  }

  login = async () => {
    try {
      await this.props.login()
    } catch (e) {
      // handle it on a case by case basis
    }
  }
}
```

### Global onError handler

on your app entry:

```js
import mutate from "react-hoc-mutate"

// Global error handling, case by case error handling is still in effect.
mutate.onError = err => {
  if (err.type === "your_error_type") {
    // dispatch action to open error dialog
  }
}
```

### Global loading indicator popup handler

on your app entry:

```js
import mutate from "react-hoc-mutate"

// If a mutate finishes before this times out then `openLoading`
// will not get called.
mutate.loadingWait = 0.1 // defaults to 0.1sec

mutate.openLoading = () => {
  // dispatch action to popup loading indicator
}

mutate.closeLoading = () => {
  // dispatch action to close loading indicator
}
```

## Dev setup

1. `yarn`

### npm run tasks

- **yarn build**: Transpile source code
