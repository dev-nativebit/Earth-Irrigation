import * as DropdownMenu from 'zeego/dropdown-menu';
import React from 'react'
import {Image} from "@/component/Image";
import {Images} from "@/assets";
import {SvgIcon} from "@/assets/SvgIcon";
import {DeviceHelper} from "@/helper";
export type Props = {
    items: Array<{
        key: string;
        title: string;
        icon: string;
        iconAndroid?: string;
    }>;
    onSelect: (key: string) => void;
};

export const DropDownMenu:React.FC<Props> = ({onSelect,items}:Props) =>{

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <SvgIcon
                    name={'threeDot'}
                    height={DeviceHelper.calculateWidthRatio(18)}
                    width={DeviceHelper.calculateWidthRatio(18)}
                    fill={'primary'}
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>

                <DropdownMenu.Group>
                    {items.map((item) => (
                        <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
                            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
                            <DropdownMenu.ItemIcon
                                ios={{
                                    name: item.icon,
                                    pointSize: 18,
                                }}
                                androidIconName={item.iconAndroid}
                             />
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Group>

           </DropdownMenu.Content>

        </DropdownMenu.Root>
    )
}
