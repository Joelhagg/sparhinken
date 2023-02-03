import "./Dashboard.scss";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IBucket } from "../../models/IBucket";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { BsQuestionCircleFill } from "react-icons/bs";

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
  const [totalSavedInBuckets, setTotalSavedInBuckets] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      if (data.exists()) {
        setUserName(data.data().userName);
        setTotalSavedAmount(data.data().totalSavedAmount);
        setMonthlyExspenses(data.data().monthlyExspenses);
        setBucket1(data.data().bucket1);
        setBucket2(data.data().bucket2);
        setBucket3(data.data().bucket3);
        setBucket4(data.data().bucket4);
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

    if (totalSavedInBuckets == Number.NaN) {
      setTotalSavedInBuckets(0);
    }

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
      <div className="dashboardPositionWraper">
        <div className="dashboardWraper">
          <div className="bigTextConatiner">
            <div className="emptybox">
              <h1>Hej {userName}!</h1>
            </div>
            <div className="emptybox">
              <h1>Dashboard</h1>
            </div>
            <div className="emptybox">
              {" "}
              <Link to="/settings">
                <button className="changeSettingsButton">
                  Ändra inställningarna
                </button>
              </Link>
            </div>
          </div>

          <div className="dashboardConatiner">
            <div>
              {bucket1?.inUse ? (
                <Link
                  className="usedBucketLink"
                  to={`/bucket/${bucket1.bucketNumber}`}
                >
                  <button className="usedBucket">
                    <div>
                      <h3>Hink {bucket1.bucketNumber}</h3>
                      <p>{bucket1.bucketName}</p>
                      <p>{bucket1.actualBucketSize} kr</p>
                      {/* <p>{bucket1.percentageFilled}% fylld</p> */}
                    </div>
                  </button>
                </Link>
              ) : (
                <Link to={`/bucket/${bucket1?.bucketNumber}`}>
                  <div className="addNewBucketBox">
                    <svg
                      className="whitePlusSVG"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </div>
                </Link>
              )}
            </div>

            {bucket1?.inUse ? (
              <div>
                {bucket2?.inUse ? (
                  <Link
                    className="usedBucketLink"
                    to={`/bucket/${bucket2.bucketNumber}`}
                  >
                    <button className="usedBucket">
                      <div>
                        <h3>Hink {bucket2.bucketNumber}</h3>
                        <p>{bucket2.bucketName}</p>
                        <p>{bucket2.actualBucketSize} kr</p>
                        {/* <p>{bucket2.percentageFilled}% </p> */}
                      </div>
                    </button>
                  </Link>
                ) : (
                  <Link to={`/bucket/${bucket2?.bucketNumber}`}>
                    <div className="addNewBucketBox">
                      <svg
                        className="whitePlusSVG"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <p></p>
            )}

            {bucket2?.inUse ? (
              <div>
                {bucket3?.inUse ? (
                  <Link
                    className="usedBucketLink"
                    to={`/bucket/${bucket3.bucketNumber}`}
                  >
                    <button className="usedBucket">
                      <div>
                        <h3>Hink {bucket3.bucketNumber}</h3>
                        <p>{bucket3.bucketName}</p>
                        <p>{bucket3.actualBucketSize} kr</p>
                        {/* <p>{bucket2.percentageFilled}% </p> */}
                      </div>
                    </button>
                  </Link>
                ) : (
                  <Link to={`/bucket/${bucket3?.bucketNumber}`}>
                    <div className="addNewBucketBox">
                      <svg
                        className="whitePlusSVG"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <p></p>
            )}

            {bucket3?.inUse ? (
              <div>
                {bucket4?.inUse ? (
                  <Link
                    className="usedBucketLink"
                    to={`/bucket/${bucket4.bucketNumber}`}
                  >
                    <button className="usedBucket">
                      <div>
                        <h3>Hink {bucket4.bucketNumber}</h3>
                        <p>{bucket4.bucketName}</p>
                        <p>{bucket4.actualBucketSize} kr</p>
                        {/* <p>{bucket2.percentageFilled}% </p> */}
                      </div>
                    </button>
                  </Link>
                ) : (
                  <Link to={`/bucket/${bucket4?.bucketNumber}`}>
                    <div className="addNewBucketBox">
                      <svg
                        className="whitePlusSVG"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <div className="amountConatiner">
            <div>
              <Link to="/guide">
                <BsQuestionCircleFill className="questionMark" />
              </Link>
            </div>
            <div>
              <h1>Totalt i hinkarna: {totalSavedInBuckets} kr</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
