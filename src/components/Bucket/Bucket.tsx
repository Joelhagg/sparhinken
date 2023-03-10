import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { BsQuestionCircleFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { InfinitySpin } from "react-loader-spinner";
import "./Bucket.scss";

const Bucket = () => {
  let { bucketId } = useParams();

  const navigate = useNavigate();

  const contextState = useContext(StateContext);
  const [currentUser] = useState(contextState);
  const [monthlyExspenses, setMonthlyExspenses] = useState<number>(0);
  const [bucketName, setBucketName] = useState<string>("");
  const [suggestedBucketName, setSuggestedBucketName] = useState<string>("");
  const [bucketNumber, setBucketNumber] = useState<number>();
  const [savedStatus, setSavedStatus] = useState<string>("");
  const [chosenBucket] = useState<string>(`bucket${bucketId}`);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [recommendedBucketSize, setRecommendedBucketSize] = useState<number>(0);
  const [
    recommendedBucketSizeBasedOnRiskLevel,
    setRecommendedBucketSizeBasedOnRiskLevel,
  ] = useState<number>();
  const [targeBucketSize, setTargeBucketSize] = useState<number>(0);
  const [actualBucketSize, setActualBucketSize] = useState<number>(0);
  const [recommendedRiskLevel, setRecommendedRiskLevel] = useState<number>(0);
  const [maxRiskLevel, setMaxRiskLevel] = useState<number>(0);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<number>(0);
  const [firstBucketAmount, setFirstBucketAmount] = useState<number>();
  const [percentageFilled, setPercentageFilled] = useState<number>();
  const [useRecomendedSettings, setUseRecomendedSettings] =
    useState<boolean>(false);
  const [inUse, setInUse] = useState<boolean>();
  const [resetBucket, setResetBucket] = useState<boolean>(true);
  const [softDeleted, setSoftDeleted] = useState<boolean>();
  const [helpTooltip, setHelpTooltip] = useState<boolean>(false);
  const [deleteBucketButton, setDeleteBucketButton] = useState<boolean>(false);
  const [montlySavings, setMontlySavings] = useState<number>(0);
  const [investForm, setInvestForm] = useState<string>("");
  const [freetext, setFreetext] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);

  // bucket number + 1, to disable create new bucket button when more then 4 buckets.
  let bucketCheck: string = "";

  // Calculation for recommended bucket size
  let recommendedBucketSizeCalculation =
    monthlyExspenses * recommendedRiskLevel;

  const saveBucket = async (e: FormEvent) => {
    e.preventDefault();
    setSavedStatus("");
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketName: bucketName,
          bucketNumber: bucketNumber,
          inUse: true,
          softDeleted: false,
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: actualBucketSize,
          savedBucketAmount: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          maxRiskLevel: maxRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
          montlySavings: montlySavings,
          savedMontlySavings: montlySavings,
          investForm: investForm,
          freetext: freetext,
        },
      });
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
    }
  };

  // renders "are you sure to delete" button from set boolean value

  const deleteButton = () => {
    setDeleteBucketButton(true);
  };

  const deleteBucket = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", currentUser.currentUser.uid), {
        [chosenBucket]: {
          bucketName: bucketName,
          bucketNumber: bucketNumber,
          inUse: false,
          softDeleted: true,
          recommendedBucketSize: recommendedBucketSize,
          targeBucketSize: targeBucketSize,
          actualBucketSize: 0,
          savedBucketAmount: actualBucketSize,
          suggestedBucketName: suggestedBucketName,
          recommendedRiskLevel: recommendedRiskLevel,
          maxRiskLevel: maxRiskLevel,
          selectedRiskLevel: selectedRiskLevel,
          percentageFilled: percentageFilled,
          useRecomendedSettings: useRecomendedSettings,
          montlySavings: 0,
          savedMontlySavings: montlySavings,
          investForm: investForm,
          freetext: freetext,
        },
      });
      navigate("/dashboard");
    } catch (e) {
      setSavedStatus("Det gick inte att spara");
    }
  };

  // runs when monthlyExspenses value is updated

  useEffect(() => {
    // checks if other then bucket 1-4 is accessed, if so re-routes to dashboard

    if (bucketId) {
      let urlnumber = parseInt(bucketId);
      if (urlnumber > 4) {
        navigate("/dashboard");
        return;
      }
    }

    // saves the string value of shown bucket number +1 for delete check
    // only the previous created bucket can be deleted

    if (bucketId) {
      bucketCheck = `bucket${parseInt(bucketId) + 1}`;
    }

    const fetchData = async () => {
      const data = await getDoc(doc(db, "users", currentUser.currentUser.uid));
      setSpinner(true);

      // sets info for calculations

      setMonthlyExspenses(data.data()?.monthlyExspenses);
      setFirstBucketAmount(data.data()?.bucket1.recommendedBucketSize);
      setRecommendedRiskLevel(data.data()?.[chosenBucket].recommendedRiskLevel);

      // sets current bucket info

      setBucketName(data.data()?.[chosenBucket].bucketName);
      setSuggestedBucketName(data.data()?.[chosenBucket].suggestedBucketName);
      setTargeBucketSize(data.data()?.[chosenBucket].targeBucketSize);
      setActualBucketSize(data.data()?.[chosenBucket].savedBucketAmount);
      setMaxRiskLevel(data.data()?.[chosenBucket].maxRiskLevel);
      setSelectedRiskLevel(data.data()?.[chosenBucket].selectedRiskLevel);
      setInUse(data.data()?.[chosenBucket].inUse);
      setSoftDeleted(data.data()?.[chosenBucket].softDeleted);
      setMontlySavings(data.data()?.[chosenBucket].savedMontlySavings);
      setInvestForm(data.data()?.[chosenBucket].investForm);
      setFreetext(data.data()?.[chosenBucket].freetext);
      setUseRecomendedSettings(
        data.data()?.[chosenBucket].useRecomendedSettings
      );

      // if bucket 4 is in use, delete button is always enabled

      if (bucketCheck === "bucket5") {
        setDisableButton(false);
      } else if (data.data()?.[bucketCheck].inUse) {
        setDisableButton(true);
      }

      // sets the current bucket number 1 - 4

      if (!bucketId) {
        return;
      } else {
        setBucketNumber(parseInt(bucketId));
      }
      setSpinner(false);
    };
    setRecommendedBucketSize(recommendedBucketSizeCalculation);

    fetchData();
  }, [monthlyExspenses]);

  useEffect(() => {
    // sets the recommended bucket size based on users monthly expenses and selected risk level
    if (bucketId === "1") {
      setRecommendedBucketSizeBasedOnRiskLevel(
        monthlyExspenses * selectedRiskLevel
      );

      // sets the recommended bucket size for bucket 2 based on bucket1 size and bucket2 risklevel
    } else if (firstBucketAmount) {
      setRecommendedBucketSizeBasedOnRiskLevel(
        firstBucketAmount * selectedRiskLevel
      );

      // sets recommended bucket size for bucket2 based on bucket1 size and the recommended risklevel
      setRecommendedBucketSize(firstBucketAmount * recommendedRiskLevel);
    }
  }, [selectedRiskLevel]);

  useEffect(() => {
    // Sets the percentage for how filled a bucket is

    if (targeBucketSize === 0 || actualBucketSize === 0) {
      setPercentageFilled(0);
    } else {
      setPercentageFilled(
        Math.round((100 * actualBucketSize) / targeBucketSize)
      );
    }
  }, [actualBucketSize, targeBucketSize]);

  // toggles the checkbox for more settings and saves it

  const handleCheckboxChange = () => {
    setUseRecomendedSettings(!useRecomendedSettings);
  };

  // button to use bucket size based on recommomendations

  const handleCustomBucketSizeCheckbox = (e: FormEvent) => {
    e.preventDefault();
    if (recommendedBucketSizeBasedOnRiskLevel)
      setTargeBucketSize(recommendedBucketSizeBasedOnRiskLevel);
  };

  // cleares all values for the bucket

  const renderResetButton = (e: FormEvent) => {
    e.preventDefault();

    setBucketName("");
    setUseRecomendedSettings(false);
    setSelectedRiskLevel(1);
    setTargeBucketSize(0);
    setActualBucketSize(0);
    setSoftDeleted(false);
    setMontlySavings(0);
    setInvestForm("");
    setFreetext("");
  };

  // removes the reset bucket container

  const disableResetBucketRender = () => {
    setResetBucket(false);
  };

  // toggles rendered tooltip

  const helpToogle = () => {
    setHelpTooltip(!helpTooltip);
  };

  //
  //
  //

  // Digits formating, adding a space after 3 digits

  const formattedMontlySavings = montlySavings
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedRecommendedBucketSizeBasedOnRiskLevel =
    recommendedBucketSizeBasedOnRiskLevel
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedRecommendedBucketSize = recommendedBucketSize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedActualBucketSize = actualBucketSize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const formattedtargeBucketSize = targeBucketSize
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  //
  //
  //

  // Rendered HTML starts here //////////////////////////////////////////////

  const resetBucketRender = () => {
    // checks if bucket is in use and if reset bucket container should render, if empty it does not render if soft deleted
    if (softDeleted === true) {
      if (
        bucketName === "" &&
        useRecomendedSettings === false &&
        selectedRiskLevel <= 1 &&
        targeBucketSize === 0 &&
        actualBucketSize === 0
      ) {
        return;
      }
      if (
        bucketName !== "" ||
        useRecomendedSettings === true ||
        selectedRiskLevel > 1 ||
        targeBucketSize !== 0 ||
        actualBucketSize !== 0
      ) {
        return (
          <div className="resetBucketconatiner">
            <button
              aria-label="reset bucket container"
              className="disableResetBucketRenderButton"
              onClick={disableResetBucketRender}
            >
              <MdClose aria-hidden="true" className="MdClose" />
            </button>
            <div className="resetBucketConatinerTextConatiner">
              <div className="resetBucketConatinerTextSpacer"></div>
              <p>
                Detta är sedan tidigare en använd hink, vill du nollställa den?{" "}
              </p>
              <div className="resetBucketConatinerQuestionmark">
                <BsQuestionCircleFill
                  aria-label="tooltip questionmark icon"
                  id="resetBucketconatinerTooltip"
                  className="toolTipQuestionmark"
                />
                <Tooltip
                  aria-label="tootltip"
                  style={{ width: "200px" }}
                  anchorId="resetBucketconatinerTooltip"
                  content={`Tidigare hinkar sparas ifall du skulle vilja återkomma till den någon dag, det är bara att nollställa om du vill börja om`}
                  place="top"
                />
              </div>
            </div>
            <button
              aria-label="reset bucket info"
              className="resetValuesButton"
              onClick={renderResetButton}
            >
              Nollställ
            </button>
          </div>
        );
      }
    }
    return;
  };

  // renders tooltips if enabled

  const tooltipBucket = () => {
    if (bucketNumber === 1 && helpTooltip === true) {
      return (
        <p>
          Bufferthinken <br /> Pengarna bör sättas på ett sparkonto med ränta,
          lätta att kunna ta ut vid behov.
        </p>
      );
    }
    if (bucketNumber === 2 && helpTooltip === true) {
      return (
        <p>
          Mellanriskhinken <br />
          Dessa pengar bör få chansen att växa lite, förslagsvis med
          fördelningen 60% Aktier och 40% Räntepapper.
        </p>
      );
    }
    if (bucketNumber === 3 && helpTooltip === true) {
      return (
        <p>
          Högriskhinken <br />
          Här ska pengarna växa! Förslagsvis 100% Aktier
        </p>
      );
    }
    if (bucketNumber === 4 && helpTooltip === true) {
      return (
        <p>
          Lekhinken! <br />
          Här kan du placera alternativa tillgångar, hinken rekommenderas inte
          överstiga 10% av Hink 3
        </p>
      );
    }
  };

  // if checkbox value useRecomendedSettings is true this renders

  const renderBucketSettings = () => {
    if (useRecomendedSettings) {
      return (
        <div className="recommendedSettingsConatiner">
          {bucketNumber === 1 || bucketNumber === 2 ? (
            <div>
              <p>
                Här kan du öka eller sänka hinkens storleksnivå, vi
                rekommenderar att Hink {bucketNumber} bör minst innehålla{": "}
                <strong>
                  {formattedRecommendedBucketSizeBasedOnRiskLevel}kr
                </strong>
              </p>
            </div>
          ) : (
            <p></p>
          )}
          {bucketNumber === 1 ? (
            <div className="recommendedSettingsRangeContainer">
              <BsQuestionCircleFill
                aria-label="tooltip questionmark icon"
                id="recommendedSettingsRangeTooltip"
                className="toolTipQuestionmark"
              />
              <Tooltip
                aria-label="tootltip"
                style={{ width: "200px" }}
                content="Här väljer du hur stor hinken ska vara! 1 - 5 gånger dina månadskostnader. Kom ihåg, en för liten bufferthink kanske inte räcker till när du behöver den som mest!"
                place="top"
                anchorId="recommendedSettingsRangeTooltip"
              />
              <p>Storleksnivå {selectedRiskLevel}</p>
              <input
                aria-label="set bucket size from recommendations"
                type="range"
                min="1"
                max={maxRiskLevel}
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(parseInt(e.target.value))}
              />
              <button onClick={handleCustomBucketSizeCheckbox}>
                Använda valda summan
              </button>
            </div>
          ) : null}

          {bucketNumber === 2 ? (
            <div className="recommendedSettingsRangeContainer">
              <BsQuestionCircleFill
                aria-label="tooltip questionmark icon"
                id="recommendedSettingsRangeTooltip"
                className="toolTipQuestionmark"
              />
              <Tooltip
                aria-label="tootltip"
                style={{ width: "200px" }}
                anchorId="recommendedSettingsRangeTooltip"
                content="Här väljer du själv hur stor hinken ska vara, 1 - 7 gånger Bufferthinkens storlek, ju större hink desto mindre risk. Vi rekommenderar nivå 5."
                place="top"
              />
              <p>Storleksnivå {selectedRiskLevel}</p>
              <input
                aria-label="set bucket size from recommendations"
                type="range"
                min="1"
                max={maxRiskLevel}
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(parseInt(e.target.value))}
              />
              <button onClick={handleCustomBucketSizeCheckbox}>
                Använd valda summan
              </button>
            </div>
          ) : null}

          <div className="bucketRecommendedSettings">
            <p>Månadsspar</p>
            <BsQuestionCircleFill
              aria-label="tooltip questionmark icon"
              id="montlySavingsQuestionmark"
              className="toolTipQuestionmark"
            />
            <Tooltip
              aria-label="tootltip"
              style={{ width: "200px" }}
              anchorId="montlySavingsQuestionmark"
              content={`Här kan du notera vad du ska spara per månad i den här hinken. Det är bara som en minnesanteckning för när du varje månad gör dina insättningar.`}
              place="top"
            />
          </div>

          <div className="inputContainer">
            <div className="inputContainerLeftSpacer"></div>
            <input
              aria-label="montly savings"
              type="text"
              placeholder="månadssparande"
              id="montlySavings"
              inputMode="numeric"
              value={formattedMontlySavings}
              onChange={(e) => {
                if (e.target.value === "") {
                  setMontlySavings(0);
                } else {
                  const parsedValue = parseInt(
                    e.target.value.replace(/\s/g, "")
                  );
                  if (!isNaN(parsedValue)) {
                    setMontlySavings(parsedValue);
                  }
                }
              }}
            />
            <p>kr</p>
          </div>

          <div className="bucketRecommendedSettings">
            <p>Investeringsform</p>
            <BsQuestionCircleFill
              aria-label="tooltip questionmark icon"
              id="investFormQuestionmark"
              className="toolTipQuestionmark"
            />
            <Tooltip
              aria-label="tootltip"
              style={{ width: "200px" }}
              anchorId="investFormQuestionmark"
              content={`Notera vad du sparar i för form, tex sparkonto med 1,5% ränta eller fördelning mellan aktier och räntepapper, tex 60 % Aktier och 40 % Räntepapper. Eller namn på fond, aktie eller bank.`}
              place="top"
            />
          </div>
          <div className="inputContainer">
            <div className="inputContainerLeftSpacer"></div>
            <input
              aria-label="enter savings form"
              type="text"
              placeholder="ex, 100% Aktier"
              id="investForm"
              inputMode="text"
              value={investForm}
              onChange={(e) => {
                setInvestForm(e.target.value);
              }}
            />
            <div className="inputContainerLeftSpacer"></div>
          </div>

          <div className="bucketRecommendedSettings">
            <p>Övriga noteringar</p>
            <BsQuestionCircleFill
              aria-label="tooltip questionmark icon"
              id="freetextQuestionmark"
              className="toolTipQuestionmark"
            />
            <Tooltip
              aria-label="tootltip"
              style={{ width: "200px" }}
              anchorId="freetextQuestionmark"
              content={`Här har du en ruta för anteckningar. psst, du kan även göra den större.`}
              place="top"
            />
          </div>
          <div className="inputContainer">
            <div className="inputContainerLeftSpacer"></div>
            <textarea
              aria-label="freetext for notes"
              id="investForm"
              value={freetext}
              onChange={(e) => {
                setFreetext(e.target.value);
              }}
            />
            <div className="inputContainerLeftSpacer"></div>
          </div>
        </div>
      );
    }
  };

  //
  //
  //

  // Bucket() return here! / HTML render starts here ///////////////////////////////////////////////////////////////////

  return (
    <>
      {spinner ? (
        <div>
          <InfinitySpin aria-hidden="true" width="200" color="#0071D9" />
        </div>
      ) : (
        <div className="bucketWraper">
          <div className="topConainer">
            <div className="emptyBox"></div>

            <div className="middleEmptyBox">
              <h1>Hink {bucketNumber} </h1> {savedStatus}
              <div>
                <button
                  aria-label="open tooltip for this bucket"
                  onClick={helpToogle}
                  className="selectedBucketQuestionmarkButton"
                >
                  <BsQuestionCircleFill
                    aria-label="tooltip questionmark icon"
                    className="selectedBucketQuestionmark"
                  />
                </button>
              </div>
            </div>

            <div className="emptyBox"></div>
          </div>

          <div>
            {helpTooltip ? (
              <div className="helpConatiner">{tooltipBucket()}</div>
            ) : (
              <p></p>
            )}
          </div>
          <div className="bucketContainer">
            {resetBucket ? (
              <div className="resetBucketRenderConatiner">
                {resetBucketRender()}
              </div>
            ) : (
              <p></p>
            )}

            <form className="bucketForm" onSubmit={saveBucket}>
              <div className="customBucketName">
                <p>Namnge din hink</p>

                <div className="inputContainer">
                  <input
                    type="text"
                    placeholder={suggestedBucketName}
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                  />
                </div>
              </div>

              <div className="bucketRecommendedSettings">
                <p>Fler valmöjligheter</p>
                <BsQuestionCircleFill
                  aria-label="tooltip questionmark icon"
                  id="useRecomendedSettingsTooltip"
                  className="toolTipQuestionmark"
                />
                <Tooltip
                  aria-label="tootltip"
                  style={{ width: "200px" }}
                  anchorId="useRecomendedSettingsTooltip"
                  content="Här öppnas en ny ruta där du kan göra fler val."
                  place="top"
                />
                <input
                  aria-label="open more settings"
                  type="checkbox"
                  checked={useRecomendedSettings}
                  onChange={handleCheckboxChange}
                />{" "}
              </div>

              {renderBucketSettings()}

              <div className="bucketAmountConatiner">
                {bucketNumber === 1 || bucketNumber === 2 ? (
                  <div className="recommendedBucketSizeTooltipContainer">
                    <p>Vald storlek </p>

                    <BsQuestionCircleFill
                      aria-label="tooltip questionmark icon"
                      id="recommendedBucketSizeTooltip"
                      className="toolTipQuestionmark"
                    />
                    <Tooltip
                      aria-label="tootltip"
                      style={{ width: "200px" }}
                      anchorId="recommendedBucketSizeTooltip"
                      content={`Här sätter du målstorleken för hinken, när den är fylld fortsätter du på nästa. Baserat på din angivna månadsutgift rekommenderar vi att Hink ${bucketNumber} minst innehåller: ${formattedRecommendedBucketSize}kr`}
                      place="top"
                    />
                  </div>
                ) : null}

                {bucketNumber === 3 ? (
                  <div className="recommendedBucketSizeTooltipContainer">
                    <p>Vald storlek </p>

                    <BsQuestionCircleFill
                      aria-label="tooltip questionmark icon"
                      id="recommendedBucketSizeTooltip"
                      className="toolTipQuestionmark"
                    />
                    <Tooltip
                      aria-label="tootltip"
                      style={{ width: "200px" }}
                      anchorId="recommendedBucketSizeTooltip"
                      content={`Rekommendationen är att fortsätta fylla denna hink när Hink 1 och 2 är fyllda.`}
                      place="top"
                    />
                  </div>
                ) : null}
                {bucketNumber === 4 ? (
                  <div className="recommendedBucketSizeTooltipContainer">
                    <p>Vald storlek </p>

                    <BsQuestionCircleFill
                      aria-label="tooltip questionmark icon"
                      id="recommendedBucketSizeTooltip"
                      className="toolTipQuestionmark"
                    />
                    <Tooltip
                      aria-label="tootltip"
                      style={{ width: "200px" }}
                      anchorId="recommendedBucketSizeTooltip"
                      content={`Tänk att storleken på lekhinken inte bör vara större än 10% av Hink 3.`}
                      place="top"
                    />
                  </div>
                ) : null}

                {/* Thanks ChatGPT <3 */}
                <div className="inputContainer">
                  <div className="inputContainerLeftSpacer"></div>
                  <input
                    aria-label="set bucket size"
                    type="text"
                    required
                    placeholder={recommendedBucketSize.toString() + "kr"}
                    value={formattedtargeBucketSize}
                    inputMode="numeric"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setTargeBucketSize(0);
                      } else {
                        const parsedValue = parseInt(
                          e.target.value.replace(/\s/g, "")
                        );
                        if (!isNaN(parsedValue)) {
                          setTargeBucketSize(parsedValue);
                        }
                      }
                    }}
                  />
                  <p>kr</p>
                </div>

                <div className="recommendedBucketSizeTooltipContainer">
                  <p>Nuvarande innehåll </p>

                  <BsQuestionCircleFill
                    aria-label="tooltip questionmark icon"
                    id="actualBucketSizeTooltip"
                    className="toolTipQuestionmark"
                  />
                  <Tooltip
                    aria-label="tootltip"
                    style={{ width: "200px" }}
                    anchorId="actualBucketSizeTooltip"
                    content={`Fyll i vad du har sparat som ska finnas i den här hinken, är du osäker vad som ska vara i Hink ${bucketNumber}? Läs mer under varje hink i Guiden.`}
                    place="top"
                  />
                </div>

                <div className="inputContainer">
                  <div className="inputContainerLeftSpacer"></div>
                  <input
                    aria-label="set bucket current amount"
                    type="text"
                    required
                    min={0}
                    value={formattedActualBucketSize}
                    inputMode="numeric"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setActualBucketSize(0);
                      } else {
                        const parsedValue = parseInt(
                          e.target.value.replace(/\s/g, "")
                        );
                        if (!isNaN(parsedValue)) {
                          setActualBucketSize(parsedValue);
                        }
                      }
                    }}
                  />
                  <p>kr</p>
                </div>

                <div className="bucketSubmitButtons">
                  <button
                    aria-label="save and go back to dashboard"
                    className="saveButton"
                    type="submit"
                  >
                    Spara
                  </button>
                  <Link to="/dashboard">
                    <button>Avbryt</button>
                  </Link>

                  {inUse ? (
                    <div>
                      {!deleteBucketButton ? (
                        <span aria-label="delete button" id="deleteButtonSpan">
                          <button
                            disabled={disableButton}
                            className="deleteButton"
                            onClick={deleteButton}
                          >
                            Radera
                          </button>
                          {disableButton ? (
                            <Tooltip
                              aria-label="tooltip conatiner for disabled button"
                              style={{ width: "200px" }}
                              anchorId="deleteButtonSpan"
                              content={`Du måste tyvärr radera hinkarna i turordning för att systemet ska fungera.`}
                              place="top"
                            />
                          ) : null}
                        </span>
                      ) : (
                        <div>
                          {inUse ? (
                            <button
                              aria-label="delete button"
                              className="sureToDeleteButton"
                              onClick={deleteBucket}
                            >
                              Säker?
                            </button>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <h1>{savedStatus}</h1>
              </div>
            </form>
          </div>
          <div className="bucketBottomContainer"></div>
        </div>
      )}
    </>
  );
};
export default Bucket;
