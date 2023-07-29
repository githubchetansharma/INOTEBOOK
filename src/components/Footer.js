import React from 'react'

function Footer() {
    return (
        <div className='container-fluid m-0 p-4 bg-dark'><footer className="mb-0 d-flex flex-wrap justify-content-between align-items-center py-3 p-5 m-5 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <p href="/" className="mb-3  mb-md-0 text-muted text-decoration-none lh-1">©2023 <span className='text-primary'>MY</span><span className='text-danger'>NO</span><span className='text-warning'>T</span><span className='text-primary'>E</span><span className='text-success'>BO</span><span className='text-danger'>OK</span> , <span>Inc. All rights reserved.</span></p>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <i class="text-white   m-2 fa-brands fa-instagram"></i>
            <i class=" text-white  m-2 fa-brands fa-github"></i>
            <i class=" text-white  m-2 fa-brands fa-linkedin"></i>
            </ul>
        </footer></div>

    )
}
export default Footer
