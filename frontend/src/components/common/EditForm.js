import React from 'react';

export default class EditForm extends React.Component {
    constructor(props) {
        super(props)

        const stateObject = {}
        props.components.forEach(component => {
            stateObject[component.field] = component.value
        })

        this.state = stateObject
    }

    handleChange = (type, value) => {
        const obj = {}
        obj[type] = value
        this.setState(obj)
    }

    handleSubmit = () => {
        const obj = {}
        this.props.components.forEach(component => {
            if(!component.editable) return;
            
            const formatter = component.formatter
            const value = this.state[component.field]
            obj[component.field] = formatter == null ? value : formatter(value)
        })

        this.props.onSubmit(obj)
    }

    render() {
        let allValid = true

        return (
            <div>
                <h1>{this.props.headerText}</h1>

                {this.props.components.map(component => {
                    const value = this.state[component.field]
                    const Component = component.Component

                    if (component.editable) {
                        const error = component.validator(value)
                        allValid = allValid && !error
    
                        return <Component key={component.field}
                                          label={component.label}
                                          value={value}
                                          onChange={val => this.handleChange(component.field, val)}
                                          error={error}/>
                    }
                    
                    return <Component key={component.field}
                                      label={component.label} 
                                      value={value}/>
                })}

                <button disabled={!allValid}
                        onClick={this.handleSubmit}>
                    {this.props.submitText}
                </button>
            </div>
        )
    }
}