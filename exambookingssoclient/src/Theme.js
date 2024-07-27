import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	spacing : 2,
	breakpoints: {
		keys: [ "xs", "sm", "md", "lg", "xl" ],
		values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
	},
	direction: "ltr",
	palette: {
		primary: {
			main: "#009688",
		},
		secondary: {
			main: "#333",
		},
	},
});

export default theme