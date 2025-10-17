import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './config/firebase';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import DashboardCard from './components/DashboardCard';

const Home = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    today: 0,
    scheduled: 0,
    all: 0,
    completed: 0,
    defaulted: 0
  });
  const [todayDate, setTodayDate] = useState(new Date().getDate());

  useEffect(() => {
    const today = new Date();
    setTodayDate(today.getDate());
    const todayDateStr = today.toISOString().split('T')[0];
    
    const tasksRef = ref(db, 'tasks');
    
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      let todayCount = 0;
      let scheduledCount = 0;
      let allCount = 0;
      let completedCount = 0;
      let defaultedCount = 0;
      
      const data = snapshot.val();
      
      if (data) {
        Object.values(data).forEach(task => {
          allCount++;
          
          if (task.hasDate && task.date === todayDateStr) {
            todayCount++;
          }
          
          if (task.hasDate && task.date && !task.completed && !task.defaulted) {
            scheduledCount++;
          }
          
          if (task.completed) {
            completedCount++;
          }
          
          if (task.defaulted) {
            defaultedCount++;
          }
        });
      }
      
      setCounts({
        today: todayCount,
        scheduled: scheduledCount,
        all: allCount,
        completed: completedCount,
        defaulted: defaultedCount
      });
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (page) => {
    navigate(page);
  };

  // Card configuration array for cleaner rendering
  const cardConfigs = [
    {
      title: 'Today',
      count: counts.today,
      iconType: 'calendar',
      date: todayDate,
      onClick: () => handleCardClick('/upcoming')
    },
    {
      title: 'Scheduled',
      count: counts.scheduled,
      icon: <i className="bi bi-calendar-check text-primary" style={{ fontSize: '2.5rem' }}></i>,
      onClick: () => handleCardClick('/upcoming')
    },
    {
      title: 'All',
      count: counts.all,
      icon: <i className="bi bi-list-ul text-secondary" style={{ fontSize: '2.5rem' }}></i>,
      onClick: () => handleCardClick('/all')
    },
    {
      title: 'Completed',
      count: counts.completed,
      icon: <i className="bi bi-check-circle text-success" style={{ fontSize: '2.5rem' }}></i>,
      onClick: () => handleCardClick('/completed')
    },
    {
      title: 'Defaulted',
      count: counts.defaulted,
      icon: <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '2.5rem' }}></i>,
      onClick: () => handleCardClick('/defaulted')
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        
        <div className="col p-4">
          <SearchBar />
          
          <div className="mt-4">
            <div className="row g-3">
              {cardConfigs.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  icon={card.icon}
                  iconType={card.iconType}
                  date={card.date}
                  onClick={card.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;