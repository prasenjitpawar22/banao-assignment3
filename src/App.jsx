import axios from "axios";
import { useEffect, useState } from "react";

import { CardLoader, MyBulletListLoader } from "./components/Loader";
import Missing from "./components/Missing";

// const log = console.log;
function App() {
  const [data, setData] = useState({});
  const [activeData, setActiveData] = useState({});
  const [loader, setLoader] = useState(true);
  const [missing, setMissing] = useState(false);

  //fetch data
  useEffect(async () => {
    await axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((res) => {
        setData(res.data);
        // log(res.data[0]);
        setActiveData({ item: res?.data[0], activeObject: "1" });
        setLoader(false);
      })
      .catch((e) => {
        setMissing(true);
        // log(e);
      });
  }, []);

  const toggleActiveStyles = (id) => {
    if (activeData.activeObject === id) {
      return `flex gap-2 bg-blue-100 px-2 py-2 cursor-pointer 
      hover:bg-blue-200 transition duration-300 ease-in-out`;
    } else {
      return `flex gap-2 bg-gray-100 px-2 py-2 cursor-pointer 
      hover:bg-gray-200 transition duration-300 ease-in-out`;
    }
  };
  const toggleActive = (item) => {
    setActiveData({ item: item, activeObject: item.id });
  };

  // useEffect(() => log(activeData));

  return missing ? (
    <Missing />
  ) : (
    <div className={"container mx-auto flex gap-10 flex-wrap py-4 px-4"}>
      {/* users list  */}
      <div className="flex-1 ">
        {loader ? (
          <MyBulletListLoader />
        ) : (
          <div className="flex flex-col gap-2  ">
            <div className="bg-blue-200 text-center rounded-t-md py-2">
              <span>Users list</span>
            </div>
            {data.map((item, index) => {
              let { id } = item;
              return (
                <div
                  key={index}
                  className={toggleActiveStyles(item.id)}
                  onClick={() => toggleActive(item)}
                >
                  {/*faker img url not working anymore !!! so used alternative url 'Pravata'*/}
                  <img
                    src={`https://i.pravatar.cc/50?img=${id}`}
                    alt="profile"
                    className={"rounded-full"}
                  />
                  <span>
                    {item.profile.firstName} {item.profile.lastName}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/*selected user details card */}
      <div className="flex-1">
        {loader ? (
          <CardLoader />
        ) : (
          <div className="flex flex-col">
            <div className="bg-blue-200 text-center rounded-t-md py-2">
              <span>Users details</span>
            </div>
            <div className="flex flex-col gap-2 items-center px-4 py-2">
              <img
                src={`https://i.pravatar.cc/50?img=${activeData.activeObject}`}
                alt=""
                className="rounded-full h-12 w-12"
              />
              <span>{activeData.item.profile.username} </span>
              <p className="text-left bg-gray-200 px-2 py-2 rounded-md">
                {activeData.item.Bio}
              </p>
              <div className="flex flex-col gap-2 float-left w-full pt-4">
                <div className="flex flex-col">
                  <span className="px-1">Full name</span>
                  <span className="text-left bg-gray-200 px-2 py-2 rounded-md">
                    {activeData.item.profile.firstName +
                      " " +
                      activeData.item.profile.lastName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="px-1">Job Title</span>
                  <span className="text-left bg-gray-200 px-2 py-2 rounded-md">
                    {activeData.item.jobTitle}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="px-1">Email</span>
                  <span className="text-left bg-gray-200 px-2 py-2 rounded-md">
                    {activeData.item.profile.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
