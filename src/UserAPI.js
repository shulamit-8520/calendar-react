import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// axios.defaults.baseURL = "http://localhost:5102";

export function register(user) {
    const navigate = useNavigate();
    axios.post('http://localhost:5102/User/Register', { user })


        .then(function (response) {
            console.log(response);
            navigate("/Show", { replace: false });

        })
        .catch(function (error) {
            console.log(error);
        });
}

// export function login(userid,psw) {
//     try {
//         axios.post('http://localhost:5102/User/Login', { userid, psw })
//             .then((response) => {
//                 if (response.data.statusCode === 200)
//                     console.log(response);
//             })
//     }
//     catch (error) {
//         console.log(error);
//     }

// }