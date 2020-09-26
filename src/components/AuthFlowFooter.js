import React from 'react';
import { Link } from 'react-router-dom';

const AuthFlowFooter = () => {
    return (
        <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">
                            Copyright &copy; Bug Tracker 2020
                        </div>
                        <div>
                            <Link to="/dashboard">Privacy Policy</Link>
                            &middot;
                            <Link to="/dashboard">
                                Terms &amp; Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuthFlowFooter;

// ReactDOM.render(
//     <div>
//         <Router>
//             <Switch>
//                 <Route exact path="/" component={Login} />
//                 <App>
//                     <Route path="/timeline" component={Timeline} />
//                     <Route path="/chat/:id" component={Chat} />
//                 </App>
//             </Switch>
//         </Router>
//     </div>,
//     document.getElementById('root')
// );
