// src/pages/UserManagement.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserManagement() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/userManagement', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user', err);
      }
    };

    fetchUser();
  }, [token]);

  const handleUpdate = async () => {
    if (!window.confirm("Are you sure you want to update your information?")) return;
  
    try {
      const res = await axios.put(`http://localhost:5050/api/userManagement/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully");
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      alert(err?.response?.data?.error || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("This will delete your account and all data. Are you sure?")) return;
  
    try {
      await axios.delete(`http://localhost:5050/api/userManagement/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      navigate('/login');
    } catch (err) {
      alert("Account deletion failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          {isEditing ? (
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          {isEditing ? (
            <input
              type="email"
              className="border p-2 rounded w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div>
            <label className="block font-semibold">Password:</label>
            {isEditing ? (
                <input
                type="password"
                className="border p-2 rounded w-full"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            ) : (
                <p className="italic text-gray-500">••••••••</p>
            )}
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
