import React from "react"
import timer from "react-hoc-timerfuncs"

function displayName(Comp) {
  return Comp.displayName || Comp.name || "Component"
}

function mutate({ name = "mutate", op }) {
  return Comp => {
    @timer
    class Mutate extends React.Component {
      static displayName = `Mutate(${displayName(Comp)})`

      render() {
        /* eslint-disable no-unused-vars */
        const { ...attrs } = this.props
        /* eslint-enable no-unused-vars */

        const props = {
          [name]: this.mutate,
        }

        return <Comp {...attrs} {...props} />
      }

      mutate = async (...args) => {
        const { setTimeout, clearTimeout } = this.props

        try {
          this.loadTimer = setTimeout(
            mutate.openLoading,
            mutate.loadingWait * 1000,
          )
          const data = await op(...args)
          clearTimeout(this.loadTimer)
          return data
        } catch (e) {
          clearTimeout(this.loadTimer)
          mutate.onError(e)
          throw e
        } finally {
          mutate.closeLoading()
        }
      }
    }
    return Mutate
  }
}

mutate.loadingWait = 0.1
mutate.openLoading = () => {}
mutate.closeLoading = () => {}
mutate.onError = () => {}

export default mutate
