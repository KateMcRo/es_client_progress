import React, { useState } from "react";
import ReactDOM from "react-dom";
import cntl from "cntl";
import Button from "./stories/Components/Button/Button";
import CollapsibleSection from "./stories/Components/CollapsibleSection/CollapsibleSection";
import Input from "./stories/Components/Input/Input";
import Dropdown from "./stories/Components/Dropdown/Dropdown";
import ProgressTracker from "./stories/Components/ProgressTracker/ProgressTracker";
import NavBar from "./stories/Components/NavBar/NavBar";

const containerCN = cntl`
  mt-3
  p-3
`;
const container2 = cntl`
  mt-3
  p-3
  border-b
  pb-6
`;

const App = () => {
  /*
  Mocking API response for user data that looks like 
  {
    username: "",
    email: "",
    avatar: { image: "https://someimgurl.com", initials: "KR" }
  }
  I would use state to track this API response
  */
  const [user] = useState({ avatar: { image: "", initials: "KR" } });
  const [companyName, setCompanyName] = useState(null);
  const [eSpaceName, setESpaceName] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [suite, setSuite] = useState("");
  const [country, setCountry] = useState(null);
  const [postal, setPostal] = useState("");

  const emailFormat = (email) => {
    const regex = /^[^s@]+@[^s@]+.[^s@]+$/;
    return regex.test(email);
  };

  const phoneFormat = (phone) => {
    const regex = /^\+?1?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone);
  };

  const logSave = () => {
    const payload = {
      eSpaceName,
      companyName: companyName?.value,
      subscription: subscription?.value,
      owner: {
        name: ownerName,
        phone: ownerPhone,
        email: ownerEmail,
      },
      location: {
        street: address,
        suite,
        city,
        country: country?.value,
        postalCode: postal,
      },
    };
    /* I understand error handling needs to happen before data is sent to the server. Due to time constraints, I did not include all potential edge cases. */
    if (payload?.eSpaceName.length <= 0) {
      console.warn("Field can not be blank.");
    }
    console.log(payload);
  };

  return (
    <div className="bg-black h-full w-full flex flex-col overflow-auto">
      <NavBar avatar={user.avatar} />
      <div className="h-full w-full flex flex-col overflow-auto">
        <div className="p-10 w-2/3">
          <div className={containerCN}>
            <p>Add New Client</p>
            <ProgressTracker
              steps={["Client Info", "Logo", "Branding", "App Store"]}
            />
          </div>
          <div className={container2}>
            <CollapsibleSection title="Overview">
              <div className="grid grid-cols-2 gap-8">
                <Dropdown
                  label="Company Name"
                  options={[
                    {
                      label: "REIS Contracting, INC",
                      value: "REIS Contracting, INC",
                    },
                    {
                      label: "Michael Scott Contracting Co.",
                      value: "Michael Scott Contracting Co.",
                    },
                  ]}
                  onChange={(value) => setCompanyName(value)}
                  value={companyName}
                  isClearable={false}
                />
                <Input
                  label="eSpace Name"
                  isRequired={eSpaceName.length < 1}
                  onChange={(value) => setESpaceName(value)}
                  value={eSpaceName}
                  disableClear
                />
                <Dropdown
                  label="Subscription*"
                  options={[
                    {
                      label: "Elite",
                      value: "Elite",
                    },
                    {
                      label: "Basic",
                      value: "Basic",
                    },
                  ]}
                  onChange={(value) => setSubscription(value)}
                  value={subscription}
                  isClearable={false}
                />
              </div>
            </CollapsibleSection>
          </div>
          <div className={container2}>
            <CollapsibleSection title="Owner Information">
              <div className="grid grid-cols-2 gap-8">
                <Input
                  label="Primary Owner"
                  placeholder="Name..."
                  isRequired={ownerName.length < 1}
                  onChange={(value) => setOwnerName(value)}
                  value={ownerName}
                  disableClear
                />
                <Input
                  label="Primanry Owner Email"
                  placeholder="Email..."
                  type="email"
                  isRequired={!emailFormat(ownerEmail)}
                  onChange={(value) => setOwnerEmail(value)}
                  value={ownerEmail}
                  disableClear
                />
                <Input
                  label="Primary Owner Phone"
                  placeholder="Phone..."
                  type="tel"
                  isRequired={!phoneFormat(ownerPhone)}
                  onChange={(value) => setOwnerPhone(value)}
                  value={ownerPhone}
                  disableClear
                />
              </div>
            </CollapsibleSection>
          </div>
          <div className={containerCN}>
            <CollapsibleSection title="Location Information">
              <div className="grid grid-cols-2 gap-8">
                <Input
                  label="Street Address"
                  placeholder="Address..."
                  isRequired={address.length < 1}
                  onChange={(value) => setAddress(value)}
                  value={address}
                  disableClear
                />
                <Input
                  label="City"
                  placeholder="City..."
                  isRequired={city.length < 1}
                  onChange={(value) => setCity(value)}
                  value={city}
                  disableClear
                />
                <Input
                  label="Suite/Unit"
                  placeholder="Suite..."
                  onChange={(value) => setSuite(value)}
                  value={suite}
                  disableClear
                />
                <Dropdown
                  label="Country"
                  options={[
                    {
                      label: "United States",
                      value: "United States",
                    },
                    {
                      label: "Disjointed States",
                      value: "Disjointed States",
                    },
                  ]}
                  onChange={(value) => setCountry(value)}
                  value={country}
                  isClearable={false}
                />
                <Input
                  label="Postal Code"
                  placeholder="City..."
                  isRequired={postal.length < 5}
                  onChange={(value) => setPostal(value)}
                  value={postal}
                  disableClear
                />
              </div>
            </CollapsibleSection>
          </div>
          <Button title="Save" onClick={logSave} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
