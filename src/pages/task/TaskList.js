import React, { useState, useEffect } from 'react';
import { Button, Modal, TableComponent } from '../../components/Index';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTaskById, getTaskDetail } from '../../services/Api';
import style from '../../styles/TaskList.module.css';
import { socket } from './../../socket';

const TaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskDetail, setTaskDetail] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('taskNum');
    const [currentPages, setCurrentPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0); 
    const tasksPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect', () => console.log('Socket connected:', socket.id));

        socket.on('connect_error', (err) => console.error('Connection Error:', err.message));
        socket.on('disconnect', (reason) => console.warn('Disconnected:', reason));

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        socket.on('taskCreated', (data) => {
            setTasks((prevTasks) => [...prevTasks, data.task]);
        });

        socket.on('taskUpdated', (data) => {
            setTasks((prevTasks) => prevTasks.map(task => task._id === data.task._id ? data.task : task));
        });

        socket.on('taskDeleted', (data) => {
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== data.taskId));
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks({
                search: searchTerm,
                sort: sortColumn,
                order: sortOrder,
                page: currentPages,
                limit: tasksPerPage,
            });
            const { tasks, totalTasks,totalPages,currentPage } = response.data;
            const flattenedTasks = tasks.map(task => ({
                ...task,
                assignedByName: task.assignedBy.name,
            }));
            setTasks(flattenedTasks);
            setTotalTasks(totalTasks);
            setTotalPages(totalPages);
            setCurrentPages(currentPage)
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [searchTerm, sortColumn, sortOrder, currentPages]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPages(1); // Reset to first page on search
    };

    const handleSortChange = (column) => {
        setSortOrder(sortColumn === column ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc');
        setSortColumn(column);
    };

    const handlePageChange = (page) => {
        setCurrentPages(page);
    };

    const handleDelete = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedTask) {
            try {
                await deleteTaskById(selectedTask._id);
                setIsModalOpen(false);
                setSelectedTask(null);
                fetchTasks(); // Refresh task list after deletion
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleView = async (taskId) => {
        try {
            const response = await getTaskDetail(taskId);
            setTaskDetail(response);
            setIsViewModalOpen(true);
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    const tableHeaders = [
        { field: 'taskNum', label: 'ID' },
        { field: 'title', label: 'Task' },
        { field: 'assignedByName', label: 'Assigned By' },
        { field: 'status', label: 'Status' },
        { field: 'createdAt', label: 'Created At' },
        { field: 'updatedAt', label: 'Updated At' },
    ];

    const actionButton = (row) => (
        <>
            <Button onClick={() => handleView(row._id)}>View</Button>
            <Button onClick={() => navigate(`/edit-task/${row._id}`)} variant="secondary">Edit</Button>
            <Button onClick={() => handleDelete(row)} variant="danger">Delete</Button>
        </>
    );

    return (
        <div className={style['task-list-container']}>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={() => navigate('/add-task')}>Add Task</Button>
            </div>

            {/* Modal for Delete Confirmation */}
            <Modal isOpen={isModalOpen} onClose={handleCancelDelete}>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete the task: {selectedTask?.title}?</p>
                <Button onClick={handleConfirmDelete} variant="danger">Confirm</Button>
                <Button onClick={handleCancelDelete}>Cancel</Button>
            </Modal>

            {/* Modal for Viewing Task Details */}
            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
                <h2>Task Details</h2>
                {taskDetail ? (
                    <>
                        <p><strong>ID:</strong> {taskDetail.taskNum}</p>
                        <p><strong>Title:</strong> {taskDetail.title}</p>
                        <p><strong>Description:</strong> {taskDetail.description}</p>
                        <p><strong>Status:</strong> {taskDetail.status}</p>
                        <p><strong>Assigned By:</strong> {taskDetail.assignedBy?.name}</p>
                        <p><strong>Created At:</strong> {new Date(taskDetail.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(taskDetail.updatedAt).toLocaleString()}</p>
                    </>
                ) : (
                    <p>Loading task details...</p>
                )}
                <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
            </Modal>

            <header className={style['task-list-header']}>
                <h1>Task List</h1>
            </header>

            <TableComponent
                tableHeaders={tableHeaders}
                tableData={tasks}
                sortableField={sortColumn}
                searchable={true}
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                currentPage={currentPages}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                rowsPerPage={tasksPerPage}
                actionButton={actionButton}
                totalTasks={totalTasks}
            />
        </div>
    );
};

export default TaskList;
