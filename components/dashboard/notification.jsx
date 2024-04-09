// import ProfileLayout from "../../components/user_data/user_notification";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const General = () => {
  // const [userData, setUserData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   phoneno: "",
  //   dob: "",
  //   gender: "",
  //   country: "",
  // });
  

  const fetchUserData = async () => {
    try {
      // Extract JWT token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://mamosh-backend.vercel.app/api/user/getone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        console.log("error");
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Data :", userData);
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const router = useRouter();
  // let productsjson = useLoaderData();
  const [userData, setUserData] = useState({
    currentpass: "",
    newpass: "",
    renewpass: "",
  });

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="noti-main-div">
      <div
        className="pay-top"
      >
        <div className="pay-head">
          <h4>Email Preferences</h4>
          <p>
          Manage your email preferences for a personalized experience tailored to your preferences. Your data security is our utmost priority.{" "}
            <span style={{ color: "#3b82f6", cursor: "pointer" }}>
              Learn More.
            </span>{" "}
          </p>
          <p>
          
          </p>
        </div>
        
      </div>

      <div
        className="security-div"
      >
        <div className="security-main" style={{ height: "385px" }}>
          {/* <p>Subscription Preference Center</p> */}
          {/* <div className="myline-4"></div> */}

          <div className="form-secure">
            <p className="would">
              I would like to receive notifications for :
            </p>
            <div className="notisel">
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Product Announcements and Updates</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Events and Meetups</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p"> User Research Surveys</p>
              </div>
              <div className="rownoti">
                <input type="checkbox" className="noticheck"></input>
                <p className="noti-p">Hatch Startup Program</p>
              </div>
            </div>
            
            <div className="rownoti" style={{marginTop:'25px', alignItems:'baseline'}}>
              <input type="checkbox" className="noticheck"></input>
              <p className="noti-p" style={{fontWeight:'600'}}>To unsubscribe from all email communications, click below. We respect your choice and apologize for any inconvenience. You can resubscribe at any time. Thank you.</p>
            </div>
            <div className="fixed-right" style={{marginTop:'15px'}}>
        <div className="fr-save" style={{ width: "14vw", marginTop: "12px" }}>
          Update My Preferences
        </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
