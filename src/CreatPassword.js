import React, { useCallback, useState } from "react";

export function CreatePassword() {

    //useState to reflect the changes on the UI
    const [length, setLength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [special, setSpecial] = useState(false);
    const [numeric, setNumeric] = useState(false);
    const [password, setPassword] = useState("");


    //useCallback  #hook is used to stop the rerendering of the functions 
    const generatePassword = useCallback(() => {
        let pass = "";
        let str = "";

        if (!length || length < 8 || length > 30) {
            alert("Enter the password length in between 8 to 30");
            return;
        } else if (!uppercase && !lowercase && !special && !numeric) {
            alert("Please check at least one checkbox");
            return;
        }

        if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) str += "abcdefghijklmnopqrstuvwxyz";
        if (special) str += "!@#$%^&*()_+=-{}|[]\\:;\"'<>,.?/";
        if (numeric) str += "0123456789";


        // Ensure at least one special character and one numeric value
        if (special && !str.includes("!@#$%^&*()_+=-{}|[]\\:;\"'<>,.?/")) {
            alert("Please include at least one special character");
            return;
        }
        if (numeric && !str.includes("0123456789")) {
            alert("Please include at least one numeric value");
            return;
        }


        // Ensure at least one special character and one numeric value in the generated password
        let hasSpecial = false;
        let hasNumeric = false;

        for (let i = 0; i < length; i++) { //1, 2, 3
            let char = Math.floor(Math.random() * str.length); //12
            pass += str.charAt(char);  // u@9Abc  de
            if (special && !hasSpecial && str.charAt(char).includes("!@#$%^&*()_+=-{}|[]\\:;\"'<>,.?/")) {
                hasSpecial = true;
            }
            if (numeric && !hasNumeric && str.charAt(char).includes("0123456789")) {
                hasNumeric = true;
            }
        }

        if (special && !hasSpecial) {
            // Replace a random character with a special character
            let specialChar = "!@#$%^&*()_+=-{}|[]\\:;\"'<>,.?/";
            let randomIndex = Math.floor(Math.random() * pass.length);  //4
            pass = pass.slice(0, randomIndex) + specialChar.charAt(Math.floor(Math.random() * specialChar.length)) + pass.slice(randomIndex + 1);
        }                       //u@9A#cde

        if (numeric && !hasNumeric) {
            // Replace a random character with a numeric value
            let numericChar = "0123456789";
            let randomIndex = Math.floor(Math.random() * pass.length);
            // console.log(randomIndex)
            pass = pass.slice(0, randomIndex) + numericChar.charAt(Math.floor(Math.random() * numericChar.length)) + pass.slice(randomIndex + 1);
        }

        setPassword(pass);
    }, [length, uppercase, uppercase, special, numeric, password])


    //to copy the password
    const copyPassword = useCallback(() => {
        window.navigator.clipboard.writeText(password)
    }, [password]);


    return (
        <>
            <h1>Generate Your Password</h1>
            <p>Select Password length (8-30 characters)</p>
            <input
                type="text"
                placeholder="Enter the length"
                style={{ width: "10rem" }}
                value={length}
                onChange={(e) => setLength(e.target.value)}
            />
            <h2>Customize your Password by these Checkboxes</h2>
            <div>
                <div>
                    <label htmlFor="uppercase">Include Upper-case Alphabet</label>
                    <input
                        type="checkbox"
                        id="uppercase"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                    />
                </div>
                <div>
                    <label htmlFor="lowercase">Include Lower-case Alphabet</label>
                    <input
                        type="checkbox"
                        id="lowercase"
                        checked={lowercase}
                        onChange={(e) => setLowercase(e.target.checked)}
                    />
                </div>
                <div>
                    <label htmlFor="special">Include Special Character</label>
                    <input
                        type="checkbox"
                        id="special"
                        checked={special}
                        onChange={(e) => setSpecial(e.target.checked)}
                    />
                </div>
                <div>
                    <label htmlFor="numeric">Include Numeric Value</label>
                    <input
                        type="checkbox"
                        id="numeric"
                        checked={numeric}
                        onChange={(e) => setNumeric(e.target.checked)}
                    />
                </div>
            </div>
            <button
                style={{
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    marginTop: "1rem",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1.5rem"
                }}
                onClick={generatePassword}
            >
                Get the Password
            </button>
            <br /><br />
            <input value={password} readOnly />
            <button
                onClick={copyPassword}
            >Copy</button>
        </>
    );
}