import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import Textarea from '../../components/inputs/Textarea';
import { Button, Select } from '../../components/Index';
import { getTaskDetail, createTask, updateTask, getUsers } from './../../services/Api';

const CreateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: ''
  });
  const [users, setUsers] = useState([]); 
  const [isEditMode, setIsEditMode] = useState(false); 
  const [isAssignDisabled, setIsAssignDisabled] = useState(false); 

  useEffect(() => {
    getUsers()
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    if (id) {
      setIsEditMode(true);
      getTaskDetail(id)
        .then((task) => {
          if (task) {
            setFormData({
              title: task.title,
              description: task.description,
              assignedTo: task.assignedTo
            });
            setIsAssignDisabled(true);
          } else {
            navigate('/list');
          }
        })
        .catch(() => {
          navigate('/list');
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await updateTask(id, formData);
        console.log('Task updated successfully');
      } else {
        console.log(formData)
        await createTask(formData);
        console.log('Task created successfully');
      }
      navigate('/list');
    } catch (error) {
      console.error('Error saving the task', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>{isEditMode ? 'EDIT TASK' : 'ADD NEW TASK'}</h2>
      <div>
        <label>Assign To</label>
        <Select
          data={users.map(user => ({ label: user.name, value: user._id }))}
          onChange={handleChange}
          name="assignedTo"
          value={formData.assignedTo}
          disabled={isAssignDisabled}
        />
        <label>Task Title</label>
        <Input name="title" value={formData.title} onChange={handleChange} />
        <label>Task Description</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} />
        {isEditMode && (
            <>
              <label>Status</label>
              <Select
                data={[
                  { label: 'Pending', value: 'pending' },
                  { label: 'Closed', value: 'closed' },
                  { label: 'Not Started', value: 'not_started' }
                ]}
                onChange={handleChange}
                name="status" 
                value={formData.status} 
              />
            </>
          )}

      </div>
      <div>
        <Button onClick={handleSave}>{isEditMode ? 'Update' : 'Save'}</Button>
        <Button variant='danger' onClick={() => setFormData({ title: '', description: '', assignedTo: '' })}>RESET</Button>
      </div>
    </div>
  );
};

export default CreateTask;
