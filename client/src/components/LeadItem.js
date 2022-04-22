import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DetView from "./DetView";

export default function LeadItem({name, id, dateAdded, phone, address, zipcode, disp, notes, city, state, email, getData, user, rep}) {

    const [viewDetails, setViewDetails] = useState(false);
    const [lngGeo, setLngGeo]           = useState(null);
    const [latGeo, setLatGeo]           = useState(null);
    const [readDate, setReadDate]       = useState([]);

    const cleanText = (text) => {
        if(!text) {
            return '';
        }
        let _text = text.split(' ');
        _text = _text.map(part => part.toUpperCase()[0] + part.slice(1)).join(' ');

        if(_text.includes('undefined')){
           _text = _text.replace(' undefined', '')
        }
        
        return _text;
    }

    const _name = cleanText(name)
    const _address = cleanText(address)
    const _city = city[0].toUpperCase() + city.slice(1);
    const _state = state.toUpperCase();
    const _disp = disp[0].toUpperCase() + disp.slice(1);
    const _rep = cleanText(rep);

    useEffect(() => {
        (async () => {
            //Make date readable
            try {
                const readDatea = dateAdded.split(' ');
                const readDateb = readDatea.map(date => date + ' ');
                setReadDate(readDateb.splice(0,3));
            } catch(err) {
                console.log(err)
            }
        })();
    }, []);

    const getfwdGeoCode = async (fullAddress) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${fullAddress}.json?access_token=${process.env.REACT_APP_MBTOKEN}`);
            const data = await response.json();
            return data;
            
        } catch(err) {
            console.log(err);
        }
    }

    const handleDVon = () => {
        getfwdGeoCode(`${address} ${zipcode}`)
            .then(response => {
                setLngGeo(response.features[0].center[0]);
                setLatGeo(response.features[0].center[1]);
                setViewDetails(!viewDetails)   
            });
    }
     

    const handleDVoff = () => {
        setViewDetails(!viewDetails)
    }

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{_name} | Last Contact: {readDate}</Accordion.Header>
                    <Accordion.Body>
                            <DetView viewDetails={viewDetails} name={_name} phone={phone} address={_address} zipcode={zipcode} disp={_disp} notes={notes} latGeo={latGeo} lngGeo={lngGeo} handleDVoff={handleDVoff} handleDVon={handleDVon} city={_city} state={_state} email={email} id={id} getData={getData} user={user} rep={_rep}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
} 
