import {Routes, Route, Link, useParams} from 'react-router-dom';
import { useState } from 'react';
import './App.css';

export function GuessApp() {
	return (< GuessingGame />)
}

// main component of the Guessing Game app
function GuessingGame() {
	// stores latest number input by the user
    const [currNumber, setCurrNumber] = useState('')

	// stores all the numbers input by the user
    const [guesses, setGuesses] = useState([])

	// stores whether or not the game has ended
    const [endGame, setEndGame] = useState(false)

	// stores whether certain elements should be disabled or not
    const [disabled, setDisabled] = useState(false)

	// stores the maximum allowed guesses
    const [maxGuesses, setMaxGuesses] = useState(10)

	// stores the range minimum of the randomly generated number
    const [minNumber, setMinNumber] = useState(0)

	// stores the range maximum of the randomly generated number
    const [maxNumber, setMaxNumber] = useState(100)

	// stores the number to guess
    const [theAnswer, setTheAnswer] = useState(getRandomInt(minNumber, maxNumber))
	//console.log("The number is: " + theAnswer)

	// stores the total number of games played
    const [totalGames, setTotalGames] = useState(0)

	// stores the number of games won (i.e. games where the user guessed the answer)
    const [totalCorrectGames, setTotalCorrectGames] = useState(0)

	// stores the number of guesses it took to win a game
    const [totalGuesses, setTotalGuesses] = useState(0)

	var initMessage = " Try to guess the number in " + maxGuesses + " turns or fewer."
    const [message, setMessage] = useState(initMessage)

	// generates a random number between the input range minimum and maximum
    function getRandomInt(min, max) {
        min = parseInt(min)
        max = parseInt(max)
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function Home() {
    	return (
			<div id='page' className="w3-display-container">
	    		< Header />
				< Navigation />
	    		< GameView />
			</div>
    	);
	}

	function Settings() {
    	return (
			<div id='page' className="w3-display-container">
	    		< Header />
	    		< Navigation />
	    		< SettingsView />
			</div>
    	);
	}

	function Statistics() {
    	return (
			<div id='page' className="w3-display-container">
	    		< Header />
	    		< Navigation />
	    		< StatsView />
			</div>
    	);
	}

	function Header()
	{
    	return (
        	<div className="w3-center">
				<br/>
            	<h1>Number Guessing Game</h1>
        	</div>
    	);
	}

	function Navigation()
	{
		var styling = "navItem w3-bar-item w3-button w3-padding w3-hover-none w3-border-white w3-hover-text-blue"

    	return (
			<div id='navbar' className='w3-bar w3-padding'>
			<ul className="w3-ul w3-large">
	    		<li className={styling} style={{width:"33%", fontWeight:"bold"}}><Link to="/">Game</Link></li>
	    		<li className={styling} style={{width:"33%", fontWeight:"bold"}}><Link to="/settings">Settings</Link></li>
				<li className={styling} style={{width:"33%", fontWeight:"bold"}}><Link to="/statistics">Statistics</Link></li>
			</ul>
			</div>
    	);
	}

	// view for playing the Number Guessing Game
	function GameView(props) {
		function Banner() {
            return (
                <div className="w3-center w3-large" id="banner">
                    &nbsp;{message}
                </div>
            );
        }
		function restart()
		{
			setMessage(initMessage)
			setGuesses([])
			setCurrNumber('')
			setEndGame(false)
			setDisabled(false)
			var num = getRandomInt(minNumber, maxNumber)
			console.log("The number is: " + num)
			setTheAnswer( num )
		}

		function Restart()
		{
			var styling = "w3-large w3-center w3-button w3-gray w3-round-large w3-padding"
			return (
				<div id='restart' className='w3-display-container w3-center'>

				<button className={endGame?'playAgain '+styling :'noShow'} onClick={()=>restart()}>
					Play Again
				</button>
				</div>
			);
		}

		function handleNewGameState(e) {
			e.preventDefault();

			var result = checkNumber(currNumber);

			if (result !== -1) {
				setGuesses((gg) => [...gg, currNumber])
				setCurrNumber('');
				var numGuesses = guesses.length+1

				if ((result === 1) || (numGuesses === parseInt(maxGuesses))) {
					if (result === 1) {
						setMessage("Congratulations!  You guessed correctly")
					} else {
						setMessage("Game Over.  The number is " + theAnswer)
					}
					setEndGame(true)
					setDisabled(true)
					if (result) {
						setTotalCorrectGames(parseInt(totalCorrectGames) + 1)
						setTotalGuesses(parseInt(totalGuesses) + numGuesses )
					}
					setTotalGames(parseInt(totalGames) + 1)
				}
			}
		}
		function checkNumber(guess) {
			guess = parseInt(guess);

			if (isNaN( guess )) {
				setMessage("Please enter a number")
				return(-1)
			}

			if ((guess < minNumber) || (guess > maxNumber)) {
				setMessage("You have entered a number that is out of range.  Try again")
				return (-1)
			}

			if (guess === theAnswer) {
				return (1)
			}

			if (guess < theAnswer) {
				setMessage("Your guess is too LOW")
			}

			if (guess > theAnswer) {
				setMessage("Your guess is too HIGH")
			}
			return (0)
		}
    	function GameForm()
		{
			return (
				<div id='gameboard' className='w3-display-container w3-center'>
					<form>
						<label htmlFor="guessField" className="w3-large w3-label">
								Enter your guess between {minNumber} and {maxNumber}:
						</label>
						<br/><br/>
						<input id="guessField" type='number' value={currNumber} autoFocus disabled={disabled}
							   className="w3-xlarge w3-input w3-round-large w3-light-gray w3-center w3-padding w3-border "
							   style={{width:"125px", height:"75px", margin:"auto", fontWeight:"bold"}}
							   onInput={(e) => setCurrNumber(e.target.value)}/>
						<br/>
						<button id='submitNumber' disabled={disabled} className="w3-button w3-gray w3-large w3-round-large"
								onClick={(e) => handleNewGameState(e)}>
							Submit
						</button>
					</form>
					<br/>
					<hr/>
					<h6> Previous Guesses: {guesses.join(",  ")} </h6>
					<h6> Number of Attempts: {guesses.length} / {maxGuesses}</h6>
				</div>
			);
		}

		return (
			<div id='mainbody' className="w3-display-container w3-round-xlarge w3-padding-large w3-card">
			<br/><br/>
			< Banner />

			<br/>
			< GameForm />

			<br/>
			< Restart />
			</div>
		);
	}

	// view to allow the user to set the range minimum and maximum and the maximum allowed guesses
	function SettingsView()
	{
		function handleNewSettingsState(e) {
			e.preventDefault();

			switch(e.target.id)
			{
				case 'minimumField':
					setMinNumber(e.target.value)
					setTheAnswer(getRandomInt(minNumber, maxNumber))
					break
				case 'maximumField':
					setMaxNumber(e.target.value)
					setTheAnswer(getRandomInt(minNumber, maxNumber))
					break
				case 'maximumGuesses':
					setMaxGuesses(e.target.value)
					setMessage(initMessage)
					break
			}
		}

		return (
			// this really should use a loop to generate the label and input field elements
			<div id='mainbody' className="w3-display-container w3-round-xlarge w3-padding-large w3-card">
				<br/><br/>
				<form>
					<label htmlFor="minimumField" className="w3-large w3-label">
						Enter a minimum number: &nbsp; &nbsp;
					</label>
					<input type='number' id='minimumField' value= {minNumber}
						   className="w3-large w3-input w3-round-large w3-light-gray w3-center w3-padding w3-border"
						   onInput={(e) => handleNewSettingsState(e)}/>
					<br/><br/>
					<label htmlFor="maximumField" className="w3-large w3-label">
						Enter a maximum number: &nbsp; &nbsp;
					</label>
					<input type='number' id='maximumField' value= {maxNumber}
						   className="w3-large w3-input w3-round-large w3-light-gray w3-center w3-padding w3-border"
						   onInput={(e) => handleNewSettingsState(e)}/>
					<br/><br/>
					<label htmlFor="maximumGuesses" className="w3-large w3-label">
						Enter a maximum number of guesses: &nbsp; &nbsp;
					</label>
					<input type='number' id='maximumGuesses' value= {maxGuesses}
						   className="w3-large w3-input w3-round-large w3-light-gray w3-center w3-padding w3-border"
						   onInput={(e) => handleNewSettingsState(e)}/>
				</form>
				<br/><br/>
			</div>
		);
	}

	// view showing the user's game playing statistics
	function StatsView() {
		return (
			// this also should use a loop to generate the row and column elements
			<div id='mainbody' className="w3-display-container w3-large w3-round-xlarge w3-padding-large w3-card">
				<br/><br/>
				<div className="w3-row w3-container">
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s7">
						Total Number of Games Played
					</div>
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s3">
						{totalGames}
					</div>
				</div>

				<div className="w3-row w3-container">
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s7">
						<p>Number of Games Won</p>
					</div>
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s3">
						<p>{totalCorrectGames}</p>
					</div>
				</div>

				<div className="w3-row w3-container">
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s7">
						Average Number of Guesses Needed to Win
					</div>
					<div className="w3-col s1"> &nbsp;
					</div>
					<div className="w3-col s3">
						{ (totalCorrectGames) ? ((totalGuesses / totalCorrectGames).toPrecision(2)) : "N/A"}
					</div>
				</div>
				<br/><br/>
			</div>
		);

	}

	return (
		<div>
		  <Routes>
			<Route path="/" element={<Home />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="/statistics" element={<Statistics />} />
		  </Routes>
		</div>
    );
}