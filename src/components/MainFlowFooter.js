import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">
                        Copyright &copy; Bug Tracker 2020
                    </div>
                    <div>
                        <Link to="/dashboard">Privacy Policy</Link>
                        &middot;
                        <Link to="/dashboard">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
