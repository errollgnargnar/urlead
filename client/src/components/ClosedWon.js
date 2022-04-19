import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import SearchLead from "./SearchLead";
import LeadItem from "./LeadItem";

export default function ClosedWon({user}) {

    const [data, setData] = useState(null);
    const [jsonData, setJsonData] = useState([2,3,4]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isSearch, setIsSearch] = useState(false);

    // authentication
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/user/closed-won')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])

    const getData = async () => {
        const disp = "closed won"
        try{
            const response = await fetch(`http://localhost:5000/api/allleads/disp/${disp}/${user}`);
            const data = await response.text();
            const json = JSON.parse(data);
            setJsonData(json);
            console.log(json);
            setData(data);
            setIsLoaded(true);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log('rendered leads')
        getData();
    }, [setIsLoaded]);

    const openNLForm = () => {
        if(isAdding) {
            setIsAdding(false); 
        } else {
            setIsAdding(true);
            setIsSearch(false);
        }
    }

    const searchLead = () => {
        if(isSearch) setIsSearch(false);
        else setIsSearch(true);
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
            <h5>Closed Won</h5>
            <div>
                <Button onClick={searchLead} style={{margin: "1%"}}>Search</Button> 
            </div>
            <div>
                <SearchLead isSearch={isSearch}/>
            </div>
            <div>
                {!data || isAdding ? "loading..." : dataMap}
            </div>

        </div>
    )
}