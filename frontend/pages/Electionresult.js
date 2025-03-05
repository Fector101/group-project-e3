import { useEffect, useState } from "react";

import { URL } from "../helper/basic";
function Candidates({name,matric_no}){
    useEffect(()=>{
        getVoters()
        const interval = setInterval(getVoters, 1000)
        return () => clearInterval(interval)
        
    },[])
    let [voters, setVoters] = useState([])
    async function getVoters(){
        const res = await fetch(`${URL}/api/admin/election-candidate/${matric_no}`);
        const data = await res.json()
        if(res.ok){
            setVoters(data.candidate.voters)
            console.log(data)
        }
        
    }

    return (
        <div className="candidate" style={{order: -(voters.length)}}>
            <img src="https://avatar.iran.liara.run/public" />
            <div className="texts">
                <p>Name: {name}</p>
                <p>Matric No: {matric_no}</p>
                <p> Voters: {voters.length}</p>
            </div>
        </div>
    )
}

export default function Electionresult(){
    const [selectedElection, setSelectedElection] = useState("");
    const [elections, setElections] = useState([ ]);
    const [candidates, setCandidates] = useState([ ])

    useEffect(() => {
        fetchElections();
    }, []);

    const handleElectionChange = (e) => {
        const electionId = e.target.value;
        setSelectedElection(electionId);
        fetchCandidates(electionId);
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





    const fetchElections = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/ongoing-elections`);
            const data = await response.json();
            setElections(data.elections);
        } catch (error) {
            console.error("Error fetching elections", error);
        }
    };
    return  (
    <div id="results">
        <h2>Live Election Results</h2>
        <h3>Select Post</h3>
            <select onChange={handleElectionChange} value={selectedElection}>
                <option value="">-- Select a Post --</option>
                {elections.map((election) => (
                    <option key={election._id} value={election._id}>
                        {election.title}
                    </option>
                ))}
            </select>
        <div id="results-container">
            {candidates.map(each_can=> <Candidates key={each_can.matric_no} name={each_can.name} matric_no={each_can.matric_no}/>)}
        </div>
        {/* <a class="btn-a" href="/voting">Back to Voting</a> */}
    </div>)
}