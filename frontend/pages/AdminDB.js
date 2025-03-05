import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

import { URL } from "../helper/basic";
const getCurrentDate = () => new Date().toISOString().split("T")[0];

export default function AdminDashboard() {
    const [newElection, setNewElection] = useState({
        title: "",
        description: "",
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
        status: "ongoing",
    });
    const [newCandidate, setNewCandidate] = useState({ name: "", matric_no: "" });
    const [selectedElection, setSelectedElection] = useState("");
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/ongoing-elections`);
            const data = await response.json();
            if (response.ok) {
                setElections(data.elections);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error fetching elections", error);
        }
    };

    const fetchCandidates = async (electionId) => {
        try {
            const response = await fetch(`${URL}/api/admin/election/${electionId}/candidates`);
            const data = await response.json();
            if (response.ok) {
                setCandidates(data.candidates);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error fetching candidates", error);
        }
    };

    const handleAddElection = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/add-election`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newElection),
            });
            const data = await response.json();
            if (response.ok) {
                fetchElections();
                setNewElection({ title: "", description: "", startDate: getCurrentDate(), endDate: getCurrentDate(), status: "ongoing" });
            }
            alert(data.msg);
        } catch (error) {
            console.error("Error adding election", error);
        }
    };

    const handleAddCandidate = async () => {
        if (!selectedElection) {
            alert("Please select an election first.");
            return;
        }
        try {
            const response = await fetch(`${URL}/api/admin/election/${selectedElection}/add-candidate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCandidate),
            });
            const data = await response.json();
            if (response.ok) {
                fetchCandidates(selectedElection);
                setNewCandidate({ name: "", matric_no: "" });
            }
            alert(data.msg);
        } catch (error) {
            console.error("Error adding candidate", error);
        }
    };

    const handleElectionChange = (e) => {
        const electionId = e.target.value;
        setSelectedElection(electionId);
        fetchCandidates(electionId);
    };

    return (
        <div id="admin-dashboard" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <div className='admin-header'>
                <Link to='/voters-info'> Voters Info </Link>
            </div>
            <h2>Add New Post</h2>
            <input type="text" placeholder="Post" value={newElection.title} onChange={(e) => setNewElection({ ...newElection, title: e.target.value })} />
            <input type="text" placeholder="Description" value={newElection.description} onChange={(e) => setNewElection({ ...newElection, description: e.target.value })} />
            <input type="date" value={newElection.startDate} onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })} />
            <input type="date" value={newElection.endDate} onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })} />
            <button onClick={handleAddElection}>Add Post</button>

            <h2>Add Candidate</h2>
            <select onChange={handleElectionChange} value={selectedElection}>
                <option value="">-- Select an Election --</option>
                {elections.map((election) => (
                    <option key={election._id} value={election._id}>{election.title}</option>
                ))}
            </select>
            <input type="text" placeholder="Name" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} />
            <input type="text" placeholder="Matric No" value={newCandidate.matric_no} onChange={(e) => setNewCandidate({ ...newCandidate, matric_no: e.target.value })} />
            <button onClick={handleAddCandidate}>Add Candidate</button>
        </div>
    );
}
