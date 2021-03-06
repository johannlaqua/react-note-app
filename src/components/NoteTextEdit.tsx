import React, { Component } from 'react';
import CSS from 'csstype';

type NoteTextEditProps = {
    text: string,
    onChangeText: any,
    disabled: boolean,
}

const style: CSS.Properties = {
    padding: '10px 20px',
    height: '50vh'
}

class NoteTextEdit extends Component<NoteTextEditProps, {}> {
    render() {
        return <textarea id="textearea" style={style} disabled={this.props.disabled} value={this.props.text} onChange={(event) => this.props.onChangeText(event.target.value)}></textarea>
    }
}

export default NoteTextEdit;