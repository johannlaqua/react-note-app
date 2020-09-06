import * as React from 'react';
import NoteList from 'components/NoteList';
import { RightPane } from 'components/RightPane';
import { LeftPane } from 'components/LeftPane';
import { Switch, Route, useParams, withRouter, RouteComponentProps } from 'react-router-dom';
import { NoteModel } from 'models/NoteModel';
import NoteItem from '../components/NoteItem';
import { useState, useEffect } from 'react';

function NoNote() {
    return (
        <div className="App-NoNote">please select a note</div>
    )
}

export interface NotesContainerProps extends RouteComponentProps<any> {
    notes: NoteModel[],
}
 
export interface NotesContainerState {
    notes: NoteModel[],
}

class NotesContainer extends React.Component<NotesContainerProps, NotesContainerState> {
    state = {
        notes: this.props.notes
    }

    componentDidUpdate(prevProps: NotesContainerProps) {
        if (prevProps.notes && (this.props.notes.length === (prevProps.notes.length + 1))) {
            // we added new note
            this.setState({notes: this.props.notes}, () => {
                if (this.props.notes) {
                    this.props.history.push(`/${this.props.notes[this.props.notes.length -1].id}`);
                }
            });
        }
    }

    editNote(edited: NoteModel) {
        const index = this.state.notes.findIndex((e: NoteModel) => e.id === edited.id);
        let newNotes = [...this.state.notes];
        newNotes[index] = edited;
        this.setState({ notes: newNotes });
    }

    deleteNote(deleting: NoteModel) {
        let newNotes = [...this.state.notes];
        newNotes = newNotes.filter((e: NoteModel) => e.id !== deleting.id);
        this.setState({ notes: newNotes });
    }

    render() {
        return (
            <React.Fragment>
                <LeftPane>
                    <NoteList notes={this.state.notes}/>
                </LeftPane>
                <RightPane>
                    <Switch>
                        <Route path="/:id" render={(props) => 
                            <Child {...props}
                                notes={this.state.notes}
                                onSaveNote={(edited: NoteModel) => this.editNote(edited)}
                                onDeleteNote={(deleting: NoteModel) => this.deleteNote(deleting)}
                            />}
                        />
                        <Route path="*">
                            <NoNote />
                        </Route>
                    </Switch>
                </RightPane>
            </React.Fragment>
        );
    }
}

function Child(props: any) {
    let { id } = useParams();

    const [note, setNote] = useState(
        props.notes.find((n: NoteModel) => n.id === id)
    );

    const findNote = (id: string): NoteModel => {
        return props.notes.find((n: NoteModel) => n.id === id);
    }

    useEffect(() => {
        setNote(findNote(props.match.params.id));
    }, [props.match.params.id]);

    useEffect(() => {
        setNote(findNote(note ? note.id : null));
    }, [note]);

    if (note) {
        return (
            <NoteItem note={note}
                onSaveNote={(edited: NoteModel) => props.onSaveNote(edited)}
                onDeleteNote={(deleting: NoteModel) => props.onDeleteNote(deleting)}
            />
        )
    }
    return <NoNote />
}  
 
export default withRouter(NotesContainer);