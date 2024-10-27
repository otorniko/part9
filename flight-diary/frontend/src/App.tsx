import { useEffect, useState } from "react"
import { DiaryEntry, Visibility, Weather } from "./types"
import List from "./components/List"
// import NewEntry from "./components/NewEntry";
import diaryService from "./services/diaries"
import { getCurrentDate } from "./utils"

const App = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([])
    const [date, setDate] = useState<string>(getCurrentDate())
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState<string>("")

    useEffect(() => {
        diaryService.getAll().then(data => {
            setEntries(data)
        })
    }, [])

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const entry = {
            date,
            weather,
            visibility,
            comment,
        }
        diaryService.createEntry(entry).then(data => setEntries(entries.concat(data)))
        //console.log(entry)
        setDate(getCurrentDate())
        setVisibility(Visibility.Great)
        setWeather(Weather.Sunny)
        setComment("")
    }
    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }
    const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value as Weather)
    }
    const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value as Visibility)
    }
    const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value.trim())
    }

    return (
        <div>
            <h1>Ilari's Flight Diary</h1>
            <h2>Add new entry:</h2>
            <form onSubmit={addEntry}>
                <div>
                    <label>
                        <strong>Date:</strong>
                        <br />
                        <input
                            type="date"
                            name="date"
                            value={date}
                            max={getCurrentDate()}
                            onChange={onDateChange}
                        />
                    </label>
                </div>
                <br />
                <div>
                    <strong>Weather:</strong>
                    <br />
                    {Object.values(Weather).map(w => (
                        <label key={w}>
                            <input
                                type="radio"
                                value={w}
                                checked={weather === w}
                                onChange={onWeatherChange}
                            />
                            {w}
                        </label>
                    ))}
                </div>
                <br />
                <div>
                    <strong>Visibility:</strong>
                    <br />
                    {Object.values(Visibility).map(v => (
                        <label key={v}>
                            <input
                                type="radio"
                                value={v}
                                checked={visibility === v}
                                onChange={onVisibilityChange}
                            />
                            {v}
                        </label>
                    ))}
                </div>
                <br />
                <div>
                    <strong>Comment:</strong>
                    <br />
                    <label>
                        <input
                            type="text"
                            value={comment}
                            onChange={onCommentChange}
                        />
                    </label>
                </div>
                <br />
                <div>
                    <button type="submit">
                        <strong>Submit</strong>
                    </button>
                </div>
            </form>
            <h2>Diary entries:</h2>
            <List entries={entries} />
        </div>
    )
}

export default App
