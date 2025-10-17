import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from './config/firebase';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import TaskCard from './components/TaskCard';

const All = () => {
  const [tasks, setTasks] = useState([]);

  const markAsCompleted = async (taskId) => {
    try {
      await update(ref(db, `tasks/${taskId}`), {
        completed: true,
        completedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  useEffect(() => {
    const tasksRef = ref(db, 'tasks');
    
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const tasksList = [];
      
      if (data) {
        Object.entries(data).forEach(([taskId, task]) => {
          tasksList.push({ id: taskId, ...task });
        });
      }
      
      setTasks(tasksList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        
        <div className="col p-4">
          <h2 className="mb-4">All Tasks</h2>
          <SearchBar />
          
          <div className="row g-3">
            {tasks.length === 0 ? (
              <div className="col-12">
                <p className="text-muted text-center">No tasks</p>
              </div>
            ) : (
              tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  taskId={task.id} 
                  task={task} 
                  onMarkCompleted={markAsCompleted}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;