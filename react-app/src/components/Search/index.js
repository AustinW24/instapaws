import { useEffect, useState, useRef } from "react"
import { getAllUsers } from "../../store/users"
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from 'react-icons/fi'
import './Search.css'

export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [eyeglass, setEyeGlass] = useState({ display: 'block' });
    const [isOpen, setIsOpen] = useState(false)


    const allUsers = useSelector((state) => Object.values(state.users));
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, name]);


    const handleInput = (e) => {
        setName(e.target.value.toLowerCase())
        setIsOpen(!isOpen)
        if (e.target.value === "") {
            setClicked(false)
            setEyeGlass({ display: 'block' })
        } else {
            setClicked(true)
            setEyeGlass({ display: 'none' })
        }
    }

    let searchRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!searchRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    });



    return (
        <>
            <form className="search-form">
                <div ref={searchRef} className="search-bar-container">
                    <input className="search-bar" type="text" value={name} onChange={e => handleInput(e)} placeholder="Search"></input>
                    <FiSearch style={eyeglass} size={10.5} className="search-icon" />
                </div>

                {clicked &&
                    <div className="search-results">
                        <div className="search-list">
                            {allUsers.map((user, id) => {
                                return (
                                    user?.username.toLowerCase().includes(name) ?

                                        <a href={`/users/${user?.id}`} key={id} className="search-row">
                                            <img className="searchbar-photo" src={user?.profile_picture}></img>
                                            <span className="search-username">{user?.username}</span>
                                        </a>
                                        : null
                                )

                            })}
                        </div>
                    </div>
                }
            </form>
        </>
    )
}
