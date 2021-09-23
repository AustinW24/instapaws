import { useEffect, useState } from "react"
// import { userSearch } from "../../store/users"
import { useDispatch, useSelector } from "react-redux";
import './Search.css'

export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [clicked, setClicked] = useState(false)

    const posts = useSelector((state) => state.posts?.posts);
    // console.log(posts, "POSTS OR USERS")

    // function users() {
    //     posts?.map((p) => {
    //         users.push(p.user.username)
    //     })
    //     return users
    // }



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
                        {posts.map((post, id) => {
                            let unique = [];
                            return (
                                post?.user.username.toLowerCase().includes(name) && unique.indexOf(post?.user.username.toLowerCase()) < 0 ?
                                <span key={id}>{post?.user.username}</span> : null
                                )

                         })}
                        </div>
                    </div>
            }
                </form>
        </>
    )
}
