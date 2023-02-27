import * as React from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Radio, RadioGroup, FormLabel, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import Axios from "axios";
import {useState} from "react";
import { useRouter } from 'next/router'

const Banner = () => {
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    /*
    const [bannerType, setBannerType] = React.useState('');

    const handleChange = (event) => {
      setBannerType(event.target.value);
    };
    */
    const state = {
        isModifyMode: true,
    };

   const write = () => {
        Axios.post("/api/ads/addBanner", {
            title: title,
            dateType: dateType,
            liveType: liveType,
            adsType: adsType,
            etc: etc
           // content: this.state.content,
        })
        .then((res) => {
            router.push({
                  pathname: "/ads" //,
                  /*query: {
                    name: "jinho",
                    age: "26"
                  }
                  */
            })
        })
        .catch((e) => {
            alert('error : '+ e);
            console.error(e);
        });
    };

    const update = () => {
        Axios.post("http://localhost:8000/update", {
            //title: this.state.title,
            //content: this.state.content,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    /*const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    */
    const [inputs, setInputs] = useState({
        title: '',
        etc: '',
        dateType: '',
        liveType: '',
        adsType: '',
     });

    const { title, etc, dateType, liveType, adsType } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };


    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        배너 등록
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    label="제목"
                                    value={title}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="etc"
                                    label="추가내용"
                                    name="etc"
                                    autoComplete="etc"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="adsType" value = {0}>배너타입</InputLabel>
                                    <Select
                                      labelId="adsType"
                                      id="adsType"
                                      name = "adsType"
                                      value={adsType}
                                      onChange={onChange}
                                      autoWidth
                                      label="배너타입"
                                    >
                                      <MenuItem value={1}>실시간 채널</MenuItem>
                                      <MenuItem value={2}>컨텐츠</MenuItem>
                                      <MenuItem value={3}>카테고리</MenuItem>
                                      <MenuItem value={4}>외부URL</MenuItem>
                                      <MenuItem value={5}>앱링크</MenuItem>
                                      <MenuItem value={6}>신청</MenuItem>
                                    </Select>
                                  </FormControl>
                                  <Button variant="contained" >선택</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                      <FormLabel id="dateType">배너 기간 타입</FormLabel>
                                      <RadioGroup
                                        row
                                        aria-labelledby="dateType"
                                        name="dateType"
                                        onChange={onChange}
                                      >
                                        <FormControlLabel value="A" control={<Radio />} label="기간" />
                                        <FormControlLabel value="B" control={<Radio />} label="매일" />
                                      </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="라이브 여부"
                                    control={<Checkbox value="Y" color="primary" />}
                                    name="liveType"
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button variant="contained" onClick={state.isModifyMode ? write : update}>
                                    등록
                                </Button>
                            </Grid>
                            <Grid item>
                            <Link href="/ads">
                                <Button variant="contained" >
                                    목록
                                </Button>
                            </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

export default Banner;