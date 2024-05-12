import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function Quote(){
    return(
        <div className="section quote">
            <p className="quote-text"><FontAwesomeIcon icon={faQuoteLeft}/>"Your life is too short for bad pancakes."</p>
            <p className="quote-author">- Jeff Pancakes</p>
        </div>
    )
}