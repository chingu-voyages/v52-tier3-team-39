import { Alert } from "@mui/material"

export default function Unauthorized() {
    return (<Alert severity="error">You are unauthorized to view this page</Alert>)
}