import React from 'react'


class ContentWrapper extends React.Component {

    render() {
        var ContentComponent = this.props.component
		const {match} = this.props
		return(
			<div className="ui stackable equal width grid">
				{ ContentComponent ? <ContentComponent key={match.url} {...this.props} /> : this.props.children }
			</div>
		)
    }
}

export { ContentWrapper }