const TaskCard = ({ taskId, task, onMarkCompleted }) => {
  const getBorderClass = () => {
    if (task.defaulted) return 'border-danger';
    if (task.completed) return 'border-success';
    if (task.hasDate) return 'border-primary';
    return '';
  };

  const checkboxChecked = task.completed;
  const checkboxDisabled = task.completed || task.defaulted;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className={`card h-100 task-card-item ${getBorderClass()} border-3`}>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{task.title}</h5>
            <div className="form-check">
              <input
                className="form-check-input task-checkbox"
                type="checkbox"
                id={`task-${taskId}`}
                checked={checkboxChecked}
                disabled={checkboxDisabled}
                onChange={() => onMarkCompleted(taskId)}
              />
            </div>
          </div>
          <p className="card-text text-muted mb-2">{task.notes}</p>
          {task.hasDate && (
            <div className="d-flex align-items-center gap-2 text-muted small">
              <i className="bi bi-calendar"></i>
              <span>{task.date}</span>
            </div>
          )}
          {task.hasTime && (
            <div className="d-flex align-items-center gap-2 text-muted small">
              <i className="bi bi-clock"></i>
              <span>{task.time}</span>
            </div>
          )}
          {task.hasLocation && (
            <div className="d-flex align-items-center gap-2 text-muted small">
              <i className="bi bi-geo-alt"></i>
              <span>{task.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;