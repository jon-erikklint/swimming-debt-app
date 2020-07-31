import React from 'react';
import { Redirect } from "react-router-dom"

export default function redirectOnSubmit(Component, redirection) {
    return class extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                redirect: false
            }
        }

        handleSubmit = e => {
            this.setState({redirect: true})
            this.props.onSubmit(e)
        }

        render() {
            if(this.state.redirect) return <Redirect to={redirection}/>

            const {onSubmit, ...otherParams} = this.props

            return <Component onSubmit={this.handleSubmit} {...otherParams} />
        }
    }
}