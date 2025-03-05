import { useState,useEffect } from "react";
import { fetchElections, getAllRegStudents } from "../helper/basic";
export default function VotersInfo(){
  const [activeTab, setActiveTab] = useState("registered");
  const [electionType, setElectionType] = useState("presidential");
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");

    useEffect(() => {
        fetchElections(setElections);
    }, []);

    const handleElectionChange = (e) => {
        const electionId = e.target.value;
        setSelectedElection(electionId);
        const election = elections.find(election => election._id===electionId)
        setvotedStudents(election.voters)
        console.log('here')
        getAllRegStudents(setRegisteredStudents)
    };




  const [registeredStudents,setRegisteredStudents] = useState([]);
  const [votedStudents,setvotedStudents] = useState([]);



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Election Type:</label>

        {
                    elections?
                    <select 
                        className="border px-3 py-1 rounded"
                        onChange={handleElectionChange} value={selectedElection}>
                            <option value="">-- Select a Post --</option>
                            {elections.map((election) => ( <option key={election._id} value={election._id}> {election.title} </option> ))}
                        </select>
                    :
                    <p>No ongoing Election</p>
            }


{/* 
        <select
          value={electionType}
          onChange={(e) => setElectionType(e.target.value)}
        >
          <option value="presidential">Presidential</option>
          <option value="parliamentary">Parliamentary</option>
        </select> */}



      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${activeTab === "registered" ? "border-b-2 border-blue-500 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("registered")}
        >
          Registered Students
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "voted" ? "border-b-2 border-blue-500 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("voted")}
        >
          Voted Students
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "registered" && (
          <ul className="list-disc pl-5">

            {registeredStudents.length > 0 ? (
                registeredStudents.map(({username, matric_no}) => (
                  <li key={matric_no} className="py-1"> {username} --- {matric_no} </li>
                ))
            ) : (
              <p className="text-gray-500">No registered students found.</p>
            )}
          </ul>
        )}

        {activeTab === "voted" && (
          <ul className="list-disc pl-5">
            {votedStudents.length > 0 ? (
                votedStudents.map((matric_no) => (
                  <li key={matric_no} className="py-1">{matric_no}</li>
                ))
              )
            : (
              <p className="text-gray-500">No students have voted yet.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};