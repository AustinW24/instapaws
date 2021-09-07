import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory, Link } from 'react-router-dom';
import './LoginForm.css'


const LogoutButton = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState(false)
    const current_user = useSelector(state => state.session.user)


    const onLogout = async (e) => {
        dispatch(logout());
        if(!current_user) {
        history.push('/')
        }
    };


    return (
        <>
        <div>
          <button className='logout-button' onClick={() => setClicked(!clicked)} style={{backgroundImage: `url(${current_user.profile_picture})`}}>
          </button>
          </div>
          {clicked &&
            <>
              <div className='profile-dropdown-div'>

                <Link to={`/users/${current_user.id}`} className="profile-dropdown__b" onClick={() => setClicked(false)}>
                  profile
                </Link>
                <Link to="/" className='profile-dropdown__a' onClick={onLogout}>
                  logout
                </Link>
              </div>
            </>
          }
        </>
      )
};

export default LogoutButton;
