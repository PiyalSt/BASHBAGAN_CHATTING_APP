import React, { useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import {
  IoCloseSharp,
  IoSearchOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { FaCanadianMapleLeaf, FaMicrophone, FaUsers } from "react-icons/fa";
import { HiDotsVertical, HiOutlineEmojiHappy } from "react-icons/hi";
import { VscAttach } from "react-icons/vsc";
import { TbMessageChatbotFilled, TbUsersPlus } from "react-icons/tb";
import axios from "axios";

const Home = () => {
  // clean veriable
  const msgEndRef = useRef(null);

  // All State Here
  const [singleUser, setSingleUser] = useState([]);
  const [showChatbox, setShowChatbox] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCollection, setMessageCollection] = useState([]);
  const [activeStatus, setActiveStatus] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [addFriend, setAddFriend] = useState();
  const [addFriendBtn, setAddFriendBtn] = useState(false);
  const [friendLists, setFriendLists] = useState([]);

  const handleChatbox = (item) => {
    setSingleUser(item);
    setShowChatbox(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessage("");
    setMessageCollection([...messageCollection, message]);
  };

  const handleAddFriendBtn = () => {
    setAddFriendBtn(!addFriendBtn);
  };

  // auto scroll methods
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageCollection]);

  // Find All Users
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:4000/api/v1/users");

      setAllUsers(res.data.users);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen bg-linear-to-br from-green-800 to-slate-800 flex items-center justify-center relative">
      {/* Background Styles */}
      <div className="w-full absolute">
        <div className="w-20 h-20 rounded-full bg-orange-400/80 absolute top-15 left-40"></div>
        <div className="w-30 h-30 rounded-full bg-amber-400/80 absolute bottom-0 right-40"></div>
        <div className="w-25 h-25 rounded-full bg-green-400/80 absolute -top-60 right-100"></div>
      </div>

      {/* Find All User */}
      {showAllUsers && (
        <div className="w-100 md:min-w-2xl h-[70%] bg-gray-900/90 py-4 px-4 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex items-center justify-between border-b border-gray-400 py-3">
            <div>
              <p className="text-2xl text-gray-100 font-medium">
                Add New Friends
              </p>
            </div>
            <div>
              <IoCloseSharp
                onClick={() => setShowAllUsers(!showAllUsers)}
                className="text-2xl text-gray-300 cursor-pointer hover:text-gray-400 active:scale-95 transition-all duration-300"
              />
            </div>
          </div>

          <div className="w-full h-[90%] overflow-y-auto">
            {/* All User Lists */}
            <div className="w-full flex-1 my-4">
              {allUsers.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 px-2 py-2"
                >
                  <div className="w-14 h-14 rounded-full relative">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={assets.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="w-full flex-1">
                    <div className="w-full flex items-center justify-between">
                      <h2 className="text-lg capitalize text-gray-100 font-semibold">
                        {item.username}
                      </h2>
                      {addFriendBtn ? (
                        <button
                          onClick={handleAddFriendBtn}
                          className="py-2 px-4 bg-gray-800 text-gray-100 text-shadow-2xs hover:bg-green-900 rounded-md cursor-pointer transition-all duration-300 active:scale-95"
                        >
                          Remove Friend
                        </button>
                      ) : (
                        <button
                          onClick={handleAddFriendBtn}
                          className="py-2 px-4 bg-green-500 text-gray-100 text-shadow-2xs hover:bg-green-600 rounded-md cursor-pointer transition-all duration-300 active:scale-95"
                        >
                          Add Friend
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-6xl h-[80%] p-10 bg-gray-400/10 rounded-2xl backdrop-blur-md flex gap-4">
        <div className="w-2/6 h-full flex flex-col py-2 rounded-bl-md rounded-tl-md relative">
          {/* Chatapp Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-10">
              <img
                className="w-full h-full object-cover"
                src={assets.logoImage}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white text-shadow-2xs">
                বাঁশবাগান
              </h2>
              <p className="text-xs text-white text-shadow-2xs">
                Chatting Application Login
              </p>
            </div>
          </div>

          {/* Search Friends */}
          <div className="w-full flex items-center gap-2 py-2 px-4 rounded-full border border-gray-400 mt-4">
            <input
              className="w-full outline-0 text-gray-100"
              type="text"
              placeholder="Search chats or users"
            />
            <IoSearchOutline className="text-2xl text-gray-200" />
          </div>

          {/* Friend Lists */}
          <div className="w-full flex-1 my-4 overflow-y-scroll">
            {friendLists.map((item) => (
              <div
                onClick={() => handleChatbox(item)}
                key={item._id}
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-400/10 rounded-md cursor-pointer transition-all duration-300 active:scale-95"
              >
                <div className="w-14 h-14 rounded-full relative">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={assets.profileImage}
                    alt=""
                  />
                  {activeStatus && (
                    <div className="w-3 h-3 rounded-full bg-green-400/80 absolute bottom-1 right-0"></div>
                  )}
                </div>
                <div className="w-full flex-1">
                  <div className="w-full flex justify-between">
                    <h2 className="text-base text-gray-100 font-bold">
                      {item.userName}
                    </h2>
                    {/* <p className="text-sm text-gray-100">11:12 pm</p> */}
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="text-gray-400">{item.message}</p>
                    <div className="w-5 h-5 rounded-full bg-gray-400/20 text-white flex items-center justify-center text-xs backdrop-blur-md">
                      {item.countMsg}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Navs */}
          <div className="flex justify-between">
            <div
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="flex items-center gap-2 py-2 px-4 hover:bg-gray-400/10 rounded-md cursor-pointer transition-all duration-300 active:scale-95"
            >
              <TbUsersPlus className="text-lg text-gray-200" />
              <p className="text-sm text-gray-200">Add Friends</p>
            </div>
            <div className="flex items-center gap-2 py-2 px-4 hover:bg-gray-400/10 rounded-md cursor-pointer transition-all duration-300 active:scale-95">
              <FaUsers className="text-2xl text-gray-200" />
              <p className="text-sm text-gray-200">Groups</p>
            </div>
            <div className="flex items-center gap-2 py-2 px-4 hover:bg-gray-400/10 rounded-md cursor-pointer transition-all duration-300 active:scale-95">
              <IoSettingsSharp className="text-xl text-gray-200" />
            </div>
          </div>
        </div>

        {showChatbox ? (
          // {/* Chatting Container */}
          <div className="w-4/6 border border-gray-500/60 rounded-md">
            <div className="w-full h-full flex flex-col justify-between">
              {/* Chatting Top Part */}
              <div className="w-full border-b border-gray-500/60 overflow-y-scroll">
                <div className="flex items-center gap-2 px-4 py-3">
                  <div className="w-12 h-12 rounded-full relative">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={assets.profileImage}
                      alt=""
                    />
                    {activeStatus && (
                      <div className="w-3 h-3 rounded-full bg-green-400/80 absolute bottom-1 right-0"></div>
                    )}
                  </div>
                  <div className="w-full flex-1">
                    <div className="w-full flex items-center justify-between">
                      <div className="w-full flex flex-col">
                        <h2 className="text-sm text-gray-100 font-bold">
                          {singleUser.userName}
                        </h2>
                        {activeStatus ? (
                          <p className="text-gray-400 text-xs">Online</p>
                        ) : (
                          <p className="text-gray-400 text-xs">Offline</p>
                        )}
                      </div>
                      <div className="">
                        <HiDotsVertical className="text-xl text-gray-300 cursor-pointer hover:text-gray-400 active:scale-95 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chatting message section */}
              <div className="w-full flex-1 min-h-0 overflow-y-auto">
                <div className="w-full min-h-full py-2 px-4 flex flex-col items-end justify-end gap-2">
                  {messageCollection.map((item, index) => (
                    <div
                      key={index}
                      className="w-fit max-w-[75%] bg-green-400/10 py-2 px-4 rounded-2xl rounded-br-md text-sm text-gray-100"
                    >
                      <p>{item}</p>
                    </div>
                  ))}
                  {/* Scroll target */}
                  <div ref={msgEndRef}></div>
                </div>
              </div>

              {/* Message Type here */}
              <div className="m-4 p-2 bg-gray-400/10 rounded-md">
                <div>
                  <input
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    value={message}
                    className="w-full py-2 px-4 text-gray-200 outline-0 font-medium"
                    type="text"
                    placeholder="Type a message..."
                  />
                </div>
                <div className="w-full flex  justify-between">
                  <div className="flex items-center gap-2">
                    <HiOutlineEmojiHappy className="text-2xl text-gray-300 cursor-pointer active:scale-95 transition-all duration-300 hover:text-gray-400" />
                    <VscAttach className="text-2xl text-gray-300 cursor-pointer active:scale-95 transition-all duration-300 hover:text-gray-400" />
                    <FaMicrophone className="text-xl text-gray-300 cursor-pointer active:scale-95 transition-all duration-300 hover:text-gray-400" />
                  </div>
                  <div
                    onClick={handleSendMessage}
                    className="flex items-center gap-2 py-2 px-4 bg-green-400/50 rounded-md cursor-pointer active:scale-95 transition-all duration-300"
                  >
                    <FaCanadianMapleLeaf className="text-gray-200 text-xl" />
                    <button className="font-semibold text-white cursor-pointer">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty message error
          <div className="w-4/6 flex flex-col items-center justify-center">
            <TbMessageChatbotFilled className="text-8xl text-gray-300" />
            <p className="text-center text-2xl text-gray-300">
              Open Chatbox Here
            </p>
            <p className="text-center text-lg text-gray-300">No Message, yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
