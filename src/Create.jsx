import { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './config/firebase';
import Sidebar from './components/Sidebar';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    hasDate: false,
    date: '',
    hasTime: false,
    time: '',
    hasLocation: false,
    location: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = (field) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: !prev[field] };
      
      if (field === 'hasDate' && newState.hasDate) {
        newState.date = new Date().toISOString().split('T')[0];
      } else if (field === 'hasDate' && !newState.hasDate) {
        newState.date = '';
      }
      
      if (field === 'hasTime' && newState.hasTime) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        newState.time = `${hours}:${minutes}`;
      } else if (field === 'hasTime' && !newState.hasTime) {
        newState.time = '';
      }
      
      if (field === 'hasLocation' && !newState.hasLocation) {
        newState.location = '';
      }
      
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.notes) {
      alert("Please fill in both Title and Notes.");
      return;
    }

    const now = new Date();
    if (formData.hasDate) {
      if (formData.hasTime) {
        const scheduled = new Date(`${formData.date}T${formData.time}`);
        if (isNaN(scheduled.getTime())) {
          alert('Invalid date or time');
          return;
        }
        if (scheduled <= now) {
          alert('Please choose a future date and time.');
          return;
        }
      } else {
        const scheduledDate = new Date(formData.date + 'T23:59:59');
        if (isNaN(scheduledDate.getTime())) {
          alert('Invalid date');
          return;
        }
        if (scheduledDate < now) {
          alert('Please choose today or a future date.');
          return;
        }
      }
    }

    try {
      const taskRef = ref(db, "tasks");
      const newTaskRef = push(taskRef);

      await set(newTaskRef, {
        title: formData.title,
        notes: formData.notes,
        hasDate: formData.hasDate,
        date: formData.date || null,
        hasTime: formData.hasTime,
        time: formData.time || null,
        hasLocation: formData.hasLocation,
        location: formData.location || null,
        createdAt: new Date().toISOString()
      });

      setShowSuccess(true);
      setFormData({
        title: '',
        notes: '',
        hasDate: false,
        date: '',
        hasTime: false,
        time: '',
        hasLocation: false,
        location: ''
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        
        <div className="col center-content">
          <h4 className="mb-2 text-center w-100" style={{ maxWidth: '550px' }}>Create Your Task</h4>
          <hr className="section-underline" />

          <div className="card shadow-sm border-0" style={{ maxWidth: '550px', width: '100%', borderRadius: '12px' }}>
            <div className="card-body p-0">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control border-0 border-bottom fw-semibold"
                  style={{ borderRadius: '12px 12px 0 0', padding: '14px 18px', fontSize: '16px' }}
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                  className="form-control border-0"
                  style={{ borderRadius: '0 0 12px 12px', padding: '14px 18px', fontSize: '16px', minHeight: '150px', resize: 'none' }}
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </form>
            </div>
          </div>

          <div className="card shadow-sm border-0 mt-4" style={{ maxWidth: '550px', width: '100%', borderRadius: '12px' }}>
            <div className="card-body p-0">
              <div className="border-bottom">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-calendar text-danger fs-5"></i>
                    <span>Date</span>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                      checked={formData.hasDate}
                      onChange={() => handleToggle('hasDate')}
                    />
                  </div>
                </div>
                {formData.hasDate && (
                  <div className="px-3 pb-3">
                    <input
                      type="date"
                      className="form-control"
                      style={{ borderRadius: '8px' }}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="border-bottom">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-clock text-primary fs-5"></i>
                    <span>Time</span>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                      checked={formData.hasTime}
                      onChange={() => handleToggle('hasTime')}
                    />
                  </div>
                </div>
                {formData.hasTime && (
                  <div className="px-3 pb-3">
                    <input
                      type="time"
                      className="form-control"
                      style={{ borderRadius: '8px' }}
                      min={new Date().toLocaleDateString('en-UG')}
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-geo-alt text-success fs-5"></i>
                    <span>Location</span>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                      checked={formData.hasLocation}
                      onChange={() => handleToggle('hasLocation')}
                    />
                  </div>
                </div>
                {formData.hasLocation && (
                  <div className="px-3 pb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter location"
                      style={{ borderRadius: '8px' }}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-create mt-4">
            Create Task
          </button>

          {showSuccess && (
            <div className="alert alert-success mt-3 alert-slide-down" role="alert">
              Task created successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;