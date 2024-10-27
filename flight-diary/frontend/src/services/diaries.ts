import axios from "axios"
import { baseUrl } from "../constants"
import { DiaryEntry, NewDiaryEntry } from "../types"

/*
const getAll = () => {
        axios
            .get<DiaryEntry[]>(baseUrl)
            .then(response => {
                return (response.data as DiaryEntry[])
            })
            .catch(error => {
                if (error.response) {
                    console.error(
                        "Server responded with error:",
                        error.response.status,
                        error.response.data
                    )
                } else if (error.request) {
                    console.error("No response received:", error.request)
                } else {
                    console.error("Error setting up request:", error.message)
                }
                throw error;
            })
}
*/
const getAll = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
};

const createEntry = (entry: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, entry)
        .then(response => response.data)
}

export default {
    getAll,
    createEntry,
}