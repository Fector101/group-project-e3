export const URL = ''

export const fetchElections = async (stateSetted) => {
    try {
        const response = await fetch(`${URL}/api/admin/ongoing-elections`);
        const data = await response.json();
        if (response.ok){
            stateSetted(data.elections);
        }
    } catch (error) {
        console.error("Error fetching elections", error);
    }
};
export const getAllRegStudents = async(stateSetted) =>{
    const response = await fetch(`${URL}/api/admin/all-students`);
    const data = await response.json();
    if (response.ok){
        console.log(data,'all')
        stateSetted(data)
    }else{
        alert(JSON.stringify(data.error))
    }
    // stateSetted(data.elections);
    
}
// export const URL = 'http://192.168.148.4:7000'