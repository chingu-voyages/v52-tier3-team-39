import Grid from "./Grid";

export default function ReservationTable({ appointments }) {
    return <Grid rows={appointments} />;
}
