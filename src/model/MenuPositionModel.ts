import {Model} from "@/model/core";
import {MenuPositionDto} from "@/dtos";

export class MenuPositionModel extends Model<MenuPositionDto>{
    constructor(dto: MenuPositionDto) {
        super(dto);
    }
    get Home(): number{
        return this.dto?.Home ?? 0
    }
    get Attendance(): number{
        return this.dto?.Attendance ?? 0
    }
    get Lead(): number{
        return this.dto?.Lead ?? 0
    }
    get Sales_Order(): number{
        return this.dto?.Sales_Order ?? 0
    }
    get Visit(): number{
        return this.dto?.Visit ?? 0
    }
    get Expense(): number{
        return this.dto?.Expense ?? 0
    }
    get Profile(): number{
        return this.dto?.Profile ?? 0
    }
    get Logout(): number{
        return this.dto?.Logout ?? 0
    }
}
