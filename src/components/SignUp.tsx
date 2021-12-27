import { useState } from 'react';
// import {
//   InputLabel, makeStyles, MenuItem, Select,
// } from '@mui/material';
// // eslint-disable-next-line import/no-duplicates
// import TextField from '@mui/styled-engine-sc';
// // eslint-disable-next-line import/no-duplicates
// import Button from '@mui/styled-engine-sc';
import userServices from '../services/users';
import Nav from './Nav';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: theme.spacing(2),

//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '300px',
//     },
//     '& .MuiButtonBase-root': {
//       margin: theme.spacing(2),
//     },
//   },
// }));

export default function SignUp() {
  // States for registration
  // const classes = useStyles();
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // // States for checking the errors
  // const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState(false);

  // // Handling the name change
  // const handleName = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setName(e.target.value);
  //   setSubmitted(false);
  // };

  // // Handling the email change
  // const handleEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setEmail(e.target.value);
  //   setSubmitted(false);
  // };

  // // Handling the password change
  // const handlePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
  //   setPassword(e.target.value);
  //   setSubmitted(false);
  // };

  // // Handling the form submission
  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   if (name === '' || email === '' || password === '') {
  //     setError(true);
  //   } else {
  //     setSubmitted(true);
  //     setError(false);
  //   }
  // };

  // // Showing success message
  // const successMessage = () => (
  //     <div
  //       className="success"
  //       style={{
  //         display: submitted ? '' : 'none',
  //       }}>
  //       <h1>User {name} successfully registered!!</h1>
  //     </div>
  // );

  // // Showing error message if error is true
  // const errorMessage = () => (
  //     <div
  //       className="error"
  //       style={{
  //         display: error ? '' : 'none',
  //       }}>
  //       <h1>Please enter all the fields</h1>
  //     </div>
  // );
  // const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sourceLang, setSourcelang] = useState('');
  const [targetLang, setTargetlang] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const user = {
      username: firstName,
      email,
      password,
      sourceLang,
      targetLang,
    };
    console.log(user);
    const addUserResponse = await userServices.addUser(user);
    console.log(addUserResponse);

    // handleClose();
  };

  // return (
  //   <div>
  //   <Nav />
  //   <div>
  //   <form className={'user-signup'} onSubmit={handleSubmit}>
  //     <TextField
  //       label="First Name"
  //       variant="filled"
  //       required
  //       value={firstName}
  //       onChange={(e) => setFirstName(e.target.value)}
  //     />
  //     <TextField
  //       label="Email"
  //       variant="filled"
  //       type="email"
  //       required
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <TextField
  //       label="Password"
  //       variant="filled"
  //       type="password"
  //       required
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <InputLabel id="select-sourceLang">I know
  //       <Select
  //         labelId="select-label-sourceLang"
  //         id="select-sourceLang"
  //         value={sourceLang}
  //         label="I know"
  //         // onChange={(e) => setSourcelang(e.target.value)}
  //       >
  //         <MenuItem value={'en'}>English</MenuItem>
  //         <MenuItem value={'fr'}>French</MenuItem>
  //         <MenuItem value={'de'}>German</MenuItem>
  //       </Select>
  //     </InputLabel>
  //     <InputLabel id="select-targetLang">I want to learn
  //       <Select
  //         labelId="select-label-targetLang"
  //         id="select-targetLang"
  //         value={targetLang}
  //         label="I want to learn"
  //         // onChange={(e) => setTargetlang(e.target.value)}
  //       >
  //         <MenuItem value={'en'}>English</MenuItem>
  //         <MenuItem value={'fr'}>French</MenuItem>
  //         <MenuItem value={'de'}>German</MenuItem>
  //       </Select>
  //       </InputLabel>
  //       {/* </FormControl> */}
  //        {/* <Button variant="contained" onClick={handleClose}>
  //         Cancel
  //       </Button> */}
  //       <Button type="submit" variant="contained" color="primary">
  //         Signup
  //       </Button>
  //     <div>
  //     </div>
  //   </form>
  //   </div>
  // </div>
  // );

  return (
    <div>
     <Nav />
     <div>
      <div className="form">
        <div>
          <h1>User Registration</h1>
        </div>

         {/* Calling the methods */}
         {/* <div className="messages">
           {errorMessage()}
           {successMessage()}
         </div> */}

         <form>
           {/* Labels and inputs for form data */}
           <label className="label">Name</label>
           <input onChange={(e) => setFirstName(e.target.value)} className="input" value={firstName} type="text" />
           <label className="label">Email</label>
           <input onChange={(e) => setEmail(e.target.value)} className="input"
            value={email} type="email" />

           <label className="label">Password</label>
           <input onChange={(e) => setPassword(e.target.value)} className="input"
            value={password} type="password" />
          <label htmlFor="sourceLang">I know</label>
          <select name="sourceLang" id="sourceLang" onChange={(e) => setSourcelang(e.target.value)} value={sourceLang}>
            <option value="select">Select</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>

          <label htmlFor="targetLang">I want to learn</label>
          <select name="targetLang" id="targetLang" onChange={(e) => setTargetlang(e.target.value)} value={targetLang}>
            <option value="select">Select</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>

           <button onClick={handleSubmit} className="btn" type="submit">
             Submit
           </button>
         </form>
       </div>
      </div>
     </div>
  );
}
