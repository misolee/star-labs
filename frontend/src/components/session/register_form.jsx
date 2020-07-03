import React from "react";
import { Link } from "react-router-dom";
import { registerFormText } from "./register_form_text";
import "../../stylesheets/session/form.css";

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			name: "",
			password: "",
			confirmPassword: "",
		};
	}

	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(props) {
		if (props.isSignedIn === true) props.history.push("/login");
		return null;
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleRegister() {
		const { email, name, password, confirmPassword } = this.state;
		const { language } = this.props;

		return (e) => {
			e.preventDefault();
			this.props.register({ email, name, password, confirmPassword, language });
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
							placeholder={registerFormText.email[language]}
						/>
						<input
							type="text"
							value={this.state.name}
							onChange={this.update("name")}
							placeholder={registerFormText.name[language]}
						/>
						<input
							type="password"
							value={this.state.password}
							onChange={this.update("password")}
							placeholder={registerFormText.password[language]}
							maxLength="12"
						/>
						<input
							type="password"
							value={this.state.confirmPassword}
							onChange={this.update("confirmPassword")}
							placeholder={registerFormText.confirmPassword[language]}
							maxLength="12"
						/>
					</div>
					<div className="splash-errors">{this.renderErrors()}</div>
					<div className="buttons">
						<button className="submit-button" onClick={this.handleRegister()}>
							{registerFormText.register[language]}
						</button>
						<div>
							{registerFormText.haveAccount[language]}?{" "}
							<Link className="link" to="/login">
								{registerFormText.login[language]}
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
