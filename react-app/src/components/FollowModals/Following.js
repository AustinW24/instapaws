import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAllUsers, getAUser } from "../../store/users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import "./Follows.css"


export default function FollowingModal({userId, setShowFollowingModal, setClicked}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [update, setUpdate] = useState(false);
    const [toggle, setToggle] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    let currentUsersFollowing = []
    currentUser.follows.map((u) => {
        currentUsersFollowing.push(u.username)
    })
    const [isFollowing, setIsFollowing] = useState(currentUsersFollowing);
    const [following, setFollowing] = useState(false)
    const [modalChange, setModalChange] = useState(false)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user)
            dispatch(getAllUsers())
        })();
    }, [userId.id, isFollowing, modalChange])

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user);
        })();
        setUpdate(false)

    }, [currentUser, userId.id, modalChange])

    const handleModal = () => {
        setShowFollowingModal(false)
        setClicked(false)
    }



    const handleFollow = async (f) => {

        setIsFollowing(!isFollowing)
        const response = await fetch(`/api/users/${f?.id}/follow`)
        const userObj = await response.json();
        setToggle(!toggle)
        setModalChange(!modalChange)
        getAUser({ ...userObj.otherUser });
    }


    return (
        <>
            <div className="follow-modals">
                <div className="follow-header" style={{"fontWeight": "bold", color: "gray"}}>Following</div>
                <FontAwesomeIcon  onClick={handleModal} style={{position: "absolute", 'color': 'black', "marginLeft": "17rem", "top": "11px"}} className="follow-x" icon={faTimes}>
                </FontAwesomeIcon>
              <hr style={{width: "100%", position: "absolute", "top": "28px"}}/>
                <div className="follow-list">
                        {user.follows?.map((f, id) => (
                            <div key={id}>
                                <div className="follow-row" onChange={() => setModalChange(!modalChange)}>
                                    <img className="follow-picture" src={f?.profile_picture}></img>
                                    <a href={`/users/${f?.id}`} className="follow-username">{f?.username}</a>
                                    {!currentUsersFollowing.includes(f?.username)  && currentUser.id !== f?.id  &&
                                        <button onClick={() => handleFollow(f)} style={{"position": "absolute", "paddingLeft": "18px", "paddingRight": "18px", "marginLeft": "13rem", "fontWeight": "bold"}} className="follow-button">Follow</button>
                                    }
                                    {currentUsersFollowing.includes(f?.username)  && currentUser.id !== f?.id &&
                                        <button  onClick={() => handleFollow(f)} style={{"position": "absolute", "paddingLeft": "5px", "paddingRight": "5px", "marginLeft": "13rem", "background": "#fafafa", "color": "black", "border": "1px solid lightgray", "fontWeight": "bold"}} className="follow-button">Following</button>
                                    }
                                </div>
                            </div>
                        ))}


                </div>
            </div>
        </>
    )
}
