import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getContacts,
  deleteContact,
  markAsRead,
} from "../../services/contactService";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const { darkMode } = useOutletContext();

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(id);
      toast.success("Message Deleted Successfully!");
      fetchContacts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      fetchContacts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div
      className={`max-w-6xl mx-auto transition-colors duration-300 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">
        Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <div
          className={`text-center py-20 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No Messages Found
        </div>
      ) : (
        <div className="space-y-6">
          {contacts.map((item) => (
            <div
              key={item._id}
              className={`border rounded-xl p-6 shadow-lg transition-all duration-300 ${
                darkMode
                  ? item.isRead
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-900 border-blue-500"
                  : item.isRead
                  ? "bg-white border-gray-300"
                  : "bg-blue-50 border-blue-500"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2
                    className={`text-xl font-bold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name}
                  </h2>

                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.email}
                  </p>
                </div>

                {!item.isRead && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>

              <p
                className={`mb-5 leading-7 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {item.message}
              </p>

              <div className="flex gap-3 mt-4">
  {!item.isRead && (
    <button
      onClick={() => handleMarkAsRead(item._id)}
      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
    >
      ✓ Mark as Read
    </button>
  )}

  <a
    href={`mailto:${item.email}?subject=Reply from Ishrat Jahan&body=Hello ${item.name},`}
    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 inline-flex items-center"
  >
    📧 Reply
  </a>

  <button
    onClick={() => handleDelete(item._id)}
    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
  >
    🗑 Delete
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contacts;