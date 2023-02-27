import * as React from 'react';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';

const columns = [
    { id: 'no', label: '번호', minWidth: 30, align: 'center' },
    { id: 'title', label: '제목', minWidth: 100, align: 'center' },
    { id: 'image', label: '이미지', minWidth: 50, align: 'center', format: 'image' },
    { id: 'bnType', label: '배너타입', minWidth: 50, align: 'center' },
    { id: 'bnDateType', label: '기간타입', minWidth: 50, align: 'center'},
    { id: 'liveYn', label: '라이브여부', minWidth: 50, align: 'center'},
];

function createData(no, title, image, bnType, bnDateType, liveYn) {

    return { no, title, image, bnType, bnDateType, liveYn };
}



export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:3000/api/ads')

  if (res.ok) {
    const data = await res.json();

    return{
        props: {data},
      };
  } else {
    return {
      props: {}
    }
  }
}

export default function Banner({data}) {
    const rows = [] ;
    data.forEach((item) => rows.push(createData(item.ads_no, item.title, "default_image.png", item.ads_type,"기간", item.live_yn)))

    const router = useRouter();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format == 'image'
                                                        ? <Paper sx={{ width: '50px', overflow: 'hidden', display: 'inline-block' }}>
                                                            <img style={{
                                                                display:'block',
                                                                width:'100%',
                                                                height:'100%'
                                                            }} src={`/image/${value}`} />
                                                    </Paper>
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Stack direction="row" justifyContent="end">
                <Link href="/ads/addBanner">
                    <Button variant="contained">등록하기</Button>
                </Link>
            </Stack>
        </Paper>
    );
}