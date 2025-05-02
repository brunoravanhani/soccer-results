import { useParams } from "react-router-dom"

export default function TeamStats() {

    const params = useParams();

    return (
    <>
        <h1>Team Stats</h1>
        <p>id: {params.id}</p>
    </>
    )
}