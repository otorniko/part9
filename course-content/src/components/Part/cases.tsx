import {
    CoursePartBackground,
    CoursePartBasic,
    CoursePartGroup,
    CoursePartSpecial,
} from "../../types"
import styles from "./styles"

export const Basic = (props: CoursePartBasic) => {
    return (
        <>
            <h3 style={styles.header}>
                {props.name}: {props.exerciseCount}
            </h3>
            <h4 style={styles.subHeader}>Description:</h4>
            <p style={styles.paragraph}>{props.description}</p>
        </>
    )
}

export const Group = (props: CoursePartGroup) => {
    return (
        <>
            <h3 style={styles.header}>
                {props.name}: {props.exerciseCount}
            </h3>
            <h4 style={styles.subHeader}>Projects:</h4>
            <p style={styles.paragraph}>{props.groupProjectCount}</p>
        </>
    )
}

export const Background = (props: CoursePartBackground) => {
    return (
        <>
            <h3 style={styles.header}>
                {props.name}: {props.exerciseCount}
            </h3>
            <h4 style={styles.subHeader}>Description:</h4>
            <p style={styles.paragraph}>{props.description}</p>
            <h4 style={styles.subHeader}>Material:</h4>
            <p style={styles.paragraph}>{props.backgroundMaterial}</p>
        </>
    )
}

export const Special = (props: CoursePartSpecial) => {
    return (
        <>
            <h3 style={styles.header}>
                {props.name}: {props.exerciseCount}
            </h3>
            <h4 style={styles.subHeader}>Description:</h4>
            <p style={styles.paragraph}>{props.description}</p>
            <h4 style={styles.subHeader}>Requirements:</h4>
            {props.requirements.map((requirement, index) => (
                <li
                    key={index}
                    style={styles.paragraph}
                >
                    {requirement}
                </li>
            ))}
        </>
    )
}
