import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Layout } from "../../../Layout";
import { InputScreen } from "./Editor/InputScreen";
import { LogScreen } from "./Editor/LogScreen";

export function Editor() {
    return <Layout>
        <Grid container spacing={2}>
            <Grid xs={6}><InputScreen /></Grid>
            <Grid xs={6}><LogScreen /></Grid>
        </Grid>
    </Layout>
}

