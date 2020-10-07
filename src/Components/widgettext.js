import React from 'react'

export default function Widgettext(props) {
    return (
        <div className="widgetwrap">
            <div className="widgettitle">{props.title}</div> 
            <div className="widgetvalue">
            <div className="value">{props.value}</div>
            <div className="description">{props.description}</div>
            </div>
        </div>
    )
}
