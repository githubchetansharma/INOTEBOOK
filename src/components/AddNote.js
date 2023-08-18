import React, { useContext, useState, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote, getNote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "Todo" })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let jsonError = await addNote(note.title, note.description, note.tag)
        if (jsonError) {
            jsonError.errors.map((err) => {
                if (err.param === 'title') {
                    setErrors((prev) => ({ ...prev, title: err.msg }))
                } else {
                    setErrors((prev) => ({ ...prev, description: err.msg }))
                }
            })
        } else {
            setnote({ title: "", description: "", tag: "" })
            setErrors({})
            props.showAlert("Note added successfully", "success")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        } else {
            navigate('/login')

        }
        // eslint-disable-next-line

    }, [])

    return (
        <div className='mb-2 form'>
            <div className='mb-4'>
                <div className="text-center">
                    <h5 className=''>ADD A NOTE</h5>
                </div>
                <div className="my-2">
                    <label htmlFor="tag" className=" form-label">Tag</label>
                    <select className="shadow-none border-dark  rounded-0 bg-orange text-dark form-select" aria-label="Default select example" id="tag" value={note.tag} onChange={onchange} name="tag">

                        <option className='border-dark rounded-0 bg-dark text-light ' value="Todo">Todo</option>
                        <option className='border-dark rounded-0 bg-dark text-light ' value="Important">Important</option>
                        <option className='border-dark rounded-0 bg-dark text-light ' value="Academic">Academic</option>
                        <option className='border-dark rounded-0 bg-dark text-light ' value="Personal">Personal</option>
                        <option className='border-dark rounded-0 bg-dark text-light ' value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-3 input-container">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="border-dark bg-light rounded-0  text-dark shadow-none form-control" id="title" value={note.title} onChange={onchange} name="title" />
                    {errors.title && <span className='error'><i className="fa fa-info-circle"></i> {errors.title}</span>}
                </div>
                <div className="mb-5 input-container">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="bg-light border-darktext-dark rounded-0 shadow-none form-control" id="description" name="description" value={note.description} onChange={onchange} rows="3"></textarea>
                    {errors.description && <span className='error'><i className="fa fa-info-circle"></i> {errors.description}</span>}
                </div>
                <div className='text-center mb-5 d-flex justify-content-center'>
                    <button className='text-white rounded-0 bg-success border-0 btn btn-primary' onClick={handleClick}>Add  Note</button>
                </div>
            </div>

        </div>
    )
}

export default AddNote