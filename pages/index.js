import { createDate, getTimeStamp } from "../utils/helperFunctions";
const axios = require("axios");
import styles from "../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

export default function Home() {
	let userId = 0;

	const [date, setDate] = useState(new Date("2022", "06", "22"));
	const [time, setTime] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log("date-------------", date, "time---------------", time);
		window.Telegram.WebApp.ready();
		console.log("Before adding userID", data);
		const Obj = Object.assign({ ...data }, { userId: ++userId });
		console.log("After adding userID", Obj);
		Obj.dateTime = getTimeStamp(time);
		console.log("Form data in Obj", Obj);

		axios
			.post("http://localhost:3000/api/saveData", {
				Obj,
			})
			.then((response) => {
				console.log("response from db", response);
			});

		const newData = await JSON.stringify(Obj);
		Telegram.WebApp.MainButton.isVisible = true;

		Telegram.WebApp.MainButton.text = "ILA For Placements";
		Telegram.WebApp.MainButton.show();
		Telegram.WebApp.onEvent("mainButtonClicked", () => {
			Telegram.WebApp.sendData(newData);
		});
	};
	return (
		<div>
			<Script src="https://telegram.org/js/telegram-web-app.js" />

			<form
				method="post"
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
			>
				<Box className={styles.formgroup}>
					<TextField
						id="outlined-basic"
						name="name"
						label="Enter your name"
						variant="outlined"
						{...register("name", { required: true })}
						error={errors.name ? true : false}
					/>
				</Box>
				<Box className={styles.formgroup}>
					<TextField
						id="outlined-basic"
						name="email"
						label="Enter your Email"
						variant="outlined"
						{...register("email", {
							required: true,
							pattern: {
								value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								message: "Enter valid email address",
							},
						})}
						error={errors.email ? true : false}
					/>
				</Box>
				<Box className={styles.formgroup}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							name="date"
							value={date}
							error={errors.date}
							label="Date"
							onChange={(newValue) => {
								console.log(newValue);
								setDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
				<Box className={styles.formgroup}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<TimePicker
							label="Select Time"
							value={time}
							onChange={(newValue) => {
								setTime(newValue);
								console.log(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
				<Box className={styles.formgroup}>
					<Button
						type="submit"
						name="submit"
						value="submit"
						variant="contained"
					>
						Submit
					</Button>
				</Box>
			</form>
		</div>
	);
}
