import React from 'react'
import {withRouter} from 'react-router-dom'

import App from './App'


class Root extends React.Component {

	constructor(props) {
		super(props)
		this.state = this.initialState()
	}

	componentDidMount() {
		this.props.history.listen((location, action) => {
			console.log("location", location, action, this.props)
			if(location.pathname != this.props.location.pathname) this.setState({_sidebar: false})
		})
	}

	initialState() {
		return {
			_sidebar: false
		}
	}

	setGlobal(key, val) {
		if(!key) throw "Can not set global state without key"
		this.setState({[key]: val})
	}

	render() {
		return <App {...this.props} {...this.state}
						setGlobal={(key, val) => this.setGlobal(key, val)}
					/>
	}
}

export default withRouter(Root)