import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import taskApi from './api/taskApi';
import BackgroundOrbs from './components/BackgroundOrbs';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import AddTaskForm from './components/AddTaskForm';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

export function App() {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskorbit_theme') || 'dark';
  });

  // Tasks and stats state
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Loading and operation states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Add toast helper
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskorbit_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch tasks and statistics
  const fetchData = useCallback(
    async (filter = activeFilter, showRefreshSpinner = false) => {
      if (showRefreshSpinner) setIsRefreshing(true);
      try {
        const [tasksData, statsData] = await Promise.all([
          taskApi.getTasks(filter),
          taskApi.getStats()
        ]);

        setTasks(tasksData);
        setStats(statsData);
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Failed to load TaskOrbit data:', err);
        setIsConnected(false);
        setError('Could not connect to server. Ensure Spring Boot backend is active on port 8080.');
        addToast('Could not connect to server', 'error');
      } finally {
        setIsLoading(false);
        if (showRefreshSpinner) setIsRefreshing(false);
      }
    },
    [activeFilter, addToast]
  );

  // Initial load
  useEffect(() => {
    fetchData(activeFilter);
  }, [activeFilter, fetchData]);

  // Handle Add Task
  const handleAddTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      await taskApi.createTask(taskData);
      addToast('Task added successfully', 'success');
      // Refresh current list and stats
      await fetchData(activeFilter);
      return true;
    } catch (err) {
      console.error('Error adding task:', err);
      const errorMsg =
        err.response?.data?.message || 'Failed to add task. Please try again.';
      addToast(errorMsg, 'error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Toggle Status with Confetti
  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    try {
      await taskApi.updateTaskStatus(task.id, nextStatus);

      if (nextStatus === 'COMPLETED') {
        // Trigger celebratory confetti burst
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#06b6d4', '#8b5cf6', '#10b981', '#38bdf8', '#f59e0b']
        });
        addToast('Task marked as Completed', 'success');
      } else {
        addToast('Task marked as Pending', 'info');
      }

      await fetchData(activeFilter);
    } catch (err) {
      console.error('Error updating task status:', err);
      addToast('Failed to update task status', 'error');
    }
  };

  // Handle Save Edit
  const handleSaveEdit = async (updatedData) => {
    setIsSavingEdit(true);
    try {
      await taskApi.updateTask(updatedData.id, {
        title: updatedData.title,
        description: updatedData.description,
        dueDate: updatedData.dueDate
      });

      addToast('Task updated successfully', 'success');
      setEditingTask(null);
      await fetchData(activeFilter);
    } catch (err) {
      console.error('Error updating task:', err);
      const msg = err.response?.data?.message || 'Failed to update task';
      addToast(msg, 'error');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Handle Confirm Delete
  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await taskApi.deleteTask(id);
      addToast('Task deleted successfully', 'success');
      setDeletingTask(null);
      await fetchData(activeFilter);
    } catch (err) {
      console.error('Error deleting task:', err);
      addToast('Failed to delete task', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Dynamic Cosmic Background */}
      <BackgroundOrbs />

      {/* Main Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isConnected={isConnected}
      />

      {/* Main Container */}
      <main className="main-content">
        {/* Animated Stats Cards & Progress Velocity Ring */}
        <StatsCards stats={stats} />

        {/* Add Task Form with inline validation */}
        <AddTaskForm
          onAddTask={handleAddTask}
          isSubmitting={isSubmitting}
        />

        {/* Controls Bar: Filter Tabs & Manual Refresh */}
        <FilterTabs
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          counts={{
            all: stats.total,
            pending: stats.pending,
            completed: stats.completed
          }}
          onRefresh={() => fetchData(activeFilter, true)}
          isRefreshing={isRefreshing}
        />

        {/* Interactive Task List with 3D Tilt Cards */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          activeFilter={activeFilter}
          onToggleStatus={handleToggleStatus}
          onOpenEdit={(task) => setEditingTask(task)}
          onOpenDelete={(task) => setDeletingTask(task)}
          onRetry={() => fetchData(activeFilter)}
          onResetFilter={(filter) => setActiveFilter(filter)}
        />
      </main>

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEdit}
        isSaving={isSavingEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        task={deletingTask}
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
