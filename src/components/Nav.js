import React, { useEffect, useState } from "react";
import json from './events.json'
import Loading from "./Loading";


const Nav = () => {

    const [column, setColumn] = useState(["name",
    "email",
    "phone",
    "CA"])
    const [event, setEvent] = useState({})
    const [events, setEvents] = useState([])
    // let events = []
    const [eventIndex, setEventIndex] = useState(0)

    const arr = ['CP00','CF01','CP02','CP03','CF04','CF05','CP06','CP07','CF08','CP09','CP10','CF11','CF12','CF13','CP14','CF15','CF16','CP17','CF18','CF19','TF00','TF01','TF02','TF03','TF04','TF05','TF06','TF07','TF08','TF09','TF10','TF11','TF12','TF13','TF14','WP00','WP01','WP02','WP03','WP04','WP05','WP06']

    useEffect( () => {
        const func = async () => {
            for(let idx in arr){
                await fetch('https://pcap-back-production.up.railway.app/internal/sheets/view/',{
                        method : 'POST',
                        body : JSON.stringify({
                            id : arr[idx]
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(res => res.json())
                    .then(data1 => {
                        setEvent(data1)
                    })
                }
        }
        func()
    },[])

    useEffect( () => {
        setEvents([...events,event])
    },[event])

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
                    // console.log(events,'e')
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
