import React from "react";
import { Link } from "react-router-dom";
import { loginFormText } from "./login_form_text";
import "../../stylesheets/session/form.css";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			rememberMe: false,
		};
	}

	componentDidMount() {
		this.props.clearErrors();
		if (localStorage.rememberMe === "true") {
			this.setState({
				email: localStorage.email,
				rememberMe: JSON.parse(localStorage.rememberMe),
			});
		} else {
			localStorage.email = "";
			this.setState({ email: "" });
		}
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleInputChange() {
		return (e) => {
			this.setState({ rememberMe: e.target.checked });
		};
	}

	handleLogin() {
		let { email, password } = this.state;

		return (e) => {
			e.preventDefault();
			this.props.login({ email, password });
			if (this.state.rememberMe) {
				localStorage.email = this.state.email;
			}
			localStorage.rememberMe = this.state.rememberMe;
		};
	}

	renderErrors() {
		if (this.props.errors) {
			return (
				<div className="errors">
					{Object.keys(this.props.errors).map((error, i) => (
						<div key={`error-${i}`} className="error">
							{this.props.errors[error][this.props.language]}
						</div>
					))}
				</div>
			);
		}
	}

	render() {
		const { language } = this.props;

		return (
			<div className="component-page">
				<div className="component-block">
					<div className="logo"></div>
					<div className="input-fields">
						<input
							type="text"
							value={this.state.email}
							onChange={this.update("email")}
							placeholder={loginFormText.email[language]}
						/>
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder={loginFormText.password[language]}
							maxLength="12"
						/>
					</div>
					<div className="splash-errors">{this.renderErrors()}</div>
					<label className="checkbox">
						<span>{loginFormText.remember[language]}</span>
						<input
							type="checkbox"
							value="rememberMe"
							id="rememberMe"
							checked={this.state.rememberMe}
							onChange={this.handleInputChange()}
						/>
						<div className="checkmark" />
					</label>
					<div className="buttons">
						<button className="submit-button" onClick={this.handleLogin()}>
							{loginFormText.login[language]}
						</button>
						<div>
							{loginFormText.firstTime[language]}?{" "}
							<Link className="link" to="/register">
								{loginFormText.register[language]}
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
