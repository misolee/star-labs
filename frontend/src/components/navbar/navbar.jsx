import React from "react";
import "../../stylesheets/navbar/navbar.css";

class Navbar extends React.Component {
	handleLanguageChange() {
		return (e) => {
			this.props.changeLanguage(e.target.value);
		};
	}

	render() {
		return (
			<div className="navbar">
				<select
					className="language"
					onChange={this.handleLanguageChange()}
					value={this.props.language}
				>
					<option value="eng" default>
						English
					</option>
					<option value="kor">Korean</option>
				</select>
			</div>
		);
	}
}

export default Navbar;
