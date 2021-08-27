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
        await dispatch(logout());
        history.push('/')
    };


    return (
        <>
          <button className='logout-button' onClick={() => setClicked(!clicked)} style={{backgroundImage: `url(${current_user.profile_picture})`}}>

          </button>
          {clicked &&
            <>
              <div className='profile-dropdown-div'>
                <div>
                  <h4 className='profile-dropdown__greeting'>{`Hello, ${current_user.username}!`}</h4>
                </div>
                <Link to={`/users/${current_user.id}`} onClick={() => setClicked(false)}>
                  profile
                </Link>
                <Link className='profile-dropdown__a' onClick={onLogout} to='/'>
                  logout
                </Link>
              </div>
            </>
          }
        </>
      )
};

export default LogoutButton;
