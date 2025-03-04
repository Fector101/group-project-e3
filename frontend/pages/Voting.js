import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { URL } from "../helper/basic";

export default function VotinpPage(){

    const [searchParams] = useSearchParams()
    const student_name = searchParams.get('student_name')
    const matric_no = searchParams.get('matric_no')
    const [selectedElection, setSelectedElection] = useState("");
    const [candidates, setCandidates] = useState([]);

    const [elections, setElections] = useState([]);
    console.log(elections,'elections')
    console.log(candidates,'candidates')


    const [selectedCandidate, setSelectedCandidate] = useState({ id: "", name: "",matric_no:''});

    const handleCandidateChange = (e) => {
        const selectedId = e.target.value;
        const selectedCan = candidates.find(candidate => candidate._id === selectedId);
        
        if (selectedCan) {
            setSelectedCandidate({ id: selectedCan._id, name: selectedCan.name,matric_no:selectedCan.matric_no});
        }
    };
    
    async function takeVote(event){
        event.preventDefault();
        if (!selectedCandidate.id) {
            alert("Please select a candidate.");
            return;
        }
        document.querySelector('.msg').innerText = selectedCandidate.name;
        console.log(selectedCandidate, 'see me');
        try {
            const response = await fetch(`${URL}/vote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    
                    studentMatricNo: matric_no,
                    candidateMatricNo: selectedCandidate.matric_no,
                }),
            });
    
            const data = await response.json();
            alert(data.msg); // Show success or error message
        } catch (error) {
            console.error("Error submitting vote:", error);
        }


    };
    



    useEffect(() => {
        fetchElections();
    }, []);
    
    const fetchElections = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/ongoing-elections`);
            const data = await response.json();

            setElections(data.elections);
        } catch (error) {
            console.error("Error fetching elections", error);
        }
    };

    const fetchCandidates = async (electionId) => {
        try {
            const response = await fetch(`${URL}/api/admin/election/${electionId}/candidates`);
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                setCandidates(data.candidates,' see me');
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error("Error fetching candidates", error);
        }
    };

    const handleElectionChange = (e) => {
        const electionId = e.target.value;
        setSelectedElection(electionId);
        fetchCandidates(electionId);
    };

    return (
    <div id="vote">
        <h2>Welcome to the Voting Page, {student_name} !</h2>
        <h2 className="msg">Cast Your Vote</h2>
        {/* <form id="vote-form" action="/api/auth/vote" method="POST"> */}
        <form id="vote-form">
            {/* <label>
                <input type="radio" name="candidate" value="Candidate A" />
                 Candidate A
            </label>
            <label>
                <input type="radio" name="candidate" value="Candidate B" /> 
                Candidate B
            </label> */}
              <h3>Select Election</h3>
                {
                    elections?
                        <select onChange={handleElectionChange} value={selectedElection}>
                            <option value="">-- Select an Election --</option>
                            {elections.map((election) => ( <option key={election._id} value={election._id}> {election.title} </option> ))}
                        </select>
                    :
                    <p>No ongoing Election</p>
            }

            <h3>Select Candidate</h3>
            <select onChange={handleCandidateChange} value={selectedCandidate.id}>

                <option value={selectedCandidate.name}>-- Select a Candidate --</option>
                {candidates.map((candidate) => (
                    <option key={candidate._id} value={candidate._id}>
                        {candidate.name} ({candidate.matric_no})
                    </option>
                ))}
            </select>


            <button onClick={takeVote} type="submit">Vote</button>
        </form>
        <p><a href="/election-results">View Results</a></p>
    </div>
)
}
