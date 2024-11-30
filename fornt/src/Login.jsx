function Login() {
    const [loginData, setLoginData] = useState({
      username: "",
      password: "",
    });
  
    const handleLoginChange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };
  
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.text())
        .then((data) => alert(data))
        .catch((error) => console.error("Error:", error));
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;
  