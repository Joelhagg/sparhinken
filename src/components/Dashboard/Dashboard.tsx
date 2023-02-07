import "./Dashboard.scss";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { IBucket } from "../../models/IBucket";
import { BsQuestionCircleFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { InfinitySpin } from "react-loader-spinner";

const Dashboard = () => {
  const contextState = useContext(StateContext);
  const [currentUser] = useState(contextState);
  const [userName, setUserName] = useState<string>("");
  const [bucket1, setBucket1] = useState<IBucket>();
  const [bucket2, setBucket2] = useState<IBucket>();
  const [bucket3, setBucket3] = useState<IBucket>();
  const [bucket4, setBucket4] = useState<IBucket>();
  const [totalSavedInBuckets, setTotalSavedInBuckets] = useState<number>(0);
  const [totalMontlySavings, setTotalMontlySavings] = useState<number>(0);
  const [spinner, setSpinner] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setSpinner(true);
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      if (data.exists()) {
        setUserName(data.data().userName);
        setBucket1(data.data().bucket1);
        setBucket2(data.data().bucket2);
        setBucket3(data.data().bucket3);
        setBucket4(data.data().bucket4);
      }
      setSpinner(false);
    };

    fetchData();
  }, []);

  // calculations for adding bucket amounts for total montly savings and total bucket amounts

  useEffect(() => {
    let sum = (arr: any) => {
      return arr.reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    };

    if (totalSavedInBuckets === Number.NaN) {
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

    if (totalMontlySavings === Number.NaN) {
      setTotalMontlySavings(0);
    }

    setTotalMontlySavings(
      sum([
        bucket1?.montlySavings,
        bucket2?.montlySavings,
        bucket3?.montlySavings,
        bucket4?.montlySavings,
      ])
    );
  }, [userName]);

  // Digits formating, adding a space after 3 digits

  const formattedTotalMontlySavings = totalMontlySavings
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedTotalSavedInBuckets = totalSavedInBuckets
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedBucket1ActualBucketsize = bucket1?.actualBucketSize
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedBucket2ActualBucketsize = bucket2?.actualBucketSize
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedBucket3ActualBucketsize = bucket3?.actualBucketSize
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedBucket4ActualBucketsize = bucket4?.actualBucketSize
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <>
      <div className="dashboardPositionWraper">
        <div className="dashboardWraper">
          <div className="bigTextConatiner">
            <div className="emptybox">
              <h1>Hej {userName}!</h1>
            </div>
            <div className="emptybox">
              <h1>Översikt</h1>
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

          {spinner ? (
            <div className="dashboardConatiner">
              <InfinitySpin aria-hidden="true" width="200" color="#0071D9" />
            </div>
          ) : (
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
                        <p>{formattedBucket1ActualBucketsize} kr</p>
                      </div>
                    </button>
                  </Link>
                ) : (
                  <div>
                    <div className="dashboardBucket1Tooltip">
                      <BsQuestionCircleFill
                        aria-label="tooltip questionmark icon"
                        id="actualBucketSizeTooltip"
                        className="dashboardToolTipQuestionmark"
                      />
                      <Tooltip
                        aria-label="tootltip"
                        style={{ width: "250px" }}
                        anchorId="actualBucketSizeTooltip"
                        content={
                          "Här kan du skapa din första hink! Den blir automatiskt Hink 1. Är du osäker på vad varje hink bör göra, läs mer i Guiden!"
                        }
                        place="top"
                      />
                    </div>
                    <div>
                      <Link to={`/bucket/${bucket1?.bucketNumber}`}>
                        <div
                          aria-label="big plus icon for adding new bucket"
                          className="addNewBucketBox"
                        >
                          <svg
                            aria-hidden="true"
                            className="whitePlusSVG"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
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
                          <p>{formattedBucket2ActualBucketsize} kr</p>
                        </div>
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/bucket/${bucket2?.bucketNumber}`}>
                      <div
                        aria-label="big plus icon for adding new bucket"
                        className="addNewBucketBox"
                      >
                        <svg
                          aria-hidden="true"
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
                          <p>{formattedBucket3ActualBucketsize} kr</p>
                        </div>
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/bucket/${bucket3?.bucketNumber}`}>
                      <div
                        aria-label="big plus icon for adding new bucket"
                        className="addNewBucketBox"
                      >
                        <svg
                          aria-hidden="true"
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
                          <p>{formattedBucket4ActualBucketsize} kr</p>
                        </div>
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/bucket/${bucket4?.bucketNumber}`}>
                      <div
                        aria-label="big plus icon for adding new bucket"
                        className="addNewBucketBox"
                      >
                        <svg
                          aria-hidden="true"
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
          )}

          <div className="bottomConatiner">
            <div>
              <Link to="/guide">
                <BsQuestionCircleFill
                  aria-label="tooltip questionmark icon"
                  className="questionMark"
                />
              </Link>
            </div>
            <div className="amountConatiner">
              <h3>Totalt månadssparande: {formattedTotalMontlySavings} kr</h3>
              <h1 className="totalSavedInBucketsText">
                Totalt i hinkarna: {formattedTotalSavedInBuckets} kr
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
