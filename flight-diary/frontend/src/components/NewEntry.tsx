import { useState } from "react"
import { Visibility, Weather } from "./../types"
import diaryService from "../services/diaries"

const getCurrentDate = (): string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ("0" + (today.getMonth() + 1)).slice(-2)
    const day = ("0" + today.getDate()).slice(-2)
    return `${year}-${month}-${day}`
}

const NewEntry = () => {
    const [date, setDate] = useState<string>(getCurrentDate())
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState<string>('')

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const entry = {
            date,
            weather,
            visibility,
            comment
        }
        diaryService.createEntry(entry)
        //console.log(entry)
        setDate(getCurrentDate())
        setVisibility(Visibility.Great)
        setWeather(Weather.Sunny)
        setComment('')
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
        setComment(event.target.value)
    }

    return (
        <>
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
                <br/>
                <div>
                    <button type="submit">
                        <strong>Submit</strong>
                    </button>
                </div>
            </form>
        </>
    )
}

export default NewEntry
