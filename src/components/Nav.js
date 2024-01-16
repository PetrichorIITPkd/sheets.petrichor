import React, { useEffect, useState } from "react";
import json from './events.json'
import Loading from "./Loading";


const Nav = () => {

    const [column, setColumn] = useState(["name",
        "email",
        "phone",
        "CA"])
    const [events, setEvents] = useState([])
    let list = []
    const [eventIndex, setEventIndex] = useState(0)

    const arr = { 'CP00': 'F3: Fireless Food Fiesta', 'CF01': "BRUSHED BRILLIANCE", 'CP02': "Meta Monologues", 'CP03': "Voicestra", 'CF04': "Fashion Frenzy ", 'CF05': "Waste to wow", 'CP06': "Dynamic Duet", 'CP07': "ChoreoClash", 'CF08': "BGMI Showdown", 'CP09': "KATHA - where words become world", 'CP10': "CODM: Clash of Champions", 'CF11': "KAVYA - weaving verses, crafting dreams", 'CF12': "DROP THE BEAT", 'CF13': "Pixel Palette", 'CP14': "Groove Mania", 'CF15': "Click n' Roll: A Showcase of Frames", 'CF16': "Enigma - The General Quiz", 'CP17': "Bandwagon", 'CF18': "Sportify - The SpEnt Quiz", 'CF19': "Valorant", 'TF00': "Treasure Hunt", 'TF01': "Simulate To The Moon", 'TF02': "Clench Bot", 'TF03': "AlgoTrek", 'TF04': "Drone Dash", 'TF05': "Game Forge", 'TF06': "Kampan ", 'TF07': "Trade-a-thon 2.0", 'TF08': "WebMosiac", 'TF09': "Labyrinth 2.0", 'TF10': "Eggstravaganza Drop Challenge", 'TF11': "Hover hero challenge", 'TF12': "Quizzanaire - School Quiz", 'TF13': "Robowar", 'TF14': "ChipCraft", 'WP00': "AI Workshop", 'WP01': "Robotics", 'WP02': "Product Management", 'WP03': "Reinforcement Learning", 'WP04': "Startup and Entrepreneurship", 'WP05': "Measurement Principles and Uncertainty Analysis", 'WP06': "Competitive Programming" }


    for (const key in arr) {
        list.push(arr[key])
    }

    const [selected, setSel] = useState(list[0])

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key =>
            object[key] === value);
    }

    const fetchData = async () => {
        await fetch('https://petrichor-backend.vercel.app/internal/sheets/view/', {
            method: 'POST',
            body: JSON.stringify({
                id: getKeyByValue(arr, selected)
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data1 => {
                setEvents(([...events]) => [...events, data1])
            })
    }


    const handleChange = e => {
        setSel(sel => sel = e?.target.value)
    };

    useEffect(() => {
        setEventIndex(events.findIndex(object => {
            return object.name === selected;
        }
        ))
    }, [events])


    useEffect(() => {
        let isfetched = false
        for (let idx in events) {
            if (events[idx].name == selected) {
                isfetched = true
                break;
            }
        }
        if (!isfetched) {
            fetchData()
        }
        else {
            setEventIndex(events.findIndex(object => {
                return object.name === selected;
            }
            ))
        }
    }, [selected])


    return (
        <>
            <select style={{ marginTop: '2rem', marginLeft: '4.5rem', marginBottom: '1rem' }} id="selected" onChange={(e) => handleChange(e)}>
                {list?.map(event => (
                    <option>{event}</option>
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
