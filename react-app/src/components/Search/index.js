import { useEffect, useState } from "react"
// import { userSearch } from "../../store/users"
import { useDispatch, useSelector } from "react-redux";
import './Search.css'

export default function Search() {

    const [name, setName] = useState("");
    const [clicked, setClicked] = useState(false)

    const posts = useSelector((state) => state.posts?.posts);


    // useEffect(() => {
    //     dispatch(userSearch(name))
    // }, [dispatch, name])

    const handleInput = (e) => {
        setName(e.target.value.toLowerCase())
        if(e.target.value === "") {
            setClicked(false)
        } else {
            setClicked(true)
        }
    }


    return (
        <>
            <form className="search-form">
                <input className="search-bar" type="text" value={name} onChange={e => handleInput(e)} placeholder="Search"></input>
                {clicked &&
                    <div className="search-results">
                        <div className="search-list">
                        {posts?.map((post, id) => {
                            let unique = [];
                            return (
                                post?.user.username.toLowerCase().includes(name) && unique.indexOf(post?.user.username.toLowerCase()) < 0 ?
                                <>
                                <div><img className="searchbar-photo" src={post?.user.profile_picture}></img></div>
                                <span key={id}>{post?.user.username}</span></> : null
                                )

                         })}
                        </div>
                    </div>
            }
                </form>
        </>
    )
}
