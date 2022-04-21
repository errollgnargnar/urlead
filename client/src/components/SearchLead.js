import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {useState} from "react";

function SearchBar({setData, setJsonData}) {

    const [searchType, setSearchType] = useState('Name');
    const [searchQuery, setSearchQuery] = useState('');

    const getData = async () => {
      try{
          const response = await fetch(`/api/allleads/${searchType}/${searchQuery}`);
          const data = await response.text();
          const json = JSON.parse(data);
          console.log(data, json);
          setJsonData(json);
          setData(data);
      } catch(err) {
          console.log(err);
      }
    };


    return (
      <>
      <InputGroup className="mb-3">
        <SplitButton
          variant="outline-secondary"
          title={searchType}
          id="segmented-button-dropdown-1"
        >
          <Dropdown.Item onClick={(e) => setSearchType('Name')}>Name</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSearchType('Address')}>Address</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSearchType('Phone')}>Phone</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSearchType('Email')}>Email</Dropdown.Item>
        </SplitButton>
        <FormControl aria-label="Text input with dropdown button" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/><br/>
      </InputGroup>
      <div>
        <Button onClick={()=>getData()}>Submit Search</Button>
      </div>
      </>
    )
}

export default function SearchLead ({isSearch, setData, setJsonData}) {
    return (
        <div>
            {isSearch ? <SearchBar setData={setData} setJsonData={setJsonData}/> : null}
        </div>
    )
}