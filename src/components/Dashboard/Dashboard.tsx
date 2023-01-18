import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import "./Dashboard.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IBucket } from "../../models/IBucket";

const Dashboard = () => {
  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [userName, setUserName] = useState<string>("");
  const [totalSavedAmount, setTotalSavedAmount] = useState<number>(0);
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);
  const [bucket1, setBucket1] = useState<IBucket>();
  const [bucket2, setBucket2] = useState<IBucket>();
  const [bucket3, setBucket3] = useState<IBucket>();
  const [bucket4, setBucket4] = useState<IBucket>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      if (data.exists()) {
        console.log("Document data: ", data.data());
        setUserName(data.data().userName);
        setTotalSavedAmount(data.data().totalSavedAmount);
        setMonthlyExspenses(data.data().monthlyExspenses);
        setBucket1(data.data().bucket1);
        setBucket2(data.data().bucket2);
        setBucket3(data.data().bucket3);
        setBucket4(data.data().bucket4);
      } else {
        console.log("no document");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Dashboard works!</h1>
      <h2>Hej {userName}!</h2>
      <Link to="/settings">
        <button>Ändra inställningarna</button>
      </Link>
      <br />
      <h4>Totalt sparande: {totalSavedAmount}kr.</h4>
      <h4>Månadsutgift: {monthlyExspenses}kr.</h4>
      <br />

      <div>
        {bucket1?.inUse ? (
          <Link to={`/bucket/${bucket1.bucketNumber}`}>
            <button>{bucket1.bucketNumber}</button>
          </Link>
        ) : (
          <Link to={`/bucket/${bucket1?.bucketNumber}`}>
            <button>Skapa en ny hink +</button>
          </Link>
        )}
      </div>

      <br />

      {bucket1?.inUse ? (
        <div>
          {bucket2?.inUse ? (
            <Link to={`/bucket/${bucket2.bucketNumber}`}>
              <button>{bucket2.bucketNumber}</button>
            </Link>
          ) : (
            <Link to={`/bucket/${bucket2?.bucketNumber}`}>
              <button>Skapa en ny hink +</button>
            </Link>
          )}
        </div>
      ) : (
        <p></p>
      )}

      <br />

      {bucket2?.inUse ? (
        <div>
          {bucket3?.inUse ? (
            <Link to={`/bucket/${bucket3.bucketNumber}`}>
              <button>{bucket3.bucketNumber}</button>
            </Link>
          ) : (
            <Link to={`/bucket/${bucket3?.bucketNumber}`}>
              <button>Skapa en ny hink +</button>
            </Link>
          )}
        </div>
      ) : (
        <p></p>
      )}

      <br />

      {bucket3?.inUse ? (
        <div>
          {bucket4?.inUse ? (
            <Link to={`/bucket/${bucket4.bucketNumber}`}>
              <button>{bucket4.bucketNumber}</button>
            </Link>
          ) : (
            <Link to={`/bucket/${bucket4?.bucketNumber}`}>
              <button>Skapa en ny hink +</button>
            </Link>
          )}
        </div>
      ) : (
        <p></p>
      )}

      <br />
    </>
  );
};
export default Dashboard;
