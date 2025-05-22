
import {Model} from "@/model/core";
import {ForceUpdateDto} from "@/dtos";
import DeviceInfo from "react-native-device-info";


export class ForceUpdateModel extends Model<ForceUpdateDto> {
    constructor(dto: ForceUpdateDto) {
        super(dto);
    }
    get id(): string{
        return this.dto?.id ?? ''
    }
    get version_code(): string{
        return this.dto?.version_code ?? '0'
    }
    get force_update(): string{
        return this.dto?.force_update ?? ''
    }
    get device_type(): string{
        return this.dto?.device_type ?? ''
    }
    get created_at(): string{
        return this.dto?.created_at ?? ''
    }
    get updated_by(): string{
        return this.dto?.updated_by ?? ''
    }
    get updated_at(): any{
        return this.dto?.updated_at ?? ''
    }
    get is_delete(): string{
        return this.dto?.is_delete ?? ''
    }

    isUpdateRequired(): boolean{
       return parseInt(this.version_code) > parseInt(DeviceInfo.getBuildNumber())
    }

    isForceUpdate(): boolean{
       return this.force_update === '1'
    }




}
