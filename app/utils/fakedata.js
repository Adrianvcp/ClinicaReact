import axios from "axios";

export function getData() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
        });
}