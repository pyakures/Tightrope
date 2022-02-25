export class NEW_EVENT{
    constructor(
        public EventName: string,
        public StartDate: string,
        public EndDate: string,
        public Location: string,
        public StressLevel: number,
        public EventType: number,
        public Notes: string,
    ){}
}