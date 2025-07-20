import { useEffect, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("success");

  useEffect(() => {
    fetchUsers();
  }, []);

  const showFlash = (msg, type = "success") => {
    setFlashMessage(msg);
    setFlashType(type);
    setTimeout(() => setFlashMessage(""), 3000);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://leaderboard-project-sooty.vercel.app/api/users");
      const data = await res.json();
      setUsersWithRanks(data);
    } catch (err) {
      showFlash("Error fetching users", "error");
    }
  };

  const setUsersWithRanks = (userArray) => {
    const sorted = [...userArray].sort((a, b) => b.totalPoints - a.totalPoints);
    const ranked = sorted.map((user, index) => ({ ...user, rank: index + 1 }));
    setUsers(ranked);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      showFlash("Please enter a name.", "error");
      return;
    }

    try {
      const res = await axios.post("https://leaderboard-project-sooty.vercel.app/api/users", {
        name: newUserName,
      });
      setUsersWithRanks([...users, res.data]);
      setNewUserName("");
      showFlash("User added successfully!");
    } catch (err) {
      showFlash("Failed to add user", "error");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://leaderboard-project-sooty.vercel.app/api/users/${userId}`);
      const filtered = users.filter((user) => user._id !== userId);
      setUsersWithRanks(filtered);
      setDeleteUserId(null);
      showFlash("User deleted successfully!");
    } catch (err) {
      showFlash("Failed to delete user", "error");
    }
  };

  const handleClaimPoints = async (userId) => {
    try {
      const res = await axios.post(`https://leaderboard-project-sooty.vercel.app/api/users/claim/${userId}`);
      const updatedUser = res.data;

      const updatedUsers = users.map((user) =>
        user._id === userId ? updatedUser : user
      );

      if (updatedUser.totalPoints >= 100) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        showFlash(`${updatedUser.name} reached 100+ points! 🎉`);
      } else {
        showFlash("Points claimed successfully!");
      }

      setUsersWithRanks(updatedUsers);
    } catch (err) {
      showFlash("Failed to claim points", "error");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Users List</h1>

      {/* ✅ Flash Message */}
      {flashMessage && (
        <div
          className={`mb-4 text-sm text-center px-4 py-2 rounded ${
            flashType === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {flashMessage}
        </div>
      )}

      {/* 🔍 Search & Add User */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:max-w-xs"
        />
        <form onSubmit={handleAddUser} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="New user name..."
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Add
          </button>
        </form>
      </div>

      {/* 📋 Table */}
      {filteredUsers.length > 0 ? (
        <div className="w-full overflow-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-4 py-2 text-xs sm:text-sm">Name</th>
                <th className="border px-2 sm:px-4 py-2 text-xs sm:text-sm">Points</th>
                <th className="border px-2 sm:px-4 py-2 text-xs sm:text-sm">Rank</th>
                <th className="border px-2 sm:px-4 py-2 text-xs sm:text-sm">Claim</th>
                <th className="border px-2 sm:px-4 py-2 text-xs sm:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="text-center text-xs sm:text-sm">
                  <td className="border px-2 sm:px-4 py-2">{user.name}</td>
                  <td className="border px-2 sm:px-4 py-2">{user.totalPoints}</td>
                  <td className="border px-2 sm:px-4 py-2">
                    {user.rank <= 3 ? (
                      <span className="font-bold text-yellow-500">🏅 {user.rank}</span>
                    ) : (
                      user.rank
                    )}
                  </td>
                  <td className="border px-2 sm:px-4 py-2">
                    <button
                      onClick={() => handleClaimPoints(user._id)}
                      className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Claim
                    </button>
                  </td>
                  <td className="border px-2 sm:px-4 py-2">
                    {deleteUserId === user._id ? (
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteUserId(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteUserId(user._id)}
                        className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
