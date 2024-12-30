import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { Button, Modal, Spinner } from 'react-bootstrap';
import { PiGooglePodcastsLogoBold } from "react-icons/pi";
import { loginAPI, registerAPI } from '../services/allAPI';
import { loginContext } from '../contexts/ContextShare';
import SERVER_BASE_URL from '../services/serverUrl';
import { tokenContext } from '../contexts/TokenAuth';

const Nav = ({ mainTheme }) => {
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  const [userDetails, setUserDetails] = useState({name:"",pic:""});
  const [isLogin, setIsLogin] = useState(false);
  const { userLogin, setUserLogin } = useContext(loginContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(userInput);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isRegister, setIsRegister] = useState(true);
  useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setIsLogin(true);
        const user = JSON.parse(sessionStorage.getItem("user"));
        setUserDetails({...userDetails,name:user.username,pic:user.profilePic})        
      } else {
        setIsLogin(false);
      }
    }, [userLogin]);
  const register = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.email && userInput.password) {
      // api call
      try {
        const result = await registerAPI(userInput);
        if (result.status == 200) {
          alert(`Welcome ${result.data?.username}, Please login`);
          setIsRegister(true);
          setUserInput({ username: "", email: "", password: "" });
        } else {
          if (result.status == 406) {
            alert(result.response.data);
            setIsRegister(true);
            setUserInput({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (userInput.email && userInput.password) {
      // api call
      try {
        const result = await loginAPI(userInput);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsSpinner(true);
          setAuthorisedUser(true);
          setTimeout(() => {
            navigate("/");
            setUserInput({ username: "", email: "", password: "" });
            setIsSpinner(false);
            handleClose();
            setUserLogin(result);
          }, 2000);
        } else {
          if (result.response.status == 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: `${mainTheme.bgLight}`,
        }}
        className="w-[100%] flex justify-between items-center shadow p-4 flex-1"
      >
        <div
          style={{
            color: `${mainTheme.text_primary}`,
          }}
          className="text-2xl font-bold md:text-xl"
        >
          Welcome, <span className="text-green-500">{userDetails.name}</span>
        </div>

        {isLogin ? (
          <>
            <Link to={"profile"} className="no-underline">
              <div
                style={{
                  backgroundColor: `${mainTheme.text_secondary}`,
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
              >
                {userDetails.pic ==""?
                <>{userDetails.name.split("")[0]}</>
                :<><img className='w-10 h-10 rounded-full ' src={`${SERVER_BASE_URL}/uploads/${userDetails.pic}`} alt="" /></>}
              </div>
            </Link>
          </>
        ) : (
          <>
            <div
              style={{
                backgroundColor: `${mainTheme.bg}`,
              }}
              className="border rounded px-2"
            >
              <button onClick={handleShow}>
                <div className="flex gap-2 items-center justify-center text-green-500">
                  <IoMdPerson />
                  Login
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* login */}
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="flex gap-2 text-green-500">
              <div className="mt-1">
                <PiGooglePodcastsLogoBold />
              </div>
              PODSTREAM
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isRegister ? (
            <>
              <div className="font-bold text-xl mb-3">Sign In</div>
              <form className="flex flex-col gap-3 p-2 w-full ">
                <input
                  value={userInput.email}
                  onChange={(e) =>
                    setUserInput({ ...userInput, email: e.target.value })
                  }
                  type="email"
                  placeholder="Email Id"
                  className="rounded p-2 w-full"
                />
                <input
                  value={userInput.password}
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                  className="rounded p-2 w-full"
                />
              </form>
              <div className="flex p-2 w-full items-center justify-center">
                <Button className="w-1/4" variant="success" onClick={login}>
                  Login
                  {isSpinner && (
                    <Spinner
                      animation="border"
                      variant="light"
                      className="ms-1"
                    />
                  )}
                </Button>
              </div>
              <div className="flex p-2 w-full items-center justify-center">
                Don't have an account?
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-green-500"
                >
                  Create Account
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="font-bold text-xl mb-3">Sign Up</div>
              <form className="flex flex-col gap-3 p-2 w-full ">
                <input
                  value={userInput.username}
                  onChange={(e) =>
                    setUserInput({ ...userInput, username: e.target.value })
                  }
                  type="text"
                  placeholder="Username"
                  className="rounded p-2 w-full"
                />
                <input
                  value={userInput.email}
                  onChange={(e) =>
                    setUserInput({ ...userInput, email: e.target.value })
                  }
                  type="email"
                  placeholder="Email Id"
                  className="rounded p-2 w-full"
                />
                <input
                  value={userInput.password}
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                  className="rounded p-2 w-full"
                />
              </form>
              <div className="flex p-2 w-full items-center justify-center">
                <Button className="w-1/2" variant="success" onClick={register}>
                  Create Account
                </Button>
              </div>
              <div className="flex p-2 w-full items-center justify-center">
                Already have an account?
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-green-500"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Nav