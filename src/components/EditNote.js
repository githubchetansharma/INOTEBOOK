import React from 'react'
function EditNote(props) {

    const { reference, closeref, enote, onchange, handleChange } = props;


    return (
        <div>
            <button type="button" ref={reference} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className=" modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="rounded-0  modal-content">
                        <div className="modal-header text-center">
                            <h6 className="m-0 modal-title" id="exampleModalLabel">EDIT NOTE</h6>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='my-0'>

                                <div className="mb-1 ">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <select className="shadow-none rounded-0 bg-dark text-white form-select" aria-label="Default select example" id="tag" value={enote.tag} onChange={onchange} name="tag">

                                        <option value="Todo">Todo</option>
                                        <option value="Important">Important</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="shadow-none rounded-0 bg-dark text-white form-control" id="title" value={enote.title} onChange={onchange} name="title" />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="shadow-none rounded-0 bg-dark text-white form-control" id="description" name="description" value={enote.description} onChange={onchange} rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer mb-0">
                            <button ref={closeref} type="button" className="btn rounded-0  bg-danger text-white close-btn" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleChange} type="button" className="rounded-0  bg-success text-white btn">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditNote