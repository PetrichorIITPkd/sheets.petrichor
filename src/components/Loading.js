import React from "react"

const Loading = (props) => {
	if(props.spinning){
		return (
			<div class="main">
				<div class="spinner" />
			</div>
		)
	}
}

export default  Loading;