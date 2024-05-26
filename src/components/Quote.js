import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function Quote(){
    return(
        <div className="section quote">
            <p className="quote-text"><FontAwesomeIcon icon={faQuoteLeft}/>"Pancakes are the epitome of comfort food, a warm and fluffy reminder of the simple pleasures in life. Life is too short for bad pancakes, so always take the time to make them right and enjoy every delightful bite."</p>
            <p className="quote-author">- Jeff Pancakes, 2024</p>
        </div>
    )
}