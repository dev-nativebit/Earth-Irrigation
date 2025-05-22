import { Result } from './Result';
import Toast from 'react-native-toast-message';
import { DeviceHelper } from '@/helper';

export async function logout() {

}

export function getDefaultError<T>(error?: any, caller?: string): Result<T> {
	if (error) {
		if (__DEV__) {
			// eslint-disable-next-line no-console
			console.log(`API Error::${caller}`, error);
		}
		if (error === 'unauthorised') {
			logout();
		}
	}
	return Result.fail<T>('Something went wrong');
}

export async function resolver<T>(
	promise: Promise<T>,
): Promise<[T | null, any]> {
	try {
		const value = await promise;
		return [value as T, null];
	} catch (error) {
		return [null, error];
	}
}

export const showErrorMessage = (message?: string) => {
	Toast.show({
		type: 'error', // or 'error', 'info', 'warning'
		position: 'top',
		text1: 'Error',
		text2: message ?? 'Something went wrong',
		visibilityTime: 3000, // 3 seconds
		autoHide: true,
		topOffset: 30,
		bottomOffset: 40,
	});
};

export const showSuccessMessage = (message?: string) => {
	Toast.show({
		type: 'success', // or 'error', 'info', 'warning'
		position: 'bottom',
		text2: message ?? '',
		visibilityTime: 3000, // 3 seconds
		autoHide: true,
		bottomOffset:DeviceHelper.calculateHeightRatio(100),
	});
};
export const getFormDataOfApiInterface = () => {};
