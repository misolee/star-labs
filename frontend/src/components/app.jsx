import React from "react";
import { Switch } from "react-router-dom";
import GreetingContainer from "./greeting/greeting_container";
import RegisterFormContainer from "./session/register_form_container";
import LogInFormContainer from "./session/login_form_container";
import Navbar from "./navbar/navbar_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";

const App = () => (
	<div className="app">
		<Navbar />
		<Switch>
			<AuthRoute exact path="/login" component={LogInFormContainer} />
			<AuthRoute exact path="/register" component={RegisterFormContainer} />
			<ProtectedRoute exact path="/" component={GreetingContainer} />
		</Switch>
	</div>
);

export default App;
