import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5102";

export function addEvent(event) {
    return axios.post('/Event', event)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}
export async function getEvents(userId) {
    console.log(userId);
    return await axios.get(`/Event/${userId}` )
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
            // Return empty response structure to prevent errors
            return {
                data: {
                    value: []
                }
            };
        });

    }
    export function deleteEvent(eventId) {
    return axios.delete(`/Event/${eventId}`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}