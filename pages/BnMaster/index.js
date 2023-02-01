import * as React from 'react';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function BnMaster() {
    const router = useRouter();

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
            {router.pathname}
            <Stack direction="row" justifyContent="end">
                <Button variant="contained">등록하기</Button>
            </Stack>
        </Paper>
    );
}