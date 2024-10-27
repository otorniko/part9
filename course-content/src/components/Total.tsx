interface TotalProps {
    totalExercises: number;
};

const Total = (props: TotalProps) => (
    <h4 style={{ lineHeight: 0.75, marginTop: 0, marginBottom: 5 }}>
        Total number of exercises: {props.totalExercises}{" "}
    </h4>
)

export default Total;