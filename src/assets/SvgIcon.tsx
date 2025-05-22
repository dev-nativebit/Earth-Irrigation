import React, { useState } from 'react';
import { PressableProps } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Color, Theme } from '@/style';
import { Pressable } from '@/component';
import Drawer from './svg/Drawer.svg';
import lead from './svg/lead.svg';
import lost from './svg/lost.svg';
import order from './svg/order.svg';
import Appointments from './svg/Appointments.svg';
import threeDot from './svg/threeDot.svg';
import FiledVisit from './svg/FiledVisit.svg';
import user from './svg/user.svg';
import phone from './svg/phone.svg';
import location from './svg/location.svg';
import watch from './svg/wach.svg';
import resetPassword from './svg/resetPassword.svg';
import info from './svg/info.svg';
import attendance from './svg/attendance.svg';
import login from './svg/login.svg';
import menu from './svg/menu.svg';
import send from './svg/send.svg';
import mic from './svg/mic.svg';
import camera from './svg/camera.svg';
import gallery from './svg/gallery.svg';
import noData from './svg/nodata.svg';
import notes from './svg/notes.svg';
import Plus from './svg/Plus.svg';
import closeWhite from './svg/closeWhite.svg';
import visit from './svg/visit.svg';
import Expense from './svg/Expense.svg';
import updateApp from './svg/updateApp.svg';

const DEFAULT_SIZE = 25;

export const svgs = {
	drawer:Drawer,
	lead:lead,
	lost:lost,
	order:order,
	appointments:Appointments,
	threeDot:threeDot,
	filedVisit:FiledVisit,
	user:user,
	phone:phone,
	location:location,
	watch:watch,
	info:info,
	attendance:attendance,
	resetPassword:resetPassword,
	login:login,
	menu:menu,
	send:send,
	mic:mic,
	camera:camera,
	gallery:gallery,
	noData:noData,
	notes:notes,
	plus: Plus,
	closeWhite:closeWhite,
	visit:visit,
	expense:Expense,
	updateApp:updateApp,
};

export type Svg = keyof typeof svgs;

export interface SvgIconProps {
	height?: number | string;
	width?: number | string;
	name: Svg;
	fill?: Color | string;
	stroke?: Color | string;
	onPress?: () => void;
	pressableProps?: PressableProps;
	disabled?: boolean;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
	name,
	fill,
	stroke,
	height = DEFAULT_SIZE,
	width = DEFAULT_SIZE,
	onPress,
	disabled,
	pressableProps,
}: SvgIconProps) => {
	const { colors } = useTheme<Theme>();
	// @ts-ignore
	const fillColor = fill ? colors[fill] ?? fill : undefined;
	// @ts-ignore
	const strokeColor = stroke ? colors[stroke] ?? stroke : undefined;
	const Svg = svgs[name];
	const [isPressed, setIsPressed] = useState<boolean>();

	return (
		<Pressable
			disabled={disabled || !onPress}
			hitSlop={onPress ? { top: 30, bottom: 30, left: 30, right: 30 } : undefined}
			justifyContent="center"
			alignItems="center"
			onPress={onPress}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			style={{ opacity: isPressed ? 0.5 : 1 }}
			{...pressableProps}>
			<Svg
				width={width}
				height={height}
				fill={fillColor}
				stroke={strokeColor}

			/>
		</Pressable>
	);
};
