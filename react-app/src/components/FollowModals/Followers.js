import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAllUsers, getAUser } from "../../store/users"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import "./Follows.css"


export default function FollowersModal({userId, setShowFollowerModal, setClicked}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [update, setUpdate] = useState(false);
    const [toggle, setToggle] = useState(false)
    const currentUser = useSelector(state => state.session.user)
    let currentUsersFollowing = []
    currentUser.followers.map((u) => {
        currentUsersFollowing.push(u.username)
    })
    const [isFollowing, setIsFollowing] = useState(currentUsersFollowing);
    // const allUsers = useSelector((state) => Object.values(state.users));

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
    }, [userId.id, isFollowing, toggle])

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user);
        })();
        setUpdate(false)

    }, [currentUser, userId.id, isFollowing, toggle])

    const handleModal = () => {
        setShowFollowerModal(false)
        setClicked(false)
    }



    const handleFollow = async (f) => {

        const response = await fetch(`/api/users/${f?.id}/follow`)
        const userObj = await response.json();
        setToggle(!toggle)
        getAUser({ ...userObj.otherUser });
        setIsFollowing(!isFollowing)
    }

    return (
        <>
            <div className="follow-modals">
                <div className="follow-header" style={{"fontWeight": "bold", color: "gray"}}>Following</div>
                <FontAwesomeIcon  onClick={handleModal} style={{position: "absolute", 'color': 'black', "marginLeft": "17rem", "top": "11px"}} className="follow-x" icon={faTimes}>
                </FontAwesomeIcon>
              <hr style={{width: "100%", position: "absolute", "top": "28px"}}/>
                <div className="follow-list">
                        {user.followers?.map((f, id) => (
                            <div key={id}>
                                <div className="follow-row">
                                    <img className="follow-picture" src={f?.profile_picture}></img>
                                    <a href={`/users/${f?.id}`} className="follow-username">{f?.username}</a>
                                    {!currentUsersFollowing.includes(f?.username)  && currentUser.id !== f?.id &&
                                        <button value={toggle} onClick={() => handleFollow(f)} style={{"position": "absolute", "paddingLeft": "18px", "paddingRight": "18px", "marginLeft": "13rem", "fontWeight": "bold"}} className="follow-button">Follow</button>
                                    }
                                    {currentUsersFollowing.includes(f?.username)  && currentUser.id !== f?.id &&
                                        <button  value={toggle} onClick={() => handleFollow(f)} style={{"position": "absolute", "paddingLeft": "5px", "paddingRight": "5px", "marginLeft": "13rem", "background": "#fafafa", "color": "black", "border": "1px solid lightgray", "fontWeight": "bold"}} className="follow-button">Following</button>
                                    }


                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </>
    )
}
