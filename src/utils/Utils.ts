import { I18nManager, Linking, Platform } from 'react-native';
import moment from 'moment';
import { DeviceHelper } from '@/helper/DeviceHelper';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Toast from "react-native-toast-message";
import {promptForEnableLocationIfNeeded} from "react-native-android-location-enabler";
import {showErrorMessage} from "@/core";
import {logger} from "@/logger/Logger";
import Share from "react-native-share";
import RNFS from "react-native-fs";

class Utils {
	get language(): string {
		return I18nManager.isRTL ? 'english' : 'arabic';
	}

	get device(): string {
		return DeviceHelper.ios() ? '2' : '1';
	}

	convertMinsToTime(mins: number): string {
		const hours = Math.floor(mins / 60);
		let minutes: number = mins % 60;
		// @ts-ignore
		minutes = minutes < 10 ? '0' + minutes : minutes;
		if (hours > 0) {
			return `${hours} hrs:${minutes} mins`;
		} else {
			return `${minutes} mins`;
		}
	}

	redirectToGoogleMap(branch_lat_long: string, address: string) {
		if (branch_lat_long) {
			const latLongArray = branch_lat_long.split(',');
			const lat = latLongArray[0];
			const lng = latLongArray[1];
			const scheme = Platform.select({
				ios: 'maps:0,0?q=',
				android: 'geo:0,0?q=',
			});
			const latLng = `${lat},${lng}`;
			const label = address;
			const url = Platform.select({
				ios: `${scheme}${label}@${latLng}`,
				android: `${scheme}${latLng}(${label})`,
			});
			if (url) {
				Linking.openURL(url);
			}
		}
	}

	redirectToGoogleMapUsingLink(url: string) {
		if (url) {
			Linking.openURL(url);
		}
	}

	branchImageHeight() {
		return DeviceHelper.calculateHeightRatio(
			(DeviceHelper.width() * 147) / 277,
		);
	}

	checkAccess(): boolean {
		// if (!accountStore.isLogin()) {
		//   navigate({screenName: Route.Login, params: {skip: true}});
		//   return false;
		// }
		return true;
	}

	emailRegex(): RegExp {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
	}
	panNumberRegex(): RegExp {
		return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
	}

	phoneNoRegexNoSpace(): RegExp {
		return /^[0-9]{10,}$/;
	}

	vehicleNumberRegex(): RegExp {
		// return /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
		return /^(?=.*[A-Za-z0-9-])[-A-Za-z0-9]{8,15}$/;
	}
	validateOnlyNumeric(): RegExp {
		// return /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
		return /^(0|[1-9][0-9]*)$/;
	}
	validateOnlyUserName(): RegExp {
		return /^(?![0-9]*$)(?![!@#$%^&*(),.?":{}|<>])[\p{Script=Devanagari}|\p{Script=Gujarati}|\p{Script=Tamil}|\p{Script=Latin}|\p{Script=Gurmukhi} ]{3,100}$/gu;
	}
	validateOnlySellingPrice(): RegExp {
		return /^(?!0$|[1-9]$)[1-9][0-9]{4,6}$/;
	}
	validateOnlyHowDidYouSell(): RegExp {
		return /^(?![0-9]*$)(?![!@#$%^&*(),.?":{}|<>])[\p{Script=Devanagari}|\p{Script=Gujarati}|\p{Script=Tamil}|\p{Script=Latin}|\p{Script=Gurmukhi} ]{3,500}$/gu;
	}
	validateOnlyHP(): RegExp {
		return /^(?!0|0\.0*$|0*[1-9]\d*\.0*$|0*\.0*[1-9]\d*$)([1-9]|[1-9]\d|1\d\d|200)$/;
	}
	validateOnlyTotalHours(): RegExp {
		return /^(?!0|0\.0*$|0*[1-9]\d*\.0*$|0*\.0*[1-9]\d*$)([1-9]\d{0,4}|100000)$/;
	}

	utcToLocal(
		date: string,
		dateFormat: string = 'YYYY-MM-DD HH:mm:ss',
		requiredDateFormat: string = 'DD MMM, YYYY hh:mm a',
	): string {
		const dateUtc = moment.utc(date).format(dateFormat);
		const stillUtc = moment.utc(dateUtc).toDate();
		return stillUtc.toString()
		// return moment(stillUtc).local().format(requiredDateFormat);
	}

	dateAndTimeFormat(date: string): string {
		return moment(date).local().format('DD MMM, YYYY hh:mm a');
	}

	formatTimeSlot(data: string) {
		return moment(data, 'hh:mm A').format('hh:mm A');
	}

	// checkStatusApp() {
	//   if (BASEURL().indexOf('192') > -1) {
	//     return 'Local';
	//   } else if (BASEURL().indexOf('Staging') > -1) {
	//     return 'Staging';
	//   } else {
	//     return 'Live';
	//   }
	// }
	navigateAccordingToAccessibility() {
		// if (accountStore.isLogin()) {
		// } else {
		//   navigate({screenName: Route.Login});
		// }
	}

	generateRandom32BitInteger(): number {
		// Generate a random integer between -2^31 and 2^31 - 1
		return Math.floor(Math.random() * 4294967296) - 2147483648;
	}

	requestNotificationPermission = async () => {
		return request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
	};

	checkNotificationPermission = async () => {
		return check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
	};


	handleEnabledPressed = async () => {
		if (Platform.OS === 'android') {
			try {
				const enableResult = await promptForEnableLocationIfNeeded();
				logger.info('enableResult', enableResult);
				return true;
				// The user has accepted to enable the location services
				// data can be :
				//  - "already-enabled" if the location services has been already enabled
				//  - "enabled" if user has clicked on OK button in the popup
			} catch (error: unknown) {
				if (error instanceof Error) {
					// console.error(error.message);
					showErrorMessage('Location Compulsory');
					return false
					// The user has not accepted to enable the location services or something went wrong during the process
					// "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
					// codes :
					//  - ERR00 : The user has clicked on Cancel button in the popup
					//  - ERR01 : If the Settings change are unavailable
					//  - ERR02 : If the popup has failed to open
					//  - ERR03 : Internal error
				}
			}
		}
	}

	shareReportItinerantPlant = async (filePath:string) => {
		try {

			await Share.open({
				title: 'Awesome Contents',
				url: `file:///${filePath}`,
				message: 'Please check this out.',
			});
		} catch (err) {
			console.log(err);
		}
	};

	actualDownload = (fileUrl:string,orderNo:string) => {
		// @ts-ignore
		const fileName = orderNo.replaceAll('/', '_');
		const timestamp = Date.now()
		const filePath = RNFS.DownloadDirectoryPath + `/${fileName}${timestamp}.pdf`;
		RNFS.downloadFile({
			fromUrl: fileUrl,
			toFile: filePath,
			background: true, // Enable downloading in the background (iOS only)
			discretionary: true, // Allow the OS to control the timing and speed (iOS only)
			progress: (res) => {
				// Handle download progress updates if needed
				const progress = (res.bytesWritten / res.contentLength) * 100;
			},
		})
			.promise.then(async (response) => {
			await this.shareReportItinerantPlant(filePath)
			console.log('File downloaded!', filePath);
		})
			.catch((err) => {
				console.log('Download error:', err);
			});
	};

}

export const utils = new Utils();
