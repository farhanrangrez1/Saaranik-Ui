import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Profile() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2654" 
                   alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px',marginLeft:"80px" }} />
              <h5 className="my-3">John Smith</h5>
              <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">Follow</button>
                <button type="button" className="btn btn-outline-primary ms-1">Message</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">John Smith</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">example@example.com</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Mobile</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">(098) 765-4321</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">Skills</span></p>
                  <p className="mb-1">Web Design</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Website Markup</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">One Page</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Mobile Template</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Backend API</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">Projects</span></p>
                  <p className="mb-1">E-commerce Website</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Social Media App</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Portfolio Website</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Blog Platform</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mb-1">Task Management System</p>
                  <div className="progress rounded mb-2" style={{ height: '5px' }}>
                    <div className="progress-bar" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
