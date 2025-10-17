const DashboardCard = ({ 
  title, 
  count, 
  icon, 
  onClick, 
  iconType = 'icon', 
  date 
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 task-card" onClick={onClick}>
        <div className="card-body d-flex align-items-center justify-content-between p-4">
          <div className="d-flex flex-column align-items-start gap-2">
            {iconType === 'calendar' ? (
              <div className="calendar-icon">
                <div className="calendar-header"></div>
                <div className="calendar-date">{date}</div>
              </div>
            ) : (
              icon
            )}
            <h5 className="card-title">{title}</h5>
          </div>
          <div className="task-count-circle-large">
            <span>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;