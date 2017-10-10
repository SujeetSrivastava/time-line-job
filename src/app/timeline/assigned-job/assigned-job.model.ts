export class AssignedJobList {
    public name: string;
    public startHoursTime: number;
    public startMinutes: number;
    public endTime?: number;
    public color: string;
  
    constructor(name: string, startHoursTime: number, startMinutes: number, endTime:number, color: string) {
      this.name = name;
      this.startHoursTime = startHoursTime;
      this.startMinutes = startMinutes;
      this.color = color;
      this.endTime = endTime;
    }
  }
  