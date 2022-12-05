import React,{useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote(props) {
    const [note,setNote] = useState({ title:"", description:"", tag:"" })
    const context = useContext(noteContext)
    const {addNote} = context

    const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }

    const saveNote = (e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag)
      setNote({ title:"", description:"", tag:"" })
      props.showAlert('success',"Note added successfully")
    }

  return (
    <div className='container my-4'>
      <h2>Add Notes...</h2>
        <form>
          <div className="mb-3 my-4">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary " onClick={saveNote} >Save Note</button>
        </form>
    </div>
  )
}
