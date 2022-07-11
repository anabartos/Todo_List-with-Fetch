import React from "react";
import TodoList from "./todolist.jsx";

const Home = () => {
	return (
		
			<div className="container">
			<h1 className="tex-center mt-4 text-muted">TODO LIST</h1>
			<TodoList />
			</div>
	
	);
};

export default Home;
