import React from "react";
import { greetingText } from "./greeting_text";
import "../../stylesheets/greeting/greeting.css";

class Greeting extends React.Component {
	handleLogout(e) {
		return (e) => {
			e.preventDefault();
			this.props.logout();
		};
	}

	render() {
		const { user, language } = this.props;

		return (
			<div className="greeting-page">
				<div className="greeting-block">
					<div className="logo"></div>
					<div className="header">
						{greetingText.greeting[language]} {user.name}
						{language === "kor" ? "님" : ""}!
					</div>
					<button
						className="submit-button"
						id="logout-button"
						onClick={this.handleLogout()}
					>
						{greetingText.logout[language]}
					</button>
				</div>
			</div>
		);
	}
}

export default Greeting;
