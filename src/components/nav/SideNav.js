import React from 'react'
import {NavLink, Link, withRouter, matchPath} from 'react-router-dom';
import styles from './SideNav.module.css'
import { SideNavContent } from './SideNavContent';

class SideNav extends React.Component {

	render() {
        const {routes, children} = this.props
        
		return(
			<div className="three wide computer only column" id={"SideNav"}>
				<SideNavContent {...this.props} />
			</div>
		)
	}
}
export {SideNav}
