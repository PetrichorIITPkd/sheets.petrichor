import React, { useEffect, useState } from "react";
import json from './events.json'


const Nav = () => {

    const [column, setColumn] = useState([])
    const [events, setEvents] = useState([])
    const [eventIndex, setEventIndex] = useState(0)


    useEffect(() => {
        fetch('https://pcap-back-production.up.railway.app/api/events/')
            .then(res => res.json())
            .then(data1 => {
                if (data1.response == 200) {
                    setColumn(data1.data)
                    setEvents(data1.events)
                }
                else {
                    setColumn(json.data)
                    setEvents(json.events)
                }
            })
    }, [])



    let selected = ""
    const handleChange = event => {
        selected = event?.target.value;
        setEventIndex(events.findIndex(object => {
            return object.name === selected;
        }
        ));

    };

    return (
        <>
            <select style={{ marginTop: '2rem', marginLeft: '4.5rem', marginBottom: '1rem' }} id="selected" onChange={(e) => handleChange(e)}>
                {events?.map(event => (
                    <option keys={event.id}>{event.name}</option>
                ))}
            </select>
            <div className='container'>
                <div>
                    <h1>{events[eventIndex]?.name}</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', borderRight: '1.5px solid' }}>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                events[eventIndex]?.participants?.map((participants, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '60px 0px', textAlign: 'center', borderRight: '1.5px solid', borderTop: '1.5px solid' }}>{participants.team}</td>
                                        <td style={{ borderTop: '1.5px solid' }}>
                                            <table className="table">
                                                <thead style={{ borderBottom: '1.2px solid' }}>
                                                    <tr>
                                                        {
                                                            column.map((c, i) => (
                                                                <th key={i}>{c}</th>
                                                            ))
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        participants.details.map((data, i) => (
                                                            <tr style={{ borderBottom: '1.2px solid' }}>{
                                                                column.map((c, i) => (
                                                                    <td key={i}>{data[c]}</td>
                                                                ))}
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Nav;
