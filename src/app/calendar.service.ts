import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { CalendarView } from "angular-calendar";

//Code by Sahil Pyakurel 
export class CalendarService {

    getCalendar(){
        return ["course1","course2","course3"];
    }

    thisDay: Date = new Date();
    thisCalView: CalendarView = CalendarView.Week;


}