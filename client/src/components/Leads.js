import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import NewLeadForm from "./NewLeadForm";
import SearchLead from "./SearchLead";
import LeadItem from "./LeadItem";


export default function Leads({user}) {

    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [jsonData, setJsonData] = useState([2,3,4]);
    const [isAdding, setIsAdding] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    
    // authentication
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/user/leads');
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])

    const getData = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/allleads/disp/interested/${user}`);
            const data = await response.text();
            const json = JSON.parse(data);
            setJsonData(json);
            setData(data);
            setIsLoaded(true);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('rendered leads')

        getData()

    }, [isLoaded]);

    const openNLForm = () => {
        if(isAdding) {
            setIsAdding(false); 
        } else {
            setIsAdding(true);
            setIsSearch(false);
        }
    }

    const searchLead = () => {
        if(isSearch) {
            setIsSearch(false);
            getData();
        } else setIsSearch(true);
    }

    const dataMap = jsonData.map(data => (
        <LeadItem 
        key={data._id}
         id={data._id}
          name={data.name} 
          dateAdded={data.dateAdded}
           phone={data.phone}
            address={data.address}
             zipcode={data.zipcode} 
             disp={data.disp} 
             notes={data.notes} 
             email={data.email}
             city= {data.city} 
             state={data.state}
             getData={getData}
             user={user} />
    ))

    return (
        <div>
            <h5>Open Leads</h5>
            <div>
                <Button onClick={openNLForm}>{!isAdding ? "New Lead" : "Close"}</Button>
                {!isAdding ? <Button onClick={searchLead} style={{margin: "1%"}}>Search</Button> : null}
            </div>
            <div>
                <SearchLead isSearch={isSearch} setData={setData} setJsonData={setJsonData}/>
            </div>
            <div style={{width: "80%",
                         margin: "1% auto",
                         padding: "1%"}}>
                {isAdding && <NewLeadForm getData={getData} setIsAdding={setIsAdding} user={user}/>}
            </div>
            <div>
                {!data || isAdding ? "loading..." : dataMap}
            </div>
        </div>
    )
}