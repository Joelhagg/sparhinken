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
  const [totalSavedInBuckets, setTotalSavedInBuckets] = useState<number>();

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

  useEffect(() => {
    let sum = (arr: any) => {
      return arr.reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    };

    setTotalSavedInBuckets(
      sum([
        bucket1?.actualBucketSize,
        bucket2?.actualBucketSize,
        bucket3?.actualBucketSize,
        bucket4?.actualBucketSize,
      ])
    );
  }, [userName]);

  return (
    <>
      <h1>Dashboard works!</h1>
      <h2>Hej {userName}!</h2>
      <Link to="/settings">
        <button>Ändra inställningarna</button>
      </Link>
      <br />
      {/* <h4>Totalt sparande: {totalSavedAmount}kr.</h4>
      <h4>Månadsutgift: {monthlyExspenses}kr.</h4> */}
      <br />

      <div>
        {bucket1?.inUse ? (
          <Link to={`/bucket/${bucket1.bucketNumber}`}>
            <button>
              Hink {bucket1.bucketNumber} <br /> {bucket1.bucketName} <br />
              {bucket1.actualBucketSize} kr <br /> {bucket1.percentageFilled}%
              fylld
            </button>
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
              <button>
                Hink {bucket2.bucketNumber} <br /> {bucket2.bucketName}
                <br />
                {bucket2.actualBucketSize} kr <br /> {bucket2.percentageFilled}%
              </button>
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
              <button>
                Hink
                {bucket3.bucketNumber} <br />
                {bucket3.bucketName} <br />
                {bucket3.actualBucketSize} kr <br />
                {bucket3.percentageFilled}%
              </button>
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
              <button>
                Hink {bucket4.bucketNumber} <br /> {bucket4.bucketName} <br />
                {bucket4.actualBucketSize} kr <br /> {bucket4.percentageFilled}%
              </button>
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

      <h3>Totalt i hinkarna: {totalSavedInBuckets} kr</h3>
    </>
  );
};
export default Dashboard;
