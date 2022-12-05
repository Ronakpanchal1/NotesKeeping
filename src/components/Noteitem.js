import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { delNote, editNote } = context

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {/*
                        <h5 className="card-title">{props.note.title}</h5>
                         <i className="far fa-solid fa-trash mx-2" onClick={()=>{delNote(props.note._id)}} title="Delete note"></i>
                        <i className="far fa-solid fa-pen mx-2" onClick={editNote} title="Edit note"></i> */}
                        <div className="CSSiconPackage">
                            <h5 className="card-title">{props.note.title}<br/> <small className={`${props.note.tag === "General"?"general":""} ${props.note.tag === "Personal"?"personal":""} `}>{props.note.tag}</small></h5>
                            <div className="deleteicon" title="Delete" onClick={() => {
                                    delNote(props.note._id)
                                    props.showAlert("success",'Note Deleted !')
                             }}></div>
                            <div className="editicon" title="Edit" onClick={()=>{props.updateNote(props.note)}}></div>
                        </div>
                    </div>
                    <p className="card-text">{props.note.description}</p>
                    <a href="/" className="btn btn-primary btn-sm">View note</a>
                </div>
            </div>
        </div>
    )
}



