import {useState} from 'react'
import { AiOutlineHeart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.min.css';



function Likes({post}) {

    const [heartColor, setHeartColor] = useState(('transparent'))
    const [heartId, setHeartId] = useState(0)



    const likeConditional = (post) => {
        if(heartId === post.id) {
            setHeartId(post.id)
        }
    }

    return (

        <FontAwesomeIcon style={{ 'color': heartColor }} value={heartId} className="homepage-heart" icon={faHeart}>
                                            </FontAwesomeIcon>
    )
}

export default Likes
