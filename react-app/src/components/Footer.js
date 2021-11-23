import { FaLinkedin } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'
import "./Footer.css"


function Footer() {

    return (
        <>
            <footer>
                <div className="footer-content">
                    <p>This application was built with HTML, CSS, Javascript, Python, React/Redux, and Flask</p>
                    <ul className="socials">
                        <li><a href="https://github.com/AustinW24/instapaws"><AiFillGithub /></a></li>
                        <li><a href="https://www.linkedin.com/in/austin-williams-44a6a21b8/"><FaLinkedin /></a></li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p>copyright &copy;2021 Instapaw. designed by<span>  Austin Williams</span></p>
                </div>
            </footer>
        </>



    )
}

export default Footer
