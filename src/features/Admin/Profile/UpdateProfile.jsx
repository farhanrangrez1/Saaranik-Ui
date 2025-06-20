import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { SingleUser } from '../../../redux/slices/userSlice';
import { apiUrl } from '../../../redux/utils/config';

function UpdateProfile() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: '',
    profileImage: '',
    assign: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const { UserSingle } = useSelector((state) => state.user);

  // On mount: fetch user
  useEffect(() => {
    dispatch(SingleUser());
  }, [dispatch]);

  // Set form data when user loaded
  useEffect(() => {
    if (UserSingle) {
      setForm({
        _id: UserSingle._id || '',
        firstName: UserSingle.firstName || '',
        lastName: UserSingle.lastName || '',
        email: UserSingle.email || '',
        phone: UserSingle.phone || '',
        state: UserSingle.state || '',
        country: UserSingle.country || '',
        profileImage: UserSingle.profileImage?.[0] || '',
        assign: UserSingle.assign || '',
        role: UserSingle.role || '',
      });
    }
  }, [UserSingle]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files && files[0]) {
      setForm({ ...form, profileImage: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Remove email from payload (if not allowed to update)
      const payload = { ...form };
      delete payload.email;

      const response = await fetch(`${apiUrl}/user/${form._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: 1000 }}>
        <div
          className="rounded-4 shadow-lg border-0 p-0"
          style={{
            background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
          }}
        >
          {/* Profile Image Section */}
          <div className="d-flex flex-column align-items-center pt-5 pb-2 position-relative">
            <div className="position-relative" style={{ marginBottom: 12 }}>
              <img
                src={
                  form.profileImage ||
                  'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2654'
                }
                alt="Preview"
                className="rounded-circle border border-3 border-primary shadow-lg"
                style={{
                  width: 110,
                  height: 110,
                  objectFit: 'cover',
                  background: '#fff',
                }}
              />
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 border shadow"
                style={{ transform: 'translate(25%, 25%)' }}
                onClick={handleImageClick}
                title="Change profile picture"
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <input
                type="file"
                className="form-control"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </div>

            <h2
              className="fw-bold mb-2 text-primary text-center"
              style={{ fontSize: '1.7rem' }}
            >
              Update Profile
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="px-4 pb-4 pt-2"
          >
            <div className="row g-4">
              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
                <label htmlFor="firstName">
                  <i className="bi bi-person me-2"></i>First Name
                </label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
                <label htmlFor="lastName">
                  <i className="bi bi-person me-2"></i>Last Name
                </label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  placeholder="Email"
                  disabled
                />
                <label htmlFor="email">
                  <i className="bi bi-envelope-at me-2"></i>Email
                </label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                <label htmlFor="phone">
                  <i className="bi bi-telephone me-2"></i>Phone
                </label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                />
                <label htmlFor="state">
                  <i className="bi bi-geo-alt me-2"></i>State
                </label>
              </div>

              <div className="col-md-6 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
                <label htmlFor="country">
                  <i className="bi bi-globe me-2"></i>Country
                </label>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-4 d-flex align-items-center">
                <i className="bi bi-x-circle-fill me-2"></i>
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success mt-4 d-flex align-items-center">
                <i className="bi bi-check-circle-fill me-2"></i>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-4 px-4 w-100"
              style={{ fontWeight: 600, fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </span>
              ) : (
                'Update Profile'
              )}
            </button>
          </form>

          <style>{`
            .btn[title='Change profile picture']:hover {
              background: #e0e7ff;
              color: #6366f1;
              border-color: #6366f1;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
