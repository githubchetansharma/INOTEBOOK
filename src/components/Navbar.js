import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <nav className="bg-black  navbar navbar-expand-lg "  style={{backgroundColor: "#e3f2fd",opacity:"70%"}}>
                <div className="container-fluid">
                    <h4 className="" href="#"><span className='text-primary'>MY</span><span className='text-danger'>NO</span><span className='text-warning'>T</span><span className='text-primary'>E</span><span className='text-success'>BO</span><span className='text-danger'>OK</span></h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto  mb-lg-0">
                            <li className=" nav-item m-2">
                                <Link to="/notes"  className={`nav-link ${location.pathname === "/notes" ? "text-muted" : "active text-white "}`} aria-current="page" > MYNOTES</Link>
                            </li>
                            <li className="m-2 nav-item">
                                <Link to="/" className={`nav-link ${location.pathname === "/" ? "text-muted" : "active text-white "}`} aria-current="page" >+NOTES</Link>
                            </li>
                            <li className="m-2 nav-item" >
                                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "text-muted" : "active text-white "}`} >ABOUT US</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className='d-flex'>
                                <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} ><i data-toggle="tooltip" data-placement="right " title="SIGN IN" class="bg-black text-white fa-solid fa-right-to-bracket"></i></Link>
                                <Link to="/signup" className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`} ><i data-toggle="tooltip" data-placement="right " title="SIGN UP" class="fa-solid fa-user-plus text-black text-white"></i></Link>
                            </form>:
                            <Link to="/login" onClick={handleLogout} className={`nav-link ${location.pathname === "/logout" ? "active " : ""}`} ><span className='text-white m-2'>log-out</span><i class="fa-solid fa-power-off text-danger"></i></Link>
                        }

                    </div>
                </div>
            </nav>


        </div>
    )
}
export default Navbar