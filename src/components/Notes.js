import React, { useState } from 'react'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'

export default function Notes(props) {
    let history = useNavigate()

    const context = useContext(noteContext)
    const { notes, getAllNotes, editNote } = context
    const {showAlert} = props

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes()
        } else {
            history('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const saveNote = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        showAlert('success',"Note Updated !")

    }

    return (<>
        <Addnote showAlert={showAlert}/>
        <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3 my-4">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 3 || note.edescription.length < 3} type="button" className="btn btn-primary" onClick={saveNote}>Update note</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='row my-3'>
            <h2>Your Notes...</h2>
            <div className="container mx-4 mt-2">
                {notes.length === 0 && "No notes to display"}
            </div>
            {notes.map((note) => {
                return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={showAlert}/>
            })}
        </div>
    </>
    )
}
