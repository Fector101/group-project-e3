import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, LogIn, UserPlus, IdCard } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex" onClick={() => setIsOpen(!isOpen)}>
      <button
        className="p-2 m-2 bg-gray-800 text-white rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
        <div className="p-5">
          <h2 className="text-xl font-bold">SOV</h2>
        </div>
        <nav className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={20} /> Students
            </h3>
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/login" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <LogIn size={16} /> Login
                </Link>
              </li>
              <li>
                <Link to="/election-results" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <IdCard size={16} /> Election Results
                </Link>
              </li>
              <li>
                <Link to="/signup" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <UserPlus size={16} /> Signup
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={20} /> Admin
            </h3>
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <Link to="/admin-login" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <LogIn size={16} /> Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
