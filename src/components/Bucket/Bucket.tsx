import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Bucket.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { async } from "@firebase/util";

const Bucket = () => {
  let { bucketId } = useParams();
  const navigate = useNavigate();
  const contextState = useContext(StateContext);
  const [currentUser, setCurrentUser] = useState(contextState);
  const [bucketName, setBucketName] = useState<string>("");
  const [customBucketName, setCustomBucketName] = useState("");
  const [bucketNumber, setBucketNumber] = useState<number>();
  const [savedStatus, setSavedStatus] = useState<string>("");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [chosenBucket, setchosenBucket] = useState(`bucket${bucketId}`);
  const [disableButton, setDisableButton] = useState(false);

  const saveBucket = async (e: FormEvent) => {
    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketNumber: bucketNumber,
          inUse: true,
        },
      });
      console.log("saved");
      setSavedStatus("Sparat!");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
      console.error(e);
    }
  };

  const deleteBucket = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketNumber: bucketNumber,
          inUse: false,
        },
      });
      console.log("saved");
      setSavedStatus("Sparat!");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
      console.error(e);
    }
  };

  useEffect(() => {
    if (bucketId) {
      let urlnumber = parseInt(bucketId);
      if (urlnumber > 5) {
        navigate("/dashboard");
        return;
      }
    }

    let custom: string = "";
    if (bucketId) {
      custom = `bucket${parseInt(bucketId) + 1}`;
    }
    setloadingStatus(true);
    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));

      if (custom == "bucket5") {
        setDisableButton(false);
      } else if (data.data()?.[custom].inUse) {
        setDisableButton(true);
      }

      if (!bucketId) {
        return;
      } else {
        setBucketNumber(parseInt(bucketId));
      }
    };

    setloadingStatus(false);
    fetchData();
  }, []);

  return (
    <>
      {loadingStatus ? (
        <p>Laddar...</p>
      ) : (
        <div>
          <form>
            <h1>Hink {bucketNumber}</h1>
            <label>
              Namnge din hink
              <br />
              <input
                type="text"
                placeholder="Bufferthink"
                onChange={(e) => setBucketName(e.target.value)}
              />
            </label>
            <br />
            <br />
            <label>
              Rekommenderad storlek:
              <br />
              <input type="number" placeholder="27 000 kr" />
            </label>
            <br />
            <br />
            <label>
              Vald storlek
              <br />
              <input type="number" placeholder="27 000 kr" />
            </label>
            <br />
            <br />
            <label>
              Risknivå
              <br />
              <input type="range" min="0" max="2" />
            </label>
            <br />
            <br />
            <button onClick={saveBucket} type="submit">
              Spara
            </button>
            <br />
            <br />
            <Link to="/dashboard">
              <button>Avbryt</button>
            </Link>
            <br />
            <br />
            <button disabled={disableButton} onClick={deleteBucket}>
              Radera
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default Bucket;
