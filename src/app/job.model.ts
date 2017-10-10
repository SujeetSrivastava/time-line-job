export class Job {
    public name: string;
    public startTime: number;
    public endTime: number;
    public color: string;
    public minutesAllocated: number;
    public minuteGap: number;
    public minuteGapBefore: number;
  
    constructor(name: string, startTime: number, endTime: number,minuteGap:number, color: string, allocatedTime:number, minuteGapBefore: number) {
      this.name = name;
      this.startTime = (startTime)/14.4;
      this.endTime = (endTime)/14.4;
      this.minutesAllocated = allocatedTime/14.4;
      this.minuteGap = (minuteGap/14.4);
      this.color = color;
      this.minuteGapBefore = minuteGapBefore /14.4;
    }
  }
  