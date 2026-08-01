import { useEffect, useState } from "react";
import {
  getContacts,
  deleteContact,
} from "../../services/contactService";

function Contacts() {
  const [contacts, setContacts] = useState([]);

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
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await deleteContact(id);

      alert("Message Deleted Successfully!");

      fetchContacts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Contact Messages
      </h1>

      <div className="space-y-4">
        {contacts.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="font-bold text-lg">
              {item.name}
            </h2>

            <p>{item.email}</p>

            <p className="my-3">
              {item.message}
            </p>

            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;